import type { ChipProps } from "@mui/material";

/**
 * MUI `Chip` props without `color`, `size` or `variant`, which `NTagChip` fixes.
 */
export type NTagChipProps = Omit<ChipProps, "color" | "size" | "variant">;
