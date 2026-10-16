import { render, screen } from "@testing-library/react";
import { ComponentType, createRef } from "react";
import type { ButtonProps } from "../src/components/common/Button/button";
import { Button } from "../src/components/common/Button/button";
import { ButtonOutline } from "../src/components/common/Button/components/ButtonOutline/buttonOutline";
import { ButtonPrimary } from "../src/components/common/Button/components/ButtonPrimary/buttonPrimary";
import { ButtonSecondary } from "../src/components/common/Button/components/ButtonSecondary/buttonSecondary";
import { ButtonSecondaryOutline } from "../src/components/common/Button/components/ButtonSecondaryOutline/buttonSecondaryOutline";

const BUTTONS: [string, ComponentType<ButtonProps>][] = [
  ["Button", Button],
  ["ButtonOutline", ButtonOutline],
  ["ButtonPrimary", ButtonPrimary],
  ["ButtonSecondary", ButtonSecondary],
  ["ButtonSecondaryOutline", ButtonSecondaryOutline],
];

describe("Button ref", () => {
  // React 19 passes ref as a regular prop, so with forwardRef removed the ref
  // must still travel through the props spread and reach the button element.
  it.each(BUTTONS)(
    "%s should forward ref to the button element",
    (_, ButtonComponent) => {
      const ref = createRef<HTMLButtonElement>();
      render(<ButtonComponent ref={ref}>Label</ButtonComponent>);
      expect(ref.current).toBe(screen.getByRole("button", { name: "Label" }));
    },
  );

  // Rendered as a link (e.g. a polymorphic href), the ref should reach the anchor.
  it.each(BUTTONS)(
    "%s should forward ref to the anchor element when given an href",
    (_, ButtonComponent) => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <ButtonComponent href="/target" ref={ref}>
          Label
        </ButtonComponent>,
      );
      expect(ref.current).toBe(screen.getByRole("link", { name: "Label" }));
    },
  );
});
