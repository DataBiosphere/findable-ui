import { CloseRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { Fragment, useContext } from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../../../hooks/useBreakpointHelper";
import { ListboxContext } from "../../../SearchAllFilters/searchAllFilters";

export const SearchCloseButton = (): JSX.Element => {
  const lgDown = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, "lg");
  const { onClearSearch, onCloseSearch, open, searchTerm } =
    useContext(ListboxContext);
  const showButton = open && (lgDown || searchTerm);
  const onClickFn = lgDown ? onCloseSearch : onClearSearch;
  return (
    <Fragment>
      {showButton && (
        <IconButton onClick={onClickFn} size="large">
          <CloseRounded fontSize="small" />
        </IconButton>
      )}
    </Fragment>
  );
};
