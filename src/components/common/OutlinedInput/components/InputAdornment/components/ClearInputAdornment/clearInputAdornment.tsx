import { CloseRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { JSX } from "react";
import { SVG_ICON_PROPS } from "../constants";
import { StyledInputAdornment } from "./clearInputAdornment.styles";
import { ICON_BUTTON_PROPS, INPUT_ADORNMENT_PROPS } from "./constants";
import { ClearInputAdornmentProps } from "./types";

export const ClearInputAdornment = ({
  in: isIn,
  onClick,
}: ClearInputAdornmentProps): JSX.Element | null => {
  if (!isIn) return null;
  return (
    <StyledInputAdornment {...INPUT_ADORNMENT_PROPS}>
      <IconButton {...ICON_BUTTON_PROPS} onClick={onClick}>
        <CloseRounded {...SVG_ICON_PROPS} />
      </IconButton>
    </StyledInputAdornment>
  );
};
