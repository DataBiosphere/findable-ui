import { ComponentProps } from "react";
import { fn } from "storybook/test";
import { LOREM_IPSUM } from "../../../../../storybook/loremIpsum";
import { FilterTag } from "../filterTag";

export const DEFAULT_ARGS: ComponentProps<typeof FilterTag> = {
  label: "male",
  onRemove: fn(),
  superseded: false,
};

export const WITH_ELLIPSIS_ARGS: ComponentProps<typeof FilterTag> = {
  label: LOREM_IPSUM.LONG,
  onRemove: fn(),
  superseded: false,
};

export const WITH_RANGE_ARGS: ComponentProps<typeof FilterTag> = {
  label: "10 - 34",
  onRemove: fn(),
  superseded: false,
};
