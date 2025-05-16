import { Anchor } from "./components/Anchor/anchor";
import { Table } from "./components/Table/table";
import { MarkdownRendererComponents } from "./types";

export const COMPONENTS: MarkdownRendererComponents = {
  a: Anchor,
  table: Table,
};
