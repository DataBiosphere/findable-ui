import { ListItemButtonProps } from "@mui/material";
import { JSX, forwardRef } from "react";
import { BaseComponentProps, TestIdProps } from "../../../../../../types";
import { StyledListItemButton } from "./listItemButton.styles";

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
