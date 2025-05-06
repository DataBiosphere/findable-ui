import { ColumnDef } from "@tanstack/react-table";
import {
  Attribute,
  AttributeValueTypes,
  Class,
} from "../../../../common/entities";
import { LayoutSpacing } from "../../hooks/UseLayoutSpacing/types";

export interface ClassesProps {
  classes: Class[];
  columnDefs: ColumnDef<Attribute, AttributeValueTypes>[];
  spacing?: LayoutSpacing;
}
