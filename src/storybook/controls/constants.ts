import type { ArgTypes } from "@storybook/nextjs-vite";
import { CONTROL_TYPE } from "./types";

export const CONTROL_CONFIG_MAP: Record<
  CONTROL_TYPE,
  ArgTypes[keyof ArgTypes]["control"]
> = {
  [CONTROL_TYPE.BOOLEAN]: { type: "boolean" },
  [CONTROL_TYPE.DISABLED]: false,
};

export const MUI_CONTROLS = ["classes", "className", "ref", "sx"] as const;
