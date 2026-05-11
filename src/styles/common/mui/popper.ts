import { PopperProps } from "@mui/material";

type PopperPropsOptions = {
  PLACEMENT: typeof PLACEMENT;
};

const PLACEMENT = {
  AUTO: "auto",
  AUTO_END: "auto-end",
  AUTO_START: "auto-start",
  BOTTOM: "bottom",
  BOTTOM_END: "bottom-end",
  BOTTOM_START: "bottom-start",
  LEFT: "left",
  LEFT_END: "left-end",
  LEFT_START: "left-start",
  RIGHT: "right",
  RIGHT_END: "right-end",
  RIGHT_START: "right-start",
  TOP: "top",
  TOP_END: "top-end",
  TOP_START: "top-start",
} as const satisfies Record<string, PopperProps["placement"]>;

export const POPPER_PROPS: PopperPropsOptions = {
  PLACEMENT,
};
