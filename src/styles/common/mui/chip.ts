import { ChipProps } from "@mui/material";

type ChipPropsOptions = {
  COLOR: typeof COLOR;
  SIZE: typeof SIZE;
  VARIANT: typeof VARIANT;
};

const COLOR: Record<string, ChipProps["color"]> = {
  DEFAULT: "default",
  ERROR: "error",
  INFO: "info",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  WARNING: "warning",
};

const SIZE: Record<string, ChipProps["size"]> = {
  MEDIUM: "medium",
  SMALL: "small",
};

const VARIANT: Record<string, ChipProps["variant"]> = {
  FILLED: "filled",
  FILTER_TAG: "filterTag",
  /**
   * @deprecated Use `NTagChip` from `contracts/cc/NTagChip/nTagChip`.
   */
  N_TAG: "ntag",
  OUTLINED: "outlined",
  /**
   * @deprecated Use `StatusChip` from `contracts/cc/StatusChip/statusChip`.
   */
  STATUS: "status",
};

/**
 * MUI `Chip`'s prop values, including findable-ui's `filterTag`, `ntag` and `status` variants.
 * @deprecated Use `CHIP_PROPS` from `contracts/mui/Chip/constants`. Its `VARIANT` has no `FILTER_TAG`, `N_TAG` or
 * `STATUS`: use `NTagChip` for `ntag` and `StatusChip` for `status`; `filterTag` has no replacement yet.
 */
export const CHIP_PROPS: ChipPropsOptions = {
  COLOR,
  SIZE,
  VARIANT,
};
