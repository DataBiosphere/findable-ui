import { Button, IconButton } from "@mui/material";
import React from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../../../hooks/useBreakpointHelper";
import { DESKTOP_SM } from "../../../../../../theme/common/breakpoints";
import { SearchIcon } from "../../../../../common/CustomIcon/components/SearchIcon/searchIcon";

type OpenSearchFn = () => void;

export interface SearchProps {
  openSearchFn: OpenSearchFn;
}

export const Search = ({ openSearchFn }: SearchProps): JSX.Element => {
  const smDesktop = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, DESKTOP_SM);
  return (
    <>
      {smDesktop ? (
        <Button onClick={openSearchFn} startIcon={<SearchIcon />} variant="nav">
          Search
        </Button>
      ) : (
        <IconButton color="ink" onClick={openSearchFn}>
          <SearchIcon fontSize="medium" />
        </IconButton>
      )}
    </>
  );
};
