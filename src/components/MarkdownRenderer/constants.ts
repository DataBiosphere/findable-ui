import { Components } from "rehype-react";
import { Anchor } from "./components/Anchor/anchor";
import { Table } from "./components/Table/table";

export const COMPONENTS: Partial<Components> = {
  a: Anchor,
  table: Table,
};
