import {
  Table,
  TableBody,
  TableCell,
  type TableCellProps,
  TableRow,
  type Theme,
  ThemeProvider,
} from "@mui/material";
import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import { TABLE_CELL_PROPS } from "../src/contracts/mui/TableCell/constants";
import {
  PADDINGS,
  SIZES,
  VARIANTS,
} from "../src/contracts/mui/TableCell/stories/constants";
import * as stories from "../src/contracts/mui/TableCell/stories/tableCell.stories";
import {
  TABLE_CELL_VARIANTS,
  VARIANT_HEAD,
} from "../src/contracts/mui/TableCell/theme";
import { createAppTheme } from "../src/theme/theme";
import {
  diffStyles,
  getEmotionStyles,
  MUI_THEME,
  recordInsertedRules,
  type ResolvedStyles,
} from "./utils/emotionStyles";

const { DEFAULT } = composeStories(stories);

const OVERRIDE_COLOR = "rgb(1, 2, 3)";

const THEME = createAppTheme();

recordInsertedRules();

/**
 * Returns the resolved styles of the TableCell rendered into a container.
 * @param container - Element the TableCell was rendered into.
 * @returns Resolved styles for the cell's root.
 */
function getTableCellStyles(container: HTMLElement): ResolvedStyles {
  return getEmotionStyles(
    container.querySelector(".MuiTableCell-root") as Element,
  );
}

/**
 * Renders a TableCell in a table body row under the given theme and returns its resolved styles.
 * @param props - TableCell props.
 * @param theme - Theme to render with.
 * @returns Resolved styles for the cell's root.
 */
function renderTableCellStyles(
  props: TableCellProps,
  theme: Theme,
): ResolvedStyles {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell {...props}>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ThemeProvider>,
  );
  return getTableCellStyles(container);
}

/**
 * Renders the TableCell story's DEFAULT with the given args, and returns only the styles findable-ui's theme
 * changes: each declaration MUI's default theme also produces for the same props is dropped.
 * @param props - TableCell props passed as story args.
 * @returns Theme-changed styles for the cell's root.
 */
function renderStoryTableCellStyles(props: TableCellProps): ResolvedStyles {
  const { container } = render(<DEFAULT {...props} />);
  return diffStyles(
    getTableCellStyles(container),
    renderTableCellStyles(props, MUI_THEME),
  );
}

describe("MuiTableCell theme styles", () => {
  // Pins what findable-ui's theme changes for every variant, size and padding it styles, so moving or restructuring
  // MuiTableCell can't change how cells look without the snapshot showing it. `align` is left out: the theme doesn't
  // style it.
  for (const variant of VARIANTS) {
    for (const size of SIZES) {
      for (const padding of PADDINGS) {
        it(`should keep the ${variant} ${size} ${padding} styles`, () => {
          expect(
            renderStoryTableCellStyles({ padding, size, variant }),
          ).toMatchSnapshot();
        });
      }
    }
  }
});

describe("MuiTableCell exported variants", () => {
  // These render outside the story, because the story's decorator always applies the default theme. An app overrides
  // one variant by spreading TABLE_CELL_VARIANTS and appending its own entry, because MUI's theme merge replaces the
  // whole variants array.
  const overrideTheme = createAppTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            variants: [
              ...TABLE_CELL_VARIANTS,
              {
                props: VARIANT_HEAD.props,
                style: { backgroundColor: OVERRIDE_COLOR },
              },
            ],
          },
        },
      },
    },
  });

  it("should change only the overridden declaration of the head cell", () => {
    const props: TableCellProps = { variant: TABLE_CELL_PROPS.VARIANT.HEAD };
    const base = renderTableCellStyles(props, THEME);
    expect(renderTableCellStyles(props, overrideTheme)).toEqual({
      ...base,
      "&": { ...base["&"], "background-color": OVERRIDE_COLOR },
    });
  });

  it("should leave the body cell unchanged", () => {
    const props: TableCellProps = { variant: TABLE_CELL_PROPS.VARIANT.BODY };
    expect(renderTableCellStyles(props, overrideTheme)).toEqual(
      renderTableCellStyles(props, THEME),
    );
  });
});
