import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";

const copy = jest.fn();

// jsdom implements no execCommand, so the real module would fall back to
// window.prompt on click.
jest.unstable_mockModule("copy-to-clipboard", () => ({ default: copy }));

const { CopyToClipboard } =
  await import("../src/components/common/CopyToClipboard/copyToClipboard");
const { ARIA_LABEL } =
  await import("../src/components/common/CopyToClipboard/constants");

const COPY_STR = "https://example.com/data";

describe("CopyToClipboard", () => {
  // MUI copies a string Tooltip title onto the child as aria-label, which would
  // otherwise name the button after the post-copy confirmation ("Link Copied")
  // rather than the action it performs.
  it("should name the button after the action, not the confirmation", () => {
    render(<CopyToClipboard copyStr={COPY_STR} />);
    expect(
      screen.getByRole("button", { name: ARIA_LABEL.COPY }),
    ).not.toBeNull();
    expect(screen.queryByRole("button", { name: "Link Copied" })).toBeNull();
  });
});
