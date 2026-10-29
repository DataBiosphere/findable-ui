import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { ButtonOutline } from "../src/components/common/Button/components/ButtonOutline/buttonOutline";

describe("ButtonOutline ref", () => {
  // React 19 passes ref as a regular prop, so with forwardRef removed the ref
  // must still travel through the props spread and reach the button element.
  it("should forward ref to the button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<ButtonOutline ref={ref}>Label</ButtonOutline>);
    expect(ref.current).toBe(screen.getByRole("button", { name: "Label" }));
  });

  // Rendered as a link (e.g. a polymorphic href), the ref should reach the anchor.
  it("should forward ref to the anchor element when given an href", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <ButtonOutline href="/target" ref={ref}>
        Label
      </ButtonOutline>,
    );
    expect(ref.current).toBe(screen.getByRole("link", { name: "Label" }));
  });
});
