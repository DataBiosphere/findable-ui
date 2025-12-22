import { AutocompleteRenderInputParams } from "@mui/material";
import { JSX } from "react";
import { ClearInputAdornment } from "../../../../../common/OutlinedInput/components/InputAdornment/components/ClearInputAdornment/clearInputAdornment";
import { SearchInputAdornment } from "../../../../../common/OutlinedInput/components/InputAdornment/components/SearchInputAdornment/searchInputAdornment";
import { StyledOutlinedInput } from "../../../../../common/OutlinedInput/outlinedInput.styles";
import { useAutocomplete } from "../../context/hook";
import { TEXT_FIELD_PROPS } from "./constants";
import { isButtonIn } from "./utils";

export const OutlinedInput = (
  props: AutocompleteRenderInputParams,
): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Intended behavior, destructure InputLabelProps, as they are not used on the component.
  const { InputLabelProps, InputProps, ...outlinedInputProps } = props;
  const { onClear, open, searchTerm, surfaceType } = useAutocomplete();
  return (
    <StyledOutlinedInput
      {...TEXT_FIELD_PROPS}
      {...InputProps}
      {...outlinedInputProps}
      endAdornment={
        <ClearInputAdornment
          in={isButtonIn(surfaceType, searchTerm, open)}
          onClick={onClear}
        />
      }
      hasValue={!!searchTerm}
      startAdornment={<SearchInputAdornment />}
    />
  );
};
