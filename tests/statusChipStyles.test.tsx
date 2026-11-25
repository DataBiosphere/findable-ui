import styled from "@emotion/styled";
import { Chip, ThemeProvider } from "@mui/material";
import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { StatusBadge } from "../src/components/common/StatusBadge/statusBadge";
import { STATUS_CHIP_PROPS } from "../src/contracts/cc/StatusChip/constants";
import { StatusChip } from "../src/contracts/cc/StatusChip/statusChip";
import * as stories from "../src/contracts/cc/StatusChip/stories/statusChip.stories";
import { createAppTheme } from "../src/theme/theme";
import {
  diffStyles,
  getEmotionStyles,
  MUI_THEME,
  recordInsertedRules,
  ResolvedStyles,
} from "./utils/emotionStyles";

const { DEFAULT } = composeStories(stories);

const LABEL = "Label";

const OVERRIDE_COLOR = "rgb(1, 2, 3)";

// An app restyling one status chip through `className`.
const OverriddenStatusChip = styled(StatusChip)`
  background-color: ${OVERRIDE_COLOR};
  color: ${OVERRIDE_COLOR};
`;

// Root declarations the deprecated `status` variant sets, which StatusChip must set to the same values.
const STATUS_ROOT_PROPERTIES = [
  "box-shadow",
  "color",
  "height",
  "max-width",
  "min-width",
];

const THEME = createAppTheme();

recordInsertedRules();

/**
 * Returns the given properties of the root's own styles.
 * @param styles - Resolved root styles.
 * @returns The root's value for each property in `STATUS_ROOT_PROPERTIES`.
 */
function pickStatusRootStyles(styles: ResolvedStyles): Record<string, string> {
  return Object.fromEntries(
    STATUS_ROOT_PROPERTIES.map((property) => [property, styles["&"][property]]),
  );
}

/**
 * Renders a Chip and returns the resolved styles of its root and label.
 * @param ui - Element that renders one Chip.
 * @returns Resolved styles for the root and label elements.
 */
function renderChipStyles(ui: ReactElement): Record<string, ResolvedStyles> {
  const root = render(ui).container.querySelector(".MuiChip-root") as Element;
  return {
    label: getEmotionStyles(root.querySelector(".MuiChip-label") as Element),
    root: getEmotionStyles(root),
  };
}

describe("StatusChip styles", () => {
  for (const color of Object.values(STATUS_CHIP_PROPS.COLOR)) {
    // Pins what findable-ui adds to a plain MUI Chip under MUI's default theme, so restructuring StatusChip or
    // MuiChip can't change how status chips look without the snapshot showing it.
    it(`should keep the ${color} styles`, () => {
      const chip = renderChipStyles(<DEFAULT color={color} label={LABEL} />);
      const base = renderChipStyles(
        <ThemeProvider theme={MUI_THEME}>
          <Chip color={color} label={LABEL} />
        </ThemeProvider>,
      );
      expect({
        label: diffStyles(chip.label, base.label),
        root: diffStyles(chip.root, base.root),
      }).toMatchSnapshot();
    });

    it(`should draw the ${color} chip as the status variant does`, () => {
      const chip = renderChipStyles(<DEFAULT color={color} label={LABEL} />);
      // The deprecated StatusBadge draws the chip with the `status` variant.
      const badge = renderChipStyles(
        <ThemeProvider theme={THEME}>
          <StatusBadge color={color} label={LABEL} />
        </ThemeProvider>,
      );
      expect(pickStatusRootStyles(chip.root)).toEqual(
        pickStatusRootStyles(badge.root),
      );
      expect(chip.root["& .MuiChip-label"].font).toBe(badge.label["&"].font);
    });
  }

  it("should let a className override the colours", () => {
    const { root } = renderChipStyles(
      <ThemeProvider theme={THEME}>
        <OverriddenStatusChip
          color={STATUS_CHIP_PROPS.COLOR.DEFAULT}
          label={LABEL}
        />
      </ThemeProvider>,
    );
    expect(root["&"]["background-color"]).toBe(OVERRIDE_COLOR);
    expect(root["&"].color).toBe(OVERRIDE_COLOR);
  });
});
