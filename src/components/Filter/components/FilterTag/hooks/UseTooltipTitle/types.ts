import { RefObject } from "react";

/**
 * Return type for the useTooltipTitle hook.
 */
export interface UseTooltipTitle {
  ref: RefObject<HTMLDivElement | null>;
  title: string | null;
}
