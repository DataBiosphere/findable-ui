import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  type TableSortLabelProps,
  type Theme,
  ThemeProvider,
} from "@mui/material";
import { composeStories } from "@storybook/react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DIRECTIONS } from "../src/contracts/mui/TableSortLabel/stories/constants";
import * as stories from "../src/contracts/mui/TableSortLabel/stories/tableSortLabel.stories";
import { createAppTheme } from "../src/theme/theme";
import {
  diffStyles,
  getEmotionStyles,
  MUI_THEME,
  recordInsertedRules,
  type ResolvedStyles,
} from "./utils/emotionStyles";

const { DEFAULT } = composeStories(stories);

/**
 * Resolved styles of a TableSortLabel's root and icon elements.
 */
interface TableSortLabelStyles {
  icon: ResolvedStyles;
  root: ResolvedStyles;
}

recordInsertedRules();

/**
 * Returns the resolved styles of the TableSortLabel rendered into a container.
 * @param container - Element the TableSortLabel was rendered into.
 * @returns Resolved styles for the root and icon elements.
 */
function getTableSortLabelStyles(container: HTMLElement): TableSortLabelStyles {
  const root = container.querySelector(".MuiTableSortLabel-root") as Element;
  return {
    icon: getEmotionStyles(
      root.querySelector(".MuiTableSortLabel-icon") as Element,
    ),
    root: getEmotionStyles(root),
  };
}

/**
 * Renders a TableSortLabel in a head cell under the given theme and returns its resolved styles.
 * @param props - TableSortLabel props.
 * @param theme - Theme to render with.
 * @returns Resolved styles for the root and icon elements.
 */
function renderTableSortLabelStyles(
  props: TableSortLabelProps,
  theme: Theme,
): TableSortLabelStyles {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel {...props}>Name</TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </ThemeProvider>,
  );
  return getTableSortLabelStyles(container);
}

/**
 * Renders the TableSortLabel story's DEFAULT with the given args, and returns only the styles findable-ui's theme
 * changes: each declaration MUI's default theme also produces for the same props is dropped.
 * @param props - TableSortLabel props passed as story args.
 * @returns Theme-changed styles for the root and icon elements.
 */
function renderStoryTableSortLabelStyles(
  props: TableSortLabelProps,
): TableSortLabelStyles {
  const { container } = render(<DEFAULT {...props} />);
  const themed = getTableSortLabelStyles(container);
  const base = renderTableSortLabelStyles(props, MUI_THEME);
  return {
    icon: diffStyles(themed.icon, base.icon),
    root: diffStyles(themed.root, base.root),
  };
}

describe("MuiTableSortLabel theme styles", () => {
  // Pins what findable-ui's theme changes for the root and the icon, active or not, in each direction, and disabled,
  // so moving MuiTableSortLabel can't change how sort labels look without the snapshot showing it.
  for (const active of [true, false]) {
    for (const direction of DIRECTIONS) {
      it(`should keep the ${active ? "active" : "inactive"} ${direction} styles`, () => {
        expect(
          renderStoryTableSortLabelStyles({ active, direction }),
        ).toMatchSnapshot();
      });
    }
  }

  it("should keep the disabled styles", () => {
    expect(
      renderStoryTableSortLabelStyles({ disabled: true }),
    ).toMatchSnapshot();
  });
});

describe("MuiTableSortLabel default props", () => {
  it("should render the `SouthRounded` sort icon by default", () => {
    renderTableSortLabelStyles({ active: true }, createAppTheme());
    expect(screen.getByTestId("SouthRoundedIcon")).toBeInTheDocument();
  });
});
