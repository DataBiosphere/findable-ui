import { RefObject } from "react";

export interface UseTooltipTitle {
  ref: RefObject<HTMLDivElement | null>;
  title: string | null;
}
