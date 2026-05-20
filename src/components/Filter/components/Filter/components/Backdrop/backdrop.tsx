import { Portal } from "@mui/material";
import { JSX } from "react";
import { useCloseOnEscape } from "../../hooks/UseCloseOnEscape/hook";
import { StyledBackdrop } from "./backdrop.styles";
import { BACKDROP_PROPS } from "./constants";
import { BackdropProps } from "./types";

export const Backdrop = (props: BackdropProps): JSX.Element => {
  useCloseOnEscape({ onClose: props.onClick, open: props.open });
  return (
    <Portal>
      <StyledBackdrop {...BACKDROP_PROPS} {...props} />
    </Portal>
  );
};
