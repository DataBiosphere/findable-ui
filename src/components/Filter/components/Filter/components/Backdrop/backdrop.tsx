import { Portal } from "@mui/material";
import { JSX } from "react";
import { useCloseOnEscape } from "../../../../../../hooks/UseCloseOnEscape/hook";
import { StyledBackdrop } from "./backdrop.styles";
import { BACKDROP_PROPS } from "./constants";
import { BackdropProps } from "./types";

/**
 * Filter backdrop, rendered in a portal and unmounted when hidden. Clicking it, or pressing Escape while it is open, invokes onClick; while it is open, Escape is captured app-wide and not propagated.
 * The given Mui Backdrop props override the defaults.
 * @param props - Component props.
 * @param props.onClick - Function invoked to close the filter.
 * @param props.open - Whether the backdrop is shown.
 * @returns The backdrop.
 */
export const Backdrop = (props: BackdropProps): JSX.Element => {
  useCloseOnEscape({ onClose: props.onClick, open: props.open });
  return (
    <Portal>
      <StyledBackdrop {...BACKDROP_PROPS} {...props} />
    </Portal>
  );
};
