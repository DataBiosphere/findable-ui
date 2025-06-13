import { RowData } from "@tanstack/react-table";
import React from "react";
import { ClearInputAdornment } from "../../../../common/OutlinedInput/components/InputAdornment/components/ClearInputAdornment/clearInputAdornment";
import { SearchInputAdornment } from "../../../../common/OutlinedInput/components/InputAdornment/components/SearchInputAdornment/searchInputAdornment";
import { StyledOutlinedInput } from "../../../../common/OutlinedInput/outlinedInput.styles";
import { OUTLINED_INPUT_PROPS } from "./constants";
import { GlobalFilterProps } from "./types";

export const GlobalFilter = <T extends RowData>({
  className,
  table,
  ...props /* MuiOutlinedInputProps */
}: GlobalFilterProps<T>): JSX.Element => {
  const { getState, setGlobalFilter } = table;
  const { globalFilter } = getState();
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
