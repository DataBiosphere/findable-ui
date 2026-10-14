import { useLayoutDimensions } from "../../providers/layoutDimensions/hook";
import { UseLayoutSpacing } from "./types";

/**
 * Returns the space taken by the layout's header and footer, from the measured
 * layout dimensions.
 * @returns Spacing with the footer height at the bottom and the header height at the top.
 */
export const useLayoutSpacing = (): UseLayoutSpacing => {
  const { dimensions } = useLayoutDimensions();
  return {
    spacing: {
      bottom: dimensions.footer.height,
      top: dimensions.header.height,
    },
  };
};
