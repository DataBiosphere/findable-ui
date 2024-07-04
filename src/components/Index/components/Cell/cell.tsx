import React from "react";

export interface CellProps {
  value?: number | string | string[];
}

/**
 * @deprecated - use BasicCell from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/BasicCell/basicCell"
 */

export const Cell = ({ value = "Unspecified" }: CellProps): JSX.Element => {
  if (typeof value === "string" || typeof value === "number") {
    return <div>{value}</div>;
  }
  return (
    <>
      {value.map((v: string) => (
        <div key={v}>{v}</div>
      ))}
    </>
  );
};
