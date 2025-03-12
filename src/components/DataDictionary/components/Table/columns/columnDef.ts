import { CellContext, ColumnDef } from "@tanstack/react-table";
import { Attribute } from "../../../../../common/entities";
import { BasicCell } from "../components/BasicCell/basicCell";
import { COLUMN_IDENTIFIER } from "./columnIdentifier";
import { AttributeValue } from "./types";

const COLUMN_DEF_DESCRIPTION: ColumnDef<Attribute, AttributeValue> = {
  accessorFn: (row) => row.description,
  cell: (props: CellContext<Attribute, AttributeValue>) =>
    BasicCell({ ...props }),
  header: "Description",
  id: COLUMN_IDENTIFIER.DESCRIPTION,
  meta: { width: { max: "2fr", min: "480px" } },
};

const COLUMN_DEF_KEY: ColumnDef<Attribute, AttributeValue> = {
  accessorFn: (row) => row.key,
  cell: (props: CellContext<Attribute, AttributeValue>) =>
    BasicCell({ ...props }),
  header: "Key",
  id: COLUMN_IDENTIFIER.KEY,
  meta: { width: { max: "1fr", min: "180px" } },
};

const COLUMN_DEF_LABEL: ColumnDef<Attribute, AttributeValue> = {
  accessorFn: (row) => row.label,
  cell: (props: CellContext<Attribute, AttributeValue>) =>
    BasicCell({ ...props }),
  header: "Label",
  id: COLUMN_IDENTIFIER.LABEL,
  meta: { width: { max: "1fr", min: "200px" } },
};

export const COLUMN_DEF: Record<
  keyof typeof COLUMN_IDENTIFIER,
  ColumnDef<Attribute, AttributeValue>
> = {
  DESCRIPTION: COLUMN_DEF_DESCRIPTION,
  KEY: COLUMN_DEF_KEY,
  LABEL: COLUMN_DEF_LABEL,
};

export const COLUMN_DEFS: ColumnDef<Attribute, AttributeValue>[] = [
  COLUMN_DEF.LABEL,
  COLUMN_DEF.KEY,
  COLUMN_DEF.DESCRIPTION,
];
