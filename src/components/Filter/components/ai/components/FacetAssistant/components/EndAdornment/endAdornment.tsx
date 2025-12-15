import { IconButton } from "@mui/material";
import React from "react";
import { ICON_BUTTON_PROPS } from "../../../../../../../../styles/common/mui/iconButton";
import { SVG_ICON_PROPS } from "../../../../../../../../styles/common/mui/svgIcon";
import { AiIcon } from "../../../../../../../common/CustomIcon/components/AiIcon/aiIcon";
import { ADORNMENT_TYPE } from "./constants";
import {
  StyledArrowUpwardRounded,
  StyledLoadingIcon,
} from "./endAdornment.styles";
import { EndAdornmentProps } from "./types";

export const EndAdornment = ({
  adornmentType,
}: EndAdornmentProps): JSX.Element => {
  switch (adornmentType) {
    case ADORNMENT_TYPE.SUBMITTING:
      return (
        <StyledLoadingIcon
          color={SVG_ICON_PROPS.COLOR.PRIMARY}
          fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL}
        />
      );
    case ADORNMENT_TYPE.SUBMITTABLE:
      return (
        <IconButton
          color={ICON_BUTTON_PROPS.COLOR.SECONDARY}
          edge={ICON_BUTTON_PROPS.EDGE.END}
          size={ICON_BUTTON_PROPS.SIZE.XSMALL}
          type="submit"
        >
          <StyledArrowUpwardRounded fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL} />
        </IconButton>
      );
    case ADORNMENT_TYPE.DEFAULT:
    default:
      return <AiIcon />;
  }
};
