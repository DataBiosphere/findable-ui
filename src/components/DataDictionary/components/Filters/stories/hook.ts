import { Dispatch, SetStateAction, useState } from "react";

/**
 * Story helper holding a filter store in local state, starting empty.
 * @returns The filter store and its setter.
 */
export function useFilterStore(): {
  filterStore: Record<string, unknown>;
  setFilterStore: Dispatch<SetStateAction<Record<string, unknown>>>;
} {
  const [filterStore, setFilterStore] = useState<Record<string, unknown>>({});
  return { filterStore, setFilterStore };
}

/**
 * Story helper holding a global filter value in local state, starting undefined.
 * @returns The global filter value and its setter.
 */
export function useGlobalFilterStore(): {
  globalFilter: string | undefined;
  setGlobalFilter: Dispatch<SetStateAction<string | undefined>>;
} {
  const [globalFilter, setGlobalFilter] = useState<string | undefined>();
  return { globalFilter, setGlobalFilter };
}
