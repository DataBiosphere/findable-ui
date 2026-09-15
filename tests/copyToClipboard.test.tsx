import { jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";

const copy = jest.fn();

// jsdom implements no execCommand, so the real module would fall back to
// window.prompt on click.
jest.unstable_mockModule("copy-to-clipboard", () => ({ default: copy }));

const { CopyToClipboard } =
  await import("../src/components/common/CopyToClipboard/copyToClipboard");
const { ARIA_LABEL, MESSAGE } =
  await import("../src/components/common/CopyToClipboard/constants");

const COPY_STR = "https://example.com/data";

describe("CopyToClipboard", () => {
  // MUI copies a string Tooltip title onto the child as aria-label, which would
  // otherwise name the button after the post-copy confirmation.
  it("should name the button after the action, not the confirmation", () => {
    render(<CopyToClipboard copyStr={COPY_STR} />);
    expect(
      screen.getByRole("button", { name: ARIA_LABEL.COPY }),
    ).not.toBeNull();
    expect(screen.queryByRole("button", { name: MESSAGE.COPIED })).toBeNull();
  });

  // The tooltip describes nothing to assistive tech: describeChild is false and
  // the title is a string, so MUI wires neither aria-describedby nor
  // aria-labelledby, and the button's own name is static.
  it("should announce the confirmation in a live region on copy", () => {
    const { container } = render(<CopyToClipboard copyStr={COPY_STR} />);
    const liveRegion = container.querySelector("[aria-live='polite']");
    // Present from the first render so the text arriving is announced as a
    // change rather than as new content.
    expect(liveRegion).not.toBeNull();
    expect(liveRegion?.textContent).toBe("");

    fireEvent.click(screen.getByRole("button", { name: ARIA_LABEL.COPY }));

    expect(copy).toHaveBeenCalledWith(COPY_STR);
    expect(liveRegion?.textContent).toBe(MESSAGE.COPIED);
  });
});
