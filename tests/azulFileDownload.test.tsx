import { jest } from "@jest/globals";
import { Tooltip } from "@mui/material";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import {
  ARIA_LABEL,
  AZUL_FILE_DOWNLOAD_TEST_ID,
  AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID,
} from "../src/components/Index/components/AzulFileDownload/common/constants";
import { getAnchorEl, getButtonById } from "../src/utils/tests";

jest.unstable_mockModule("../src/hooks/useFileLocation", () => ({
  useFileLocation: jest.fn(),
}));

const { AzulFileDownload } =
  await import("../src/components/Index/components/AzulFileDownload/azulFileDownload");
const { useFileLocation } = await import("../src/hooks/useFileLocation");

describe("AzulFileDownload", () => {
  const FILE_URL = "https://example.com/storage/file";
  const FILE_LOCATION = { location: FILE_URL, status: 302 };
  const MOCK_RUN = jest.fn();
  const URL = "https://example.com/repository/file";
  const TRACKING_PARAMETERS = {
    entityName: "filename.extension",
    relatedEntityId: "id",
    relatedEntityName: "name",
  };
  beforeEach(() => {
    (useFileLocation as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      run: MOCK_RUN,
    });
    // Like useAsync, running the request marks it pending.
    MOCK_RUN.mockImplementation(() =>
      (useFileLocation as jest.Mock).mockReturnValue({
        data: undefined,
        isLoading: true,
        run: MOCK_RUN,
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("download button", () => {
    test("should render the download button", () => {
      render(<AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />);
      const buttonEl = getButtonById(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID);
      expect(buttonEl).not.toBeNull();
    });
    test("should render a single button", () => {
      render(<AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />);
      expect(screen.getAllByRole("button")).toHaveLength(1);
    });
    test("should disable the download button if URL is undefined", () => {
      render(<AzulFileDownload {...TRACKING_PARAMETERS} />);
      const buttonEl = getButtonById(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID);
      expect(buttonEl.disabled).toBe(true);
      // The native attribute carries the state; no redundant ARIA form.
      expect(buttonEl.getAttribute("aria-disabled")).toBeNull();
    });
    test("should enable the download button if a URL is provided", () => {
      render(<AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />);
      const buttonEl = getButtonById(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID);
      expect(buttonEl.disabled).toBe(false);
    });
    test("should name the idle button 'Download file' and not mark it busy", () => {
      render(<AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />);
      const buttonEl = getButtonById(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID);
      expect(buttonEl.getAttribute("aria-label")).toBe(ARIA_LABEL.DOWNLOAD);
      expect(buttonEl.getAttribute("aria-busy")).toBeNull();
      expect(buttonEl.getAttribute("aria-disabled")).toBeNull();
      expect(getComputedStyle(buttonEl).pointerEvents).not.toBe("none");
    });
  });
  describe("download functionality", () => {
    test("should call the run function when the button is clicked", () => {
      render(<AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />);
      const buttonEl = getButtonById(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID);
      fireEvent.click(buttonEl);
      expect(MOCK_RUN).toHaveBeenCalled();
    });
    test("should mark the same button busy while the request is in flight", () => {
      const { rerender } = render(
        <AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />,
      );
      const buttonEl = getButtonById(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID);
      fireEvent.click(buttonEl);
      rerender(<AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />);
      expect(buttonEl.getAttribute("aria-busy")).toBe("true");
      expect(buttonEl.getAttribute("aria-label")).toBe(
        ARIA_LABEL.DOWNLOAD_PENDING,
      );
      // aria-disabled rather than disabled: the control must stay focusable so
      // a screen reader user can read back the state it has moved into.
      expect(buttonEl.getAttribute("aria-disabled")).toBe("true");
      expect(buttonEl.disabled).toBe(false);
      expect(screen.getAllByRole("button")).toHaveLength(1);
      // aria-disabled leaves MUI's .Mui-disabled (and its pointer-events: none)
      // off, so the styled button suppresses the pointer affordance itself:
      // without it the spinner keeps cursor: pointer and the theme's hover /
      // active colours while ignoring every click.
      expect(getComputedStyle(buttonEl).pointerEvents).toBe("none");
    });
    test("should not duplicate the disabled state if the URL disappears mid-request", () => {
      const { rerender } = render(
        <AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />,
      );
      const buttonEl = getButtonById(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID);
      fireEvent.click(buttonEl);
      rerender(<AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />);
      expect(buttonEl.getAttribute("aria-busy")).toBe("true");
      rerender(<AzulFileDownload {...TRACKING_PARAMETERS} />);
      // The native attribute takes over; the ARIA form must not double up.
      expect(buttonEl.disabled).toBe(true);
      expect(buttonEl.getAttribute("aria-disabled")).toBeNull();
      // The spinner is still showing, so the theme's disabled dimming is undone.
      expect(getComputedStyle(buttonEl).opacity).toBe("1");
    });
    test("should retain focus on the button across the pending transition", () => {
      const { rerender } = render(
        <AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />,
      );
      const buttonEl = getButtonById(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID);
      act(() => buttonEl.focus());
      expect(document.activeElement).toBe(buttonEl);
      fireEvent.click(buttonEl);
      rerender(<AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />);
      expect(buttonEl.getAttribute("aria-busy")).toBe("true");
      // The button is updated in place, so the focused node survives.
      expect(getButtonById(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID)).toBe(buttonEl);
      expect(document.activeElement).toBe(buttonEl);
    });
    test("should ignore clicks while the request is in flight", () => {
      const { rerender } = render(
        <AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />,
      );
      const buttonEl = getButtonById(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID);
      fireEvent.click(buttonEl);
      rerender(<AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />);
      expect(buttonEl.getAttribute("aria-busy")).toBe("true");
      fireEvent.click(buttonEl);
      expect(MOCK_RUN).toHaveBeenCalledTimes(1);
    });
    test("should initiate download when the file location resolves", () => {
      const { rerender } = render(
        <AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />,
      );
      const buttonEl = getButtonById(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID);
      const anchorEl = getAnchorEl(AZUL_FILE_DOWNLOAD_TEST_ID);
      fireEvent.click(buttonEl);
      (useFileLocation as jest.Mock).mockReturnValue({
        data: FILE_LOCATION,
        isLoading: false,
        run: MOCK_RUN,
      });
      rerender(<AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />);
      expect(anchorEl.download).not.toBeNull();
      expect(anchorEl.href).toBe(FILE_URL);
    });
    test("should return the button to its idle state once the download starts", async () => {
      const { rerender } = render(
        <AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />,
      );
      const buttonEl = getButtonById(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID);
      const anchorEl = getAnchorEl(AZUL_FILE_DOWNLOAD_TEST_ID);
      fireEvent.click(buttonEl);
      rerender(<AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />);
      expect(buttonEl.getAttribute("aria-busy")).toBe("true");
      // The location request resolves, handing the component a file URL.
      (useFileLocation as jest.Mock).mockReturnValue({
        data: FILE_LOCATION,
        isLoading: false,
        run: MOCK_RUN,
      });
      rerender(<AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />);
      await waitFor(() => {
        expect(buttonEl.getAttribute("aria-busy")).toBeNull();
      });
      expect(anchorEl.href).toBe(FILE_URL);
      expect(buttonEl.getAttribute("aria-label")).toBe(ARIA_LABEL.DOWNLOAD);
      expect(buttonEl.getAttribute("aria-disabled")).toBeNull();
    });
  });
  describe("as a Tooltip child", () => {
    const TOOLTIP_TITLE = "Tooltip title";
    // MUI logs this when the child drops the props Tooltip injects.
    const FORWARDING_WARNING = "not forwarding its props correctly";
    test("should open the tooltip on hover without a forwarding warning", async () => {
      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => undefined);
      render(
        <Tooltip title={TOOLTIP_TITLE}>
          <AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />
        </Tooltip>,
      );
      const buttonEl = getButtonById(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID);
      fireEvent.mouseOver(buttonEl.parentElement as HTMLElement);
      const tooltipEl = await screen.findByRole("tooltip");
      expect(tooltipEl.textContent).toBe(TOOLTIP_TITLE);
      const forwardingWarnings = consoleErrorSpy.mock.calls.filter(
        ([message]) => String(message).includes(FORWARDING_WARNING),
      );
      consoleErrorSpy.mockRestore();
      expect(forwardingWarnings).toHaveLength(0);
    });
    test("should open the tooltip on hover when the button is disabled", async () => {
      render(
        <Tooltip title={TOOLTIP_TITLE}>
          <AzulFileDownload {...TRACKING_PARAMETERS} />
        </Tooltip>,
      );
      const buttonEl = getButtonById(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID);
      expect(buttonEl.disabled).toBe(true);
      // The wrapping span stays hoverable while the button is disabled.
      fireEvent.mouseOver(buttonEl.parentElement as HTMLElement);
      const tooltipEl = await screen.findByRole("tooltip");
      expect(tooltipEl.textContent).toBe(TOOLTIP_TITLE);
    });
  });
});
