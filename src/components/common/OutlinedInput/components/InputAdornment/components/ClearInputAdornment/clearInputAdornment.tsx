import { CloseRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { JSX } from "react";
import { resolveAriaLabel } from "../../../../../../../utils/ariaLabel";
import { SVG_ICON_PROPS } from "../constants";
import { StyledInputAdornment } from "./clearInputAdornment.styles";
import {
  ARIA_LABEL,
  ICON_BUTTON_PROPS,
  INPUT_ADORNMENT_PROPS,
} from "./constants";
import { ClearInputAdornmentProps } from "./types";

export const ClearInputAdornment = ({
  in: isIn,
  label,
  onClick,
}: ClearInputAdornmentProps): JSX.Element | null => {
  if (!isIn) return null;
  return (
    <StyledInputAdornment {...INPUT_ADORNMENT_PROPS}>
      <IconButton
        {...ICON_BUTTON_PROPS}
        aria-label={resolveAriaLabel(label, ARIA_LABEL.CLEAR)}
        onClick={onClick}
      >
        <CloseRounded {...SVG_ICON_PROPS} />
      </IconButton>
    </StyledInputAdornment>
  );
};
