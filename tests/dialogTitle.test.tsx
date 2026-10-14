import { jest } from "@jest/globals";
import { Dialog } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { ARIA_LABEL } from "../src/components/common/Dialog/components/DialogTitle/constants";
import { DialogTitle } from "../src/components/common/Dialog/components/DialogTitle/dialogTitle";

const CLOSE_LABEL = "Close publish atlas dialog";
const TITLE = "Publish atlas";

describe("DialogTitle", () => {
  it("should name the close button 'Close' by default", () => {
    render(<DialogTitle onClose={jest.fn()} title={TITLE} />);
    expect(
      screen.getByRole("button", { name: ARIA_LABEL.CLOSE }),
    ).not.toBeNull();
  });

  it("should name the close button with the given closeLabel", () => {
    render(
      <DialogTitle
        closeLabel={CLOSE_LABEL}
        onClose={jest.fn()}
        title={TITLE}
      />,
    );
    expect(screen.getByRole("button", { name: CLOSE_LABEL })).not.toBeNull();
    expect(screen.queryByRole("button", { name: ARIA_LABEL.CLOSE })).toBeNull();
  });

  // A blank aria-label is discarded by the accessible name computation, so an
  // empty or whitespace-only closeLabel would leave the button unnamed.
  it.each([
    ["empty", ""],
    ["whitespace-only", "   "],
  ])(
    "should fall back to 'Close' when closeLabel is %s",
    (_, closeLabel: string) => {
      render(
        <DialogTitle
          closeLabel={closeLabel}
          onClose={jest.fn()}
          title={TITLE}
        />,
      );
      expect(
        screen.getByRole("button", { name: ARIA_LABEL.CLOSE }),
      ).not.toBeNull();
    },
  );

  it("should label the heading with a text title", () => {
    render(<DialogTitle onClose={jest.fn()} title={TITLE} />);
    expect(screen.getByRole("heading").getAttribute("aria-label")).toBe(TITLE);
  });

  it("should not set an aria-label when the title is an element", () => {
    render(<DialogTitle onClose={jest.fn()} title={<span>{TITLE}</span>} />);
    expect(screen.getByRole("heading").hasAttribute("aria-label")).toBe(false);
  });

  // jsdom's name computation skips a button's aria-label, so it can't show the
  // close button joining the dialog's name; check the element the dialog is
  // named by instead.
  it("should name the dialog from the title only", () => {
    render(
      <Dialog open>
        <DialogTitle
          closeLabel={CLOSE_LABEL}
          onClose={jest.fn()}
          title={TITLE}
        />
      </Dialog>,
    );
    const labelledBy = screen
      .getByRole("dialog")
      .getAttribute("aria-labelledby");
    expect(labelledBy).not.toBeNull();
    expect(
      document.getElementById(labelledBy as string)?.getAttribute("aria-label"),
    ).toBe(TITLE);
  });

  it("should not render a close button when onClose is not given", () => {
    render(<DialogTitle title={TITLE} />);
    expect(screen.queryByRole("button", { name: ARIA_LABEL.CLOSE })).toBeNull();
  });
});
