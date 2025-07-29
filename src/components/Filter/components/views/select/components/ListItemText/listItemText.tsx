import { ListItemTextProps, Typography } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../../styles/common/mui/typography";
import { BaseComponentProps } from "../../../../../../types";
import { StyledListItemText } from "./listItemText.styles";

export const ListItemText = ({
  className,
  primary,
  secondary,
  ...props /* MuiListItemTextProps */
}: BaseComponentProps & ListItemTextProps): JSX.Element => {
  return (
    <StyledListItemText
      className={className}
      disableTypography
      primary={typeof primary === "string" ? <span>{primary}</span> : primary}
      secondary={
        typeof secondary === "string" ? (
          <Typography
            color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
            variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_SMALL_400}
          >
            {secondary}
          </Typography>
        ) : (
          secondary
        )
      }
      {...props}
    />
  );
};
