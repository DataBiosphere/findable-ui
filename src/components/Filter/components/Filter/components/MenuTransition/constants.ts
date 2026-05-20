import { PopperPlacementType } from "@mui/material";
import { CSSProperties } from "react";
import { POPPER_PROPS } from "../../../../../../styles/common/mui/popper";

export const PLACEMENT_TRANSFORM_ORIGIN: Partial<
  Record<PopperPlacementType, CSSProperties["transformOrigin"]>
> = {
  [POPPER_PROPS.PLACEMENT.BOTTOM_START]: "0 0 0",
  [POPPER_PROPS.PLACEMENT.RIGHT]: "0 50% 0",
  [POPPER_PROPS.PLACEMENT.TOP_START]: "0 100% 0",
};
