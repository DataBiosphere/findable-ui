import { buttonGroupClasses, ButtonGroupProps } from "@mui/material";

type ButtonGroupPropsOptions = {
  CLASSES: typeof CLASSES;
  COLOR: typeof COLOR;
  SIZE: typeof SIZE;
  VARIANT: typeof VARIANT;
};

const CLASSES: Record<string, ButtonGroupProps["classes"]> = {
  COLOR_PRIMARY: buttonGroupClasses.colorPrimary,
  COLOR_SECONDARY: buttonGroupClasses.colorSecondary,
  CONTAINED: buttonGroupClasses.contained,
  GROUPED: buttonGroupClasses.grouped,
  OUTLINED: buttonGroupClasses.outlined,
  ROOT: buttonGroupClasses.root,
};

const COLOR: Record<string, ButtonGroupProps["color"]> = {
  ERROR: "error",
  INFO: "info",
  INHERIT: "inherit",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  WARNING: "warning",
};

const SIZE: Record<string, ButtonGroupProps["size"]> = {
  LARGE: "large",
  MEDIUM: "medium",
  SMALL: "small",
};

const VARIANT: Record<string, ButtonGroupProps["variant"]> = {
  CONTAINED: "contained",
  OUTLINED: "outlined",
  TEXT: "text",
};

export const BUTTON_GROUP_PROPS: ButtonGroupPropsOptions = {
  CLASSES,
  COLOR,
  SIZE,
  VARIANT,
};
