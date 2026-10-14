import { PopperPlacementType, SlideProps } from "@mui/material";
import { Ref } from "react";

/**
 * Props for the DrawerTransition component.
 */
export interface DrawerTransitionProps extends SlideProps {
  placement?: PopperPlacementType;
  ref?: Ref<unknown>;
}
