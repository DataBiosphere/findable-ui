import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import { SVG_ICON_PROPS } from "../../../../styles/common/mui/svgIcon";
import { BUTTON_GROUP_PROPS } from "../../../common/ButtonGroup/constants";
import { DropDownIcon } from "../../../common/Form/components/Select/components/DropDownIcon/dropDownIcon";
import { StyledGrid } from "./filters.styles";

export const Filters = (): JSX.Element => {
  return (
    <StyledGrid>
      <ButtonGroup {...BUTTON_GROUP_PROPS.SECONDARY_OUTLINED}>
        <Button
          endIcon={<DropDownIcon color={SVG_ICON_PROPS.COLOR.INK_LIGHT} />}
        >
          Required
        </Button>
      </ButtonGroup>
    </StyledGrid>
  );
};
