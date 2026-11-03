import type { ColumnDef } from "@tanstack/react-table";
import type { ColumnVisibilityPreset } from "../../../../../features/ColumnVisibilityPresets/types";
import type { Row } from "./types";

export const COLUMNS: ColumnDef<Row>[] = [
  { accessorKey: "accession", enableHiding: false, header: "Accession" },
  { accessorKey: "organism", header: "Organism" },
  { accessorKey: "level", header: "Level" },
  { accessorKey: "coverage", header: "Coverage" },
  { accessorKey: "contigN50", header: "Contig N50" },
  { accessorKey: "source", header: "Source" },
];

export const COLUMN_VISIBILITY_PRESETS: ColumnVisibilityPreset[] = [
  {
    columnVisibility: { contigN50: false, coverage: false },
    key: "default",
    label: "Default",
  },
  {
    columnVisibility: { organism: false, source: false },
    key: "quality",
    label: "Quality",
  },
  { columnVisibility: {}, key: "all", label: "All columns" },
];

export const ROWS: Row[] = [
  {
    accession: "GCA_000001405.29",
    contigN50: 57879411,
    coverage: "50x",
    level: "Chromosome",
    organism: "Homo sapiens",
    source: "GenBank",
  },
  {
    accession: "GCA_000001635.9",
    contigN50: 32273079,
    coverage: "30x",
    level: "Chromosome",
    organism: "Mus musculus",
    source: "GenBank",
  },
  {
    accession: "GCF_000146045.2",
    contigN50: 924431,
    coverage: "19.1x",
    level: "Complete genome",
    organism: "Saccharomyces cerevisiae",
    source: "RefSeq",
  },
];
