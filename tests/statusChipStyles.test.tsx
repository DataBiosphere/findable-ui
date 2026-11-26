import styled from "@emotion/styled";
import { Chip, Theme, ThemeProvider } from "@mui/material";
import { composeStories } from "@storybook/react";
import { StatusBadge } from "../src/components/common/StatusBadge/statusBadge";
import { STATUS_CHIP_PROPS } from "../src/contracts/cc/StatusChip/constants";
import { StatusChip } from "../src/contracts/cc/StatusChip/statusChip";
import * as stories from "../src/contracts/cc/StatusChip/stories/statusChip.stories";
import { CHIP_PROPS } from "../src/contracts/mui/Chip/constants";
import { createAppTheme } from "../src/theme/theme";
import { renderChipStyles } from "./utils/chipStyles";
import {
  diffStyles,
  MUI_THEME,
  pickStyles,
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

// Label declarations the deprecated `status` variant gets, which StatusChip must set to the same values.
const STATUS_LABEL_PROPERTIES = ["font", "padding-left", "padding-right"];

// Root declarations a status chip gets from the deprecated `status` variant and the theme's colour variants, which
// StatusChip must set to the same values.
const STATUS_ROOT_PROPERTIES = [
  "background-color",
  "box-shadow",
  "color",
  "height",
  "max-width",
  "min-width",
];

const THEME = createAppTheme();

recordInsertedRules();

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
      expect(pickStyles(chip.root, "&", STATUS_ROOT_PROPERTIES)).toEqual(
        pickStyles(badge.root, "&", STATUS_ROOT_PROPERTIES),
      );
      expect(
        pickStyles(chip.root, "& .MuiChip-label", STATUS_LABEL_PROPERTIES),
      ).toEqual(pickStyles(badge.label, "&", STATUS_LABEL_PROPERTIES));
    });
  }

  it("should set its colours itself, not from the theme's MuiChip colour variants", () => {
    // MUI's default theme has none of findable-ui's MuiChip colour variants, so the same declarations there show they
    // come from StatusChip's own styles. The values are palette CSS variables, which the theme's palette still sets.
    for (const color of Object.values(STATUS_CHIP_PROPS.COLOR)) {
      const chip = renderChipStyles(
        <ThemeProvider theme={MUI_THEME}>
          <StatusChip color={color} label={LABEL} />
        </ThemeProvider>,
      );
      const themed = renderChipStyles(
        <ThemeProvider theme={THEME}>
          <StatusChip color={color} label={LABEL} />
        </ThemeProvider>,
      );
      expect(chip.root["&"]["background-color"]).toBe(
        themed.root["&"]["background-color"],
      );
      expect(chip.root["&"].color).toBe(themed.root["&"].color);
    }
  });

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

describe("StatusChip size and variant", () => {
  /**
   * Renders a default StatusChip, with any extra props, under the given theme.
   * @param theme - Theme to render with.
   * @param extraProps - Props an untyped caller could still pass, such as size or variant.
   * @returns Resolved styles for the root and label elements.
   */
  function renderDefaultStatusChipStyles(
    theme: Theme,
    extraProps: object = {},
  ): Record<string, ResolvedStyles> {
    return renderChipStyles(
      <ThemeProvider theme={theme}>
        <StatusChip
          {...extraProps}
          color={STATUS_CHIP_PROPS.COLOR.DEFAULT}
          label={LABEL}
        />
      </ThemeProvider>,
    );
  }

  // Every size and variant MUI has, so a change to either shows whichever one StatusChip would otherwise get.
  for (const size of [CHIP_PROPS.SIZE.SMALL, CHIP_PROPS.SIZE.MEDIUM]) {
    for (const variant of [
      CHIP_PROPS.VARIANT.FILLED,
      CHIP_PROPS.VARIANT.OUTLINED,
    ]) {
      it(`should keep its styles when ${size} ${variant} is passed in`, () => {
        // The props type leaves size and variant out; an untyped caller could still pass them.
        expect(renderDefaultStatusChipStyles(THEME, { size, variant })).toEqual(
          renderDefaultStatusChipStyles(THEME),
        );
      });

      it(`should keep its styles when the theme's MuiChip defaults are ${size} ${variant}`, () => {
        const theme = createAppTheme({
          components: { MuiChip: { defaultProps: { size, variant } } },
        });
        expect(renderDefaultStatusChipStyles(theme)).toEqual(
          renderDefaultStatusChipStyles(THEME),
        );
      });
    }
  }
});
