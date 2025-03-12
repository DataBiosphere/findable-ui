import { CellContext } from "@tanstack/react-table";
import { Attribute } from "../../../../../../common/entities";
import { AttributeValue } from "../../columns/types";

export type BasicCellProps = CellContext<Attribute, AttributeValue>;
