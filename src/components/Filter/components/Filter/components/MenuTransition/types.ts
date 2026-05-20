import { GrowProps, PopperPlacementType } from "@mui/material";
import { Ref } from "react";

export interface MenuTransitionProps extends GrowProps {
  placement?: PopperPlacementType;
  ref?: Ref<unknown>;
}
