import { ColumnDef } from "@tanstack/react-table";
import { Attribute, AttributeValue, Class } from "../../../../common/entities";
import { LayoutSpacing } from "../../hooks/UseLayoutSpacing/types";

export interface ClassesProps {
  classes: Class[];
  columnDefs: ColumnDef<Attribute, AttributeValue>[];
  spacing?: LayoutSpacing;
}
