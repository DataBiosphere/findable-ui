import { ComponentProps } from "react";
import { Icon } from "../icon";

export const DISABLED_CONTROLS: (keyof ComponentProps<typeof Icon>)[] = [
  "slotProps",
];
