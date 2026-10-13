import { RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { ClearInputAdornment } from "../../../../common/OutlinedInput/components/InputAdornment/components/ClearInputAdornment/clearInputAdornment";
import { SearchInputAdornment } from "../../../../common/OutlinedInput/components/InputAdornment/components/SearchInputAdornment/searchInputAdornment";
import { StyledOutlinedInput } from "../../../../common/OutlinedInput/outlinedInput.styles";
import { OUTLINED_INPUT_PROPS } from "./constants";
import { GlobalFilterProps } from "./types";

/**
 * Global filter, a search input that sets the table's global filter as the user types, with a clear button shown while the filter is set.
 * The given Mui OutlinedInput props override the defaults, including the change handler and value.
 * @param props - Component props.
 * @param props.className - Class name applied to the input.
 * @param props.table - TanStack table instance.
 * @returns The global filter input, or null when the table's global filter is not enabled.
 */
export const GlobalFilter = <T extends RowData>({
  className,
  table,
  ...props /* MuiOutlinedInputProps */
}: GlobalFilterProps<T>): JSX.Element | null => {
  const { getState, options, setGlobalFilter } = table;
  const { globalFilter } = getState();
  const { enableGlobalFilter } = options;

  if (!enableGlobalFilter) return null;

  return (
    <StyledOutlinedInput
      {...OUTLINED_INPUT_PROPS}
      className={className}
      endAdornment={
        <ClearInputAdornment
          in={!!globalFilter}
          onClick={() => setGlobalFilter(undefined)}
        />
      }
      hasValue={!!globalFilter}
      onChange={(e) => setGlobalFilter(e.target.value)}
      startAdornment={<SearchInputAdornment />}
      value={globalFilter ?? ""}
      {...props}
    />
  );
};
