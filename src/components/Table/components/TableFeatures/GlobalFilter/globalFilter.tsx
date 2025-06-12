import { RowData } from "@tanstack/react-table";
import React from "react";
import { ClearInputAdornment } from "../../../../common/OutlinedInput/components/InputAdornment/components/ClearInputAdornment/clearInputAdornment";
import { SearchInputAdornment } from "../../../../common/OutlinedInput/components/InputAdornment/components/SearchInputAdornment/searchInputAdornment";
import { StyledOutlinedInput } from "../../../../common/OutlinedInput/outlinedInput.styles";
import { OUTLINED_INPUT_PROPS } from "./constants";
import { useGlobalFilter } from "./hook";
import { GlobalFilterProps } from "./types";

export const GlobalFilter = <T extends RowData>({
  className,
  table,
  ...props /* MuiOutlinedInputProps */
}: GlobalFilterProps<T>): JSX.Element => {
  const { onChange, onClear, value } = useGlobalFilter(table);
  return (
    <StyledOutlinedInput
      {...OUTLINED_INPUT_PROPS}
      className={className}
      endAdornment={<ClearInputAdornment in={!!value} onClick={onClear} />}
      hasValue={Boolean(value)}
      onChange={onChange}
      startAdornment={<SearchInputAdornment />}
      value={value ?? ""}
      {...props}
    />
  );
};
