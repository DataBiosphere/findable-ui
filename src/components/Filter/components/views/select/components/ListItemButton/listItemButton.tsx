import { ListItemButtonProps } from "@mui/material";
import { JSX, forwardRef } from "react";
import { BaseComponentProps, TestIdProps } from "../../../../../../types";
import { StyledListItemButton } from "./listItemButton.styles";

/**
 * Select list item button.
 * @param props - Component props, passed through to the Mui ListItemButton component.
 * @param props.className - Class name applied to the button.
 * @param props.testId - Test id, set as the button's data-testid attribute.
 * @param ref - Ref forwarded to the button element.
 * @returns The list item button.
 */
export const ListItemButton = forwardRef<
  HTMLDivElement,
  BaseComponentProps & ListItemButtonProps & TestIdProps
>(function ListItemButton(
  {
    className,
    testId,
    ...props /* MuiListItemButtonProps */
  }: BaseComponentProps & ListItemButtonProps & TestIdProps,
  ref,
): JSX.Element {
  return (
    <StyledListItemButton
      className={className}
      data-testid={testId}
      ref={ref}
      {...props}
    />
  );
});
