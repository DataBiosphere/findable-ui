import { PaginationOptions } from "@tanstack/react-table";

export const PAGINATION_OPTIONS: Pick<PaginationOptions, "autoResetPageIndex"> =
  {
    autoResetPageIndex: false, // Temporary fix for hydration issue, see https://github.com/TanStack/table/issues/5026.
  };
