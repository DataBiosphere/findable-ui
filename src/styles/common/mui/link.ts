import { LinkProps } from "@mui/material";

type LinkPropsOptions = {
  UNDERLINE: typeof UNDERLINE;
};

export const UNDERLINE: Record<string, LinkProps["underline"]> = {
  ALWAYS: "always",
  HOVER: "hover",
  NONE: "none",
};

export const LINK_PROPS: LinkPropsOptions = {
  UNDERLINE,
};
