import { Typography } from "@mui/material";
import { Fragment, JSX, ReactNode } from "react";

export interface NavigationButtonLabelProps {
  label: ReactNode;
}

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
