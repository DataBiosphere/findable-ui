import { useMemo } from "react";
import { CategoryConfig } from "../config/entities";
import { useConfig } from "./useConfig";

/**
 * Returns configured grouped configured categories as a list of configured categories.
 * @returns a list of configured categories.
 */
export const useCategoryConfigs = (): CategoryConfig[] | undefined => {
  const { config } = useConfig();
  const { categoryGroupConfigs } = config;
  return useMemo(() => {
    return categoryGroupConfigs?.flatMap(
      ({ categoryConfigs }) => categoryConfigs
    );
  }, [categoryGroupConfigs]);
};
