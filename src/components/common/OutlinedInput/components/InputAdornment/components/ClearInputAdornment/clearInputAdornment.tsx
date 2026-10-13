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

/**
 * Input adornment with an icon button that clears the input.
 * @param props - Component props.
 * @param props.in - Whether the adornment is shown; renders nothing when false or omitted.
 * @param props.label - Accessible name for the clear button; falls back to the default clear label when missing or blank.
 * @param props.onClick - Function invoked when the clear button is clicked.
 * @returns The clear input adornment, or null when not shown.
 */
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
