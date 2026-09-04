import { PaperProps } from "@mui/material";

type PaperPropsOptions = {
  VARIANT: typeof VARIANT;
};

const VARIANT = {
  ELEVATION: "elevation",
  FOOTER: "footer",
  MENU: "menu",
  OUTLINED: "outlined",
  PANEL: "panel",
} as const satisfies Record<string, PaperProps["variant"]>;

export const PAPER_PROPS: PaperPropsOptions = {
  VARIANT,
};
