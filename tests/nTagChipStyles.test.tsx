import styled from "@emotion/styled";
import { Chip, type Theme, ThemeProvider } from "@mui/material";
import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import { createRef } from "react";
import { NTagChip } from "../src/contracts/cc/NTagChip/nTagChip";
import * as stories from "../src/contracts/cc/NTagChip/stories/nTagChip.stories";
import { CHIP_PROPS } from "../src/styles/common/mui/chip";
import { createAppTheme } from "../src/theme/theme";
import { renderChipStyles } from "./utils/chipStyles";
import {
  diffStyles,
  MUI_THEME,
  pickStyles,
  recordInsertedRules,
  type ResolvedStyles,
} from "./utils/emotionStyles";

const { DEFAULT } = composeStories(stories);

const LABEL = "3 species";

// Label declarations the deprecated `ntag` variant gets, which NTagChip must set to the same values.
const NTAG_LABEL_PROPERTIES = ["font", "padding-left", "padding-right"];

// Root declarations a default-colour `ntag` chip gets from the deprecated `ntag` variant and the theme's default colour,
// which NTagChip must set to the same values.
const NTAG_ROOT_PROPERTIES = [
  "background-color",
  "box-shadow",
  "color",
  "font",
  "height",
  "justify-self",
  "min-width",
];

const OVERRIDE_COLOR = "rgb(1, 2, 3)";

// An app restyling one tag through `className`.
const OverriddenNTagChip = styled(NTagChip)`
  background-color: ${OVERRIDE_COLOR};
  color: ${OVERRIDE_COLOR};
`;

const THEME = createAppTheme();

recordInsertedRules();

describe("NTagChip styles", () => {
  // Pins what findable-ui adds to a plain MUI Chip under MUI's default theme, so restructuring NTagChip or MuiChip
  // can't change how tags look without the snapshot showing it.
  it("should keep its styles", () => {
    const chip = renderChipStyles(<DEFAULT label={LABEL} />);
    const base = renderChipStyles(
      <ThemeProvider theme={MUI_THEME}>
        <Chip label={LABEL} />
      </ThemeProvider>,
    );
    expect({
      label: diffStyles(chip.label, base.label),
      root: diffStyles(chip.root, base.root),
    }).toMatchSnapshot();
  });

  it("should draw the tag as the ntag variant does", () => {
    // Under MUI's default theme, so NTagChip's own styles are the only source of each value.
    const chip = renderChipStyles(
      <ThemeProvider theme={MUI_THEME}>
        <NTagChip label={LABEL} />
      </ThemeProvider>,
    );
    // The deprecated `ntag` variant, under findable-ui's theme at its default size.
    const nTag = renderChipStyles(
      <ThemeProvider theme={THEME}>
        <Chip label={LABEL} variant="ntag" />
      </ThemeProvider>,
    );
    expect(pickStyles(chip.root, "&", NTAG_ROOT_PROPERTIES)).toEqual(
      pickStyles(nTag.root, "&", NTAG_ROOT_PROPERTIES),
    );
    expect(
      pickStyles(chip.root, "& .MuiChip-label", NTAG_LABEL_PROPERTIES),
    ).toEqual(pickStyles(nTag.label, "&", NTAG_LABEL_PROPERTIES));
  });

  it("should let a className override the colours", () => {
    const { root } = renderChipStyles(
      <ThemeProvider theme={THEME}>
        <OverriddenNTagChip label={LABEL} />
      </ThemeProvider>,
    );
    expect(root["&"]["background-color"]).toBe(OVERRIDE_COLOR);
    expect(root["&"].color).toBe(OVERRIDE_COLOR);
  });

  it("should pass its ref to the chip's root, for a tooltip to anchor to", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <ThemeProvider theme={THEME}>
        <NTagChip label={LABEL} ref={ref} />
      </ThemeProvider>,
    );
    expect(ref.current).toBe(container.querySelector(".MuiChip-root"));
  });
});

describe("NTagChip color, size and variant", () => {
  /**
   * Renders an NTagChip, with any extra props, under the given theme.
   * @param theme - Theme to render with.
   * @param extraProps - Props an untyped caller could still pass, such as color, size or variant.
   * @returns Resolved styles for the root and label elements.
   */
  function renderNTagChipStyles(
    theme: Theme,
    extraProps: object = {},
  ): Record<string, ResolvedStyles> {
    return renderChipStyles(
      <ThemeProvider theme={theme}>
        <NTagChip {...extraProps} label={LABEL} />
      </ThemeProvider>,
    );
  }

  // Every size and variant MUI has, so a change to either shows whichever one NTagChip would otherwise get.
  for (const size of [CHIP_PROPS.SIZE.SMALL, CHIP_PROPS.SIZE.MEDIUM]) {
    for (const variant of [
      CHIP_PROPS.VARIANT.FILLED,
      CHIP_PROPS.VARIANT.OUTLINED,
    ]) {
      it(`should keep its styles when ${size} ${variant} is passed in`, () => {
        // The props type leaves size and variant out; an untyped caller could still pass them.
        expect(renderNTagChipStyles(THEME, { size, variant })).toEqual(
          renderNTagChipStyles(THEME),
        );
      });

      it(`should keep its styles when the theme's MuiChip defaults are ${size} ${variant}`, () => {
        const theme = createAppTheme({
          components: { MuiChip: { defaultProps: { size, variant } } },
        });
        expect(renderNTagChipStyles(theme)).toEqual(
          renderNTagChipStyles(THEME),
        );
      });
    }
  }

  it("should keep its styles when a color is passed in", () => {
    // The props type leaves color out; an untyped caller could still pass it.
    expect(
      renderNTagChipStyles(THEME, { color: CHIP_PROPS.COLOR.PRIMARY }),
    ).toEqual(renderNTagChipStyles(THEME));
  });

  it("should keep its styles when the theme's MuiChip default color changes", () => {
    const theme = createAppTheme({
      components: {
        MuiChip: { defaultProps: { color: CHIP_PROPS.COLOR.PRIMARY } },
      },
    });
    expect(renderNTagChipStyles(theme)).toEqual(renderNTagChipStyles(THEME));
  });
});
