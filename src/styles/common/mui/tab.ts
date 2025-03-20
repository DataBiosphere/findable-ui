import { TabProps } from "@mui/material";

type TabPropsOptions = {
  ICON_POSITION: typeof ICON_POSITION;
};

const ICON_POSITION: Record<string, TabProps["iconPosition"]> = {
  BOTTOM: "bottom",
  END: "end",
  START: "start",
  TOP: "top",
};

export const TAB_PROPS: TabPropsOptions = {
  ICON_POSITION,
};
