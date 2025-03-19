import { useLayoutDimensions } from "../../../../providers/layoutDimensions/hook";
import { UseLayoutSpacing } from "./types";

export const useLayoutSpacing = (): UseLayoutSpacing => {
  const { dimensions } = useLayoutDimensions();
  return {
    spacing: {
      bottom: dimensions.footer.height,
      top: dimensions.header.height,
    },
  };
};
