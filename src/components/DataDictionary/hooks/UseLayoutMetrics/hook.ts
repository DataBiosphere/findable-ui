import { useLayoutDimensions } from "../../../../providers/layoutDimensions/hook";
import { UseLayoutMetrics } from "./types";

export const useLayoutMetrics = (): UseLayoutMetrics => {
  const { dimensions } = useLayoutDimensions();
  return {
    metrics: {
      bottom: dimensions.footer.height,
      top: dimensions.header.height,
    },
  };
};
