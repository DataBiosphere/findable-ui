import { Grid } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { Attribute } from "../../../../common/entities";
import { NoResults } from "../../../NoResults/noResults";
import { Entity } from "../Entity/entity";
import { GRID_PROPS, NO_RESULTS_PROPS } from "./constants";
import { ClassesProps } from "./types";

/**
 * Data dictionary entities: one entity per grouped row of the table, where each group is a class (e.g. "donor").
 * @param props - Component props.
 * @param props.table - TanStack table instance, grouped by class.
 * @returns The entities, or a no results message when the table has no grouped rows.
 */
export const Entities = <T extends RowData = Attribute>({
  table,
}: ClassesProps<T>): JSX.Element => {
  const { getGroupedRowModel } = table;
  const { rows } = getGroupedRowModel();

  if (rows.length === 0) return <NoResults {...NO_RESULTS_PROPS} />;

  return (
    <Grid {...GRID_PROPS}>
      {/* Render grouped rows where each "group" is a class e.g. "donor" */}
      {rows.map((row) => (
        <Entity key={row.id} row={row} table={table} />
      ))}
    </Grid>
  );
};
