import { Dispatch, SetStateAction, useState } from "react";

export function useFilterStore(): {
  filterStore: Record<string, unknown>;
  setFilterStore: Dispatch<SetStateAction<Record<string, unknown>>>;
} {
  const [filterStore, setFilterStore] = useState<Record<string, unknown>>({});
  return { filterStore, setFilterStore };
}
