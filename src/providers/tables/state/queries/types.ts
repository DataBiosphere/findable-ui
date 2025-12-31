import { NextRouter } from "next/router";
import { TableKey } from "../tables/types";

export type Queries = Record<TableKey, NextRouter["query"]>;
