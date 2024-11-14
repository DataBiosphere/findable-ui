import { jest } from "@jest/globals";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import {
  AZUL_FILE_DOWNLOAD_TEST_ID,
  AZUL_FILE_REQUEST_DOWNLOAD_PENDING_TEST_ID,
  AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID,
} from "../src/components/Index/components/AzulFileDownload/common/constants";
import { getAnchorEl, getButtonById } from "../src/utils/tests";

jest.unstable_mockModule("../src/hooks/useFileLocation", () => ({
  useFileLocation: jest.fn(),
}));

const { AzulFileDownload } = await import(
  "../src/components/Index/components/AzulFileDownload/azulFileDownload"
);
const { useFileLocation } = await import("../src/hooks/useFileLocation");

describe("AzulFileDownload", () => {
  const FILE_URL = "https://example.com/storage/file";
  const MOCK_RUN = jest.fn();
  const URL = "https://example.com/repository/file";
  const TRACKING_PARAMETERS = {
    entityName: "filename.extension",
    relatedEntityId: "id",
    relatedEntityName: "name",
  };
  beforeEach(() => {
    (useFileLocation as jest.Mock).mockReturnValue({
      fileUrl: undefined,
      isLoading: false,
      run: MOCK_RUN,
    });
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
    test("should disable the download button if URL is undefined", () => {
      render(<AzulFileDownload {...TRACKING_PARAMETERS} />);
      const buttonEl = getButtonById(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID);
      expect(buttonEl.disabled).toBe(true);
    });
    test("should enable the download button if a URL is provided", () => {
      render(<AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />);
      const buttonEl = getButtonById(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID);
      expect(buttonEl.disabled).toBe(false);
    });
  });
  describe("download functionality", () => {
    test("should call the run function when the button is clicked", () => {
      render(<AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />);
      const buttonEl = getButtonById(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID);
      fireEvent.click(buttonEl);
      expect(MOCK_RUN).toHaveBeenCalled();
    });
    test("should show loading icon when downloading is in progress", async () => {
      (useFileLocation as jest.Mock).mockReturnValue({
        fileUrl: undefined,
        isLoading: false,
        run: MOCK_RUN,
      });
      render(<AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />);
      const buttonEl = getButtonById(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID);
      fireEvent.click(buttonEl);
      await waitFor(() => {
        const pendingEl = getButtonById(
          AZUL_FILE_REQUEST_DOWNLOAD_PENDING_TEST_ID
        );
        expect(pendingEl).not.toBeNull();
      });
      expect(
        screen.queryByTestId(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID)
      ).toBeNull();
    });
    test("should initiate download when fileUrl is available", () => {
      (useFileLocation as jest.Mock).mockReturnValue({
        fileUrl: FILE_URL,
        isLoading: false,
        run: MOCK_RUN,
      });
      render(<AzulFileDownload {...TRACKING_PARAMETERS} url={URL} />);
      const buttonEl = getButtonById(AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID);
      const anchorEl = getAnchorEl(AZUL_FILE_DOWNLOAD_TEST_ID);
      fireEvent.click(buttonEl);
      expect(anchorEl.download).not.toBeNull();
      expect(anchorEl.href).toBe(FILE_URL);
      expect(screen.queryByTestId(AZUL_FILE_DOWNLOAD_TEST_ID)).not.toBeNull();
    });
  });
});
