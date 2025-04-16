import { FormEvent, useCallback } from "react";
import { useToggleButtonGroup } from "../../../../../common/ToggleButtonGroup/hooks/UseToggleButtonGroup/hook";
import { RANGE_OPERATOR } from "../../types";
import { UseFilterRange } from "./types";

export const useFilterRange = (): UseFilterRange => {
  const { onChange, value } = useToggleButtonGroup<RANGE_OPERATOR>(
    RANGE_OPERATOR.BETWEEN
  );

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
  }, []);

  return {
    onChange,
    onSubmit,
    value,
  };
};
