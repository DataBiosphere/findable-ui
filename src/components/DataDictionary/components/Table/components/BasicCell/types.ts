import { CellContext } from "@tanstack/react-table";
import {
  Attribute,
  AttributeValueTypes,
} from "../../../../../../common/entities";

export type BasicCellProps = CellContext<Attribute, AttributeValueTypes>;
