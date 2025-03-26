import { Args, ArgTypes } from "@storybook/react";

/**
 * Returns an object of ArgTypes with the specified keys disabled.
 * @param keys - A list of arg keys.
 * @returns An object of ArgTypes with the specified keys disabled.
 */
export function getDisabledControls<TArg = Args>(
  keys: (keyof TArg)[]
): Partial<ArgTypes<TArg>> {
  return Object.fromEntries(
    keys.map((key) => [key, { control: false }])
  ) as Partial<ArgTypes<TArg>>;
}
