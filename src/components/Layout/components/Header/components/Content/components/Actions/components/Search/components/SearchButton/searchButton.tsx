import { Fade, IconButton } from "@mui/material";
import React from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../../../../../../../../../hooks/useBreakpointHelper";
import { DESKTOP_SM } from "../../../../../../../../../../../../theme/common/breakpoints";
import { SearchIcon } from "../../../../../../../../../../../common/CustomIcon/components/SearchIcon/searchIcon";
import { SWITCH_TRANSITION_PROPS } from "../../../../../../../../common/constants";
import { Button } from "./searchButton.styles";

export interface SearchProps {
  openSearch: () => void;
}

export const SearchButton = ({ openSearch }: SearchProps): JSX.Element => {
  const smDesktop = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, DESKTOP_SM);
  const switchProps = SWITCH_TRANSITION_PROPS;
  return (
    <>
      <Fade in={smDesktop} {...switchProps}>
        <Button onClick={openSearch} startIcon={<SearchIcon />} variant="nav">
          Search
        </Button>
      </Fade>
      <Fade in={!smDesktop} {...switchProps}>
        <IconButton color="ink" onClick={openSearch}>
          <SearchIcon fontSize="medium" />
        </IconButton>
      </Fade>
    </>
  );
};
