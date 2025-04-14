import { EastRounded, WestRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import { TEST_IDS } from "../../../../tests/testIds";
import { IconButton } from "../../../common/IconButton/iconButton";
import { Stack } from "../../../common/Stack/stack";
import { Pagination as TablePagination } from "./pagination.styles";

export interface PaginationProps {
  canNextPage?: boolean;
  canPreviousPage?: boolean;
  currentPage: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  totalPage: number;
}

export const Pagination = ({
  canNextPage = true,
  canPreviousPage = true,
  currentPage,
  onNextPage,
  onPreviousPage,
  totalPage,
}: PaginationProps): JSX.Element => {
  return (
    <TablePagination data-testid={TEST_IDS.TABLE_PAGINATION}>
      <div data-testid={TEST_IDS.TABLE_PAGINATION_PAGE}>
        <Typography variant="text-body-400">Page </Typography>
        <Typography variant="text-body-500">
          {currentPage} of {totalPage}
        </Typography>
      </div>
      <Stack direction="row" gap={2}>
        <IconButton
          color="secondary"
          disabled={!canPreviousPage}
          Icon={WestRounded}
          onClick={onPreviousPage}
        />
        <IconButton
          color="secondary"
          disabled={!canNextPage}
          Icon={EastRounded}
          onClick={onNextPage}
        />
      </Stack>
    </TablePagination>
  );
};
