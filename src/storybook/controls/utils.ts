import type { Args, ArgTypes } from "@storybook/nextjs-vite";
import { CONTROL_CONFIG_MAP } from "./constants";
import { CONTROL_TYPE } from "./types";

/**
 * Configures controls for specified keys with the given control type.
 * @param keys - ArgType keys.
 * @param controlType - The type of control to apply (from CONTROL_TYPE enum).
 * @returns An object of ArgTypes with the specified control configuration.
 */
export function configureControls<TArg = Args>(
  keys: (keyof TArg)[],
  controlType: CONTROL_TYPE
): Partial<ArgTypes<TArg>> {
  return Object.fromEntries(
    keys.map((key) => [key, { control: CONTROL_CONFIG_MAP[controlType] }])
  ) as Partial<ArgTypes<TArg>>;
}
