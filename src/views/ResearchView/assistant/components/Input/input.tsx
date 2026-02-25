import { IconButton, InputBase, Stack } from "@mui/material";
import { JSX } from "react";
import { INPUT_BASE_PROPS } from "./constants";
import { StyledBox, StyledPaper } from "./input.styles";
import { UpArrowIcon } from "../../../../../components/common/CustomIcon/components/UpArrowIcon/upArrowIcon";
import { ICON_BUTTON_PROPS } from "../../../../../styles/common/mui/iconButton";
import { SVG_ICON_PROPS } from "../../../../../styles/common/mui/svgIcon";
import { STACK_PROPS } from "../../../../../styles/common/mui/stack";
import { InputProps } from "./types";

/**
 * Renders an input component for the research panel.
 * @param props - Component props.
 * @param props.disabled - Disabled state of the input, which is derived from the loading state of the query.
 * @returns Research panel input component.
 */
export const Input = ({ disabled, ...props }: InputProps): JSX.Element => {
  return (
    <StyledBox>
      <StyledPaper elevation={0}>
        <InputBase {...INPUT_BASE_PROPS} {...props} />
        <Stack direction={STACK_PROPS.DIRECTION.ROW} gap={2}>
          <IconButton
            color={ICON_BUTTON_PROPS.COLOR.SECONDARY}
            disabled={disabled}
            size={ICON_BUTTON_PROPS.SIZE.XSMALL}
            type="submit"
          >
            <UpArrowIcon fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL} />
          </IconButton>
        </Stack>
      </StyledPaper>
    </StyledBox>
  );
};
