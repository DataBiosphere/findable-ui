import { TextFieldProps } from "@mui/material";
import React, { useContext } from "react";
import { SearchIcon } from "../../../common/CustomIcon/components/SearchIcon/searchIcon";
import { ListboxContext } from "../SearchAllFilters/searchAllFilters";
import { InputField } from "./searchAllFiltersSearch.styles";

export const SearchAllFiltersSearch = ({
  inputProps,
  InputProps,
  ...props
}: TextFieldProps): JSX.Element => {
  const { searchTerm } = useContext(ListboxContext);
  delete inputProps?.value; // Control input value from the search term.
  return (
    <InputField
      {...props}
      fullWidth
      InputProps={{
        ...(InputProps || {}),
        startAdornment: <SearchIcon fontSize="small" />,
      }}
      inputProps={{ ...(inputProps || {}), spellCheck: false }}
      placeholder="Search all filters..."
      size="small"
      value={searchTerm}
      variant="outlined"
    />
  );
};
