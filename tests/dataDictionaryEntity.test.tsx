import { jest } from "@jest/globals";
import { ThemeProvider } from "@mui/material";
import type { Row, Table } from "@tanstack/react-table";
import { render, screen } from "@testing-library/react";
import type { Attribute } from "../src/common/entities";

jest.unstable_mockModule("next/router", () => ({
  ...jest.requireActual<typeof import("next/router")>("next/router"),
  useRouter: jest.fn(() => ({ query: {} })),
}));
// The attributes table isn't under test, and needs a full TanStack table.
jest.unstable_mockModule(
  "../src/components/DataDictionary/components/Table/table",
  () => ({ Table: (): null => null }),
);

const { createAppTheme } = await import("../src/theme/theme");
const { Entity } =
  await import("../src/components/DataDictionary/components/Entity/entity");

const CLASS_KEY = "data-access-policy";

const ROW = {
  getValue: () => CLASS_KEY,
} as unknown as Row<Attribute>;

const TABLE = {
  options: {
    meta: { classMeta: { [CLASS_KEY]: { title: "Data Access Policy" } } },
  },
} as unknown as Table<Attribute>;

describe("DataDictionary Entity", () => {
  it("names the class's anchor link after the class title", () => {
    // The entity's styles read the app theme.
    render(
      <ThemeProvider theme={createAppTheme()}>
        <Entity row={ROW} table={TABLE} />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole("link", { name: "Link to Data Access Policy" }),
    ).toBeTruthy();
  });
});
