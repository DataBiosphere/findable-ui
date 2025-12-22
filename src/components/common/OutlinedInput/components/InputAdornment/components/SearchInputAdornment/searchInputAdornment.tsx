import { JSX } from "react";
import { SearchIcon } from "../../../../../CustomIcon/components/SearchIcon/searchIcon";
import { StyledInputAdornment } from "../../inputAdornment.styles";
import { SVG_ICON_PROPS } from "../constants";
import { INPUT_ADORNMENT_PROPS } from "./constants";

export const SearchInputAdornment = (): JSX.Element => {
  return (
    <StyledInputAdornment {...INPUT_ADORNMENT_PROPS}>
      <SearchIcon {...SVG_ICON_PROPS} />
    </StyledInputAdornment>
  );
};
