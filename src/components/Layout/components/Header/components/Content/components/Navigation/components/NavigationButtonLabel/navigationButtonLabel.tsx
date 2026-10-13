import { Typography } from "@mui/material";
import { Fragment, JSX, ReactNode } from "react";

/**
 * Props for the NavigationButtonLabel component.
 */
export interface NavigationButtonLabelProps {
  label: ReactNode;
}

/**
 * Navigation button label. A string label renders as single-line text, truncated when it overflows; any other label renders as given.
 * @param props - Component props.
 * @param props.label - Button label.
 * @returns The navigation button label.
 */
export const NavigationButtonLabel = ({
  label,
}: NavigationButtonLabelProps): JSX.Element => {
  return (
    <Fragment>
      {typeof label === "string" ? (
        <Typography component="span" noWrap>
          {label}
        </Typography>
      ) : (
        label
      )}
    </Fragment>
  );
};
