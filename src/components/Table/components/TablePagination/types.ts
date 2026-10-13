/**
 * Props for the TablePagination component.
 */
export interface TablePaginationProps {
  canNextPage?: boolean;
  canPreviousPage?: boolean;
  currentPage: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  totalPage: number;
}
