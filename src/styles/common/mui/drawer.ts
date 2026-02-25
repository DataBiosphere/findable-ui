import { DrawerProps } from "@mui/material";

type DrawerPropsOptions = {
  ANCHOR: typeof ANCHOR;
  VARIANT: typeof VARIANT;
};

const ANCHOR: Record<string, DrawerProps["anchor"]> = {
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
};

const VARIANT: Record<string, DrawerProps["variant"]> = {
  PERMANENT: "permanent",
  PERSISTENT: "persistent",
  TEMPORARY: "temporary",
};

export const DRAWER_PROPS: DrawerPropsOptions = {
  ANCHOR,
  VARIANT,
};
