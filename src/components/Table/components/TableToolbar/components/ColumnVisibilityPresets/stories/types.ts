import type { GroupingState, VisibilityState } from "@tanstack/react-table";

/**
 * Story table row: a genome assembly.
 */
export interface Row {
  accession: string;
  contigN50: number;
  coverage: string;
  level: string;
  organism: string;
  source: string;
}

/**
 * Props for the story table: its initial column visibility, if not the first preset's, and its initial grouping.
 */
export interface StoryTableProps {
  grouping?: GroupingState;
  initialColumnVisibility?: VisibilityState;
}
