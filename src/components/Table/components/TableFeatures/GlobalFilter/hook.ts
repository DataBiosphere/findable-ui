import { OutlinedInputProps } from "@mui/material";
import { RowData, Table } from "@tanstack/react-table";
import {
  ChangeEvent,
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
} from "react";

export const useGlobalFilter = <T extends RowData>(
  table: Table<T>
): Pick<OutlinedInputProps, "onChange" | "value"> & { onClear: () => void } => {
  const { getState, setGlobalFilter } = table;
  const { globalFilter } = getState();

  // Local echo of global filter.
  const [value, setValue] = useState<string | undefined>(globalFilter);

  // Use deferred value for global filter.
  // Using React.useDeferredValue instead of debounce for simplicity.
  const deferredValue = useDeferredValue(value);

  // Handle input change.
  const onChange = useCallback(
    (changeEvent: ChangeEvent<HTMLInputElement>): void => {
      setValue(changeEvent.target.value);
    },
    []
  );

  // Handle clear input.
  const onClear = useCallback((): void => {
    setValue(undefined);
  }, []);

  useEffect(() => {
    if (deferredValue === getState().globalFilter) return;
    setGlobalFilter(deferredValue);
  }, [deferredValue, getState, setGlobalFilter]);

  return {
    onChange,
    onClear,
    value,
  };
};
