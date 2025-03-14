import { TabsProps } from "@mui/material";

type TabsPropsOptions = {
  INDICATOR_COLOR: typeof INDICATOR_COLOR;
  ORIENTATION: typeof ORIENTATION;
};

const INDICATOR_COLOR: Record<string, TabsProps["indicatorColor"]> = {
  PRIMARY: "primary",
  TRANSPARENT: "transparent",
};

const ORIENTATION: Record<string, TabsProps["orientation"]> = {
  VERTICAL: "vertical",
};

export const TABS_PROPS: TabsPropsOptions = {
  INDICATOR_COLOR,
  ORIENTATION,
};
