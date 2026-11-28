import type { ChipProps, LinkProps } from "@mui/material";
import type { ColumnDef } from "@tanstack/react-table";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { BasicCell } from "../src/components/DataDictionary/components/Table/components/BasicCell/basicCell";
import { ChipCell } from "../src/components/Table/components/TableCell/components/ChipCell/chipCell";
import { CodeCell } from "../src/components/Table/components/TableCell/components/CodeCell/codeCell";
import { LinkCell } from "../src/components/Table/components/TableCell/components/LinkCell/linkCell";
import type { ComponentConfig } from "../src/config/entities";

/*
 * These cells type their props by the value getter they read. The view builders and column
 * definitions below carry no casts: `npm run test-compile` fails if a cell's props go back to
 * the full TanStack cell context, whose generic getter a plain function does not satisfy.
 */

interface Row {
  code: string;
  label: string;
  url: string;
}

const ROW: Row = {
  code: "GRCh38",
  label: "Explore",
  url: "https://www.example.com",
};

type ViewBuilder<C extends ComponentConfig["component"]> = NonNullable<
  ComponentConfig<C, Row>["viewBuilder"]
>;

const buildBasic: ViewBuilder<typeof BasicCell> = (row) => ({
  getValue: (): ReactNode => row.label,
});

const buildChip: ViewBuilder<typeof ChipCell> = (row) => ({
  getValue: (): ChipProps => ({ label: row.label }),
});

const buildCode: ViewBuilder<typeof CodeCell> = (row) => ({
  getValue: (): ReactNode => row.code,
});

const buildLink: ViewBuilder<typeof LinkCell> = (row) => ({
  getValue: (): LinkProps => ({ children: row.label, href: row.url }),
});

describe("BasicCell", () => {
  it("renders the value from a view builder's getter", () => {
    render(<BasicCell {...buildBasic(ROW)} />);
    expect(screen.getByText(ROW.label)).toBeInTheDocument();
  });

  it("type-checks as a TanStack column cell", () => {
    // `npm run test-compile` enforces this; the expectation only keeps the column in use.
    const column: ColumnDef<Row, ReactNode> = {
      accessorKey: "label",
      cell: BasicCell,
    };
    expect(column.cell).toBe(BasicCell);
  });
});

describe("ChipCell", () => {
  it("renders the chip from a view builder's getter", () => {
    render(<ChipCell {...buildChip(ROW)} />);
    expect(screen.getByText(ROW.label)).toBeInTheDocument();
  });

  it("type-checks as a TanStack column cell", () => {
    // `npm run test-compile` enforces this; the expectation only keeps the column in use.
    const column: ColumnDef<Row, ChipProps> = {
      accessorFn: (row) => ({ label: row.label }),
      cell: ChipCell,
      id: "chip",
    };
    expect(column.cell).toBe(ChipCell);
  });
});

describe("CodeCell", () => {
  it("renders the code from a view builder's getter", () => {
    render(<CodeCell {...buildCode(ROW)} />);
    expect(screen.getByText(ROW.code)).toBeInTheDocument();
  });

  it.each([0, "", false, null, undefined])(
    "renders nothing when the value is %p",
    (value) => {
      const { container } = render(
        <CodeCell getValue={(): ReactNode => value} />,
      );
      expect(container).toBeEmptyDOMElement();
    },
  );

  it("type-checks as a TanStack column cell", () => {
    // `npm run test-compile` enforces this; the expectation only keeps the column in use.
    const column: ColumnDef<Row, ReactNode> = {
      accessorKey: "code",
      cell: CodeCell,
    };
    expect(column.cell).toBe(CodeCell);
  });
});

describe("LinkCell", () => {
  it("renders the link from a view builder's getter", () => {
    render(<LinkCell {...buildLink(ROW)} />);
    expect(screen.getByText(ROW.label)).toHaveAttribute("href", ROW.url);
  });

  it("type-checks as a TanStack column cell", () => {
    // `npm run test-compile` enforces this; the expectation only keeps the column in use.
    const column: ColumnDef<Row, LinkProps> = {
      accessorFn: (row) => ({ children: row.label, href: row.url }),
      cell: LinkCell,
      id: "link",
    };
    expect(column.cell).toBe(LinkCell);
  });
});
