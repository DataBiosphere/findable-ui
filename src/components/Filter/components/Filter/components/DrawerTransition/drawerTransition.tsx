import { Slide } from "@mui/material";
import { JSX } from "react";
import { SIDE_PROPS } from "./constants";
import { DrawerTransitionProps } from "./types";

/**
 * Slide transition used for the drawer-surface filter popover.
 * @param props - Component props (extends MUI SlideProps).
 * @param props.children - Transition child.
 * @param props.placement - Popper placement; consumed only to keep it off the DOM.
 * @param props.ref - Forwarded ref.
 * @returns Slide transition element.
 */
export const DrawerTransition = ({
  children,
  placement: _placement,
  ref,
  ...props
}: DrawerTransitionProps): JSX.Element => {
  return (
    <Slide {...props} {...SIDE_PROPS} ref={ref}>
      {children}
    </Slide>
  );
};
