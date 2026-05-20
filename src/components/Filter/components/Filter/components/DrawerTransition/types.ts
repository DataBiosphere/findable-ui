import { PopperPlacementType, SlideProps } from "@mui/material";
import { Ref } from "react";

export interface DrawerTransitionProps extends SlideProps {
  placement?: PopperPlacementType;
  ref?: Ref<unknown>;
}
