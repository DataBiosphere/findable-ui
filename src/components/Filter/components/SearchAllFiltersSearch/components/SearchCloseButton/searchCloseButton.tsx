import { CloseRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { Fragment, useContext } from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../../../hooks/useBreakpointHelper";
import { DESKTOP_SM } from "../../../../../../theme/common/breakpoints";
import { ListboxContext } from "../../../SearchAllFilters/searchAllFilters";

export const SearchCloseButton = (): JSX.Element => {
  const desktopSmDown = useBreakpointHelper(
    BREAKPOINT_FN_NAME.DOWN,
    DESKTOP_SM
  );
  const { onClearSearch, onCloseSearch, open, searchTerm } =
    useContext(ListboxContext);
  const showButton = open && (desktopSmDown || searchTerm);
  const onClickFn = desktopSmDown ? onCloseSearch : onClearSearch;
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
