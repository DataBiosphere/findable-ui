import { useCallback, useState } from "react";
import { SelectCategoryValueView } from "../../../../../../../../../../../common/entities";
import { UseBarCount } from "./types";
import { initBarCount, updateBarCount } from "./utils";

export const useBarCount = (
  selectCategoryValueViews: SelectCategoryValueView[]
): UseBarCount => {
  const [barCount, setBarCount] = useState<number | undefined>(
    initBarCount(selectCategoryValueViews)
  );

  const onToggleBarCount = useCallback(() => {
    setBarCount(updateBarCount);
  }, []);

  return { barCount, onToggleBarCount };
};
