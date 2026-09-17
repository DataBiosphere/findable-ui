import { EastRounded, WestRounded } from "@mui/icons-material";
import { IconButton, tablePaginationClasses, Typography } from "@mui/material";
import { JSX } from "react";
import { ICON_BUTTON_PROPS } from "../../../../styles/common/mui/iconButton";
import { SVG_ICON_PROPS } from "../../../../styles/common/mui/svgIcon";
import { TYPOGRAPHY_PROPS } from "../../../../styles/common/mui/typography";
import { TEST_IDS } from "../../../../tests/testIds";
import { ARIA_LABEL } from "./constants";
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
      container
      data-testid={TEST_IDS.TABLE_PAGINATION}
    >
      <IconButton
        aria-label={ARIA_LABEL.PREVIOUS_PAGE}
        color={ICON_BUTTON_PROPS.COLOR.SECONDARY}
        disabled={!canPreviousPage}
        onClick={onPreviousPage}
      >
        <WestRounded fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL} />
      </IconButton>
      <Typography
        data-testid={TEST_IDS.TABLE_PAGINATION_PAGE}
        variant={TYPOGRAPHY_PROPS.VARIANT.BODY_500}
      >
        Page {currentPage} of {totalPage}
      </Typography>
      <IconButton
        aria-label={ARIA_LABEL.NEXT_PAGE}
        color={ICON_BUTTON_PROPS.COLOR.SECONDARY}
        disabled={!canNextPage}
        onClick={onNextPage}
      >
        <EastRounded fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL} />
      </IconButton>
    </StyledGrid>
  );
};
