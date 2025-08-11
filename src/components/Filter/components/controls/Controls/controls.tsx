import { Button as MButton, Typography } from "@mui/material";
import React from "react";
import { CLEAR_ALL } from "../../../../../common/entities";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";
import { BUTTON_PROPS } from "../../../../common/Button/constants";
import { BaseComponentProps } from "../../../../types";
import { SurfaceProps } from "../../surfaces/types";
import { StyledGrid } from "./controls.styles";

/**
 * Renders filter title and "Clear All" button.
 */

export const Controls = ({
  className,
  onFilter,
}: BaseComponentProps & Pick<SurfaceProps, "onFilter">): JSX.Element | null => {
  return (
    <StyledGrid className={className} container>
      <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_500}>
        Filters
      </Typography>
      <MButton
        {...BUTTON_PROPS.PRIMARY_TEXT}
        onClick={() => onFilter(CLEAR_ALL, undefined, false)}
      >
        Clear All
      </MButton>
    </StyledGrid>
  );
};
