import { Grow } from "@mui/material";
import { JSX } from "react";
import { POPPER_PROPS } from "../../../../../../styles/common/mui/popper";
import { PLACEMENT_TRANSFORM_ORIGIN } from "./constants";
import { MenuTransitionProps } from "./types";

/**
 * Grow transition with a placement-driven transform origin.
 * @param props - Component props.
 * @param props.placement - Popper placement, drives the transform origin.
 * @param props.ref - Forwarded ref.
 * @param props.style - Style merged with the placement-derived transform origin.
 * @returns Grow transition element.
 */
export const MenuTransition = ({
  placement = POPPER_PROPS.PLACEMENT.BOTTOM_START,
  ref,
  style,
  ...props
}: MenuTransitionProps): JSX.Element => {
  return (
    <Grow
      {...props}
      ref={ref}
      style={{
        ...style,
        transformOrigin: PLACEMENT_TRANSFORM_ORIGIN[placement],
      }}
    />
  );
};
