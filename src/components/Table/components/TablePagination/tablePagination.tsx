import { EastRounded, WestRounded } from "@mui/icons-material";
import { IconButton, tablePaginationClasses, Typography } from "@mui/material";
import React from "react";
import { ICON_BUTTON_PROPS } from "../../../../styles/common/mui/iconButton";
import { TYPOGRAPHY_PROPS } from "../../../../styles/common/mui/typography";
import { TEST_IDS } from "../../../../tests/testIds";
import { StyledGrid } from "./tablePagination.styles";
import { TablePaginationProps } from "./types";

export const TablePagination = ({
  canNextPage = true,
  canPreviousPage = true,
  currentPage,
  onNextPage,
  onPreviousPage,
  totalPage,
}: TablePaginationProps): JSX.Element | null => {
  return (
    <StyledGrid
      className={tablePaginationClasses.root}
      data-testid={TEST_IDS.TABLE_PAGINATION}
    >
      <IconButton
        color={ICON_BUTTON_PROPS.COLOR.SECONDARY}
        disabled={!canPreviousPage}
        onClick={onPreviousPage}
      >
        <WestRounded />
      </IconButton>
      <Typography
        data-testid={TEST_IDS.TABLE_PAGINATION_PAGE}
        variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_500}
      >
        Page {currentPage} of {totalPage}
      </Typography>
      <IconButton
        color={ICON_BUTTON_PROPS.COLOR.SECONDARY}
        disabled={!canNextPage}
        onClick={onNextPage}
      >
        <EastRounded />
      </IconButton>
    </StyledGrid>
  );
};
