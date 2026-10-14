import { GrowProps, PopperPlacementType } from "@mui/material";
import { Ref } from "react";

/**
 * Props for the MenuTransition component.
 */
export interface MenuTransitionProps extends GrowProps {
  placement?: PopperPlacementType;
  ref?: Ref<unknown>;
}
