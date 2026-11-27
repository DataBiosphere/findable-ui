import { jest } from "@jest/globals";
import { CloseRounded } from "@mui/icons-material";
import { Chip, type ChipProps, type Theme, ThemeProvider } from "@mui/material";
import { composeStories } from "@storybook/react";
import { CHIP_PROPS } from "../src/contracts/mui/Chip/constants";
import * as stories from "../src/contracts/mui/Chip/stories/chip.stories";
import {
  COLORS,
  SIZES,
  VARIANTS,
} from "../src/contracts/mui/Chip/stories/constants";
import { CHIP_VARIANTS, COLOR_SUCCESS } from "../src/contracts/mui/Chip/theme";
import { PALETTE } from "../src/styles/common/constants/palette";
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

const LABEL = "Label";

const OVERRIDE_COLOR = "rgb(1, 2, 3)";

const THEME = createAppTheme();

// Props that make a chip removable and clickable, so MUI adds its hover, focus and active styles.
const REMOVABLE: Partial<ChipProps> = {
  deleteIcon: <CloseRounded />,
  onClick: jest.fn(),
  onDelete: jest.fn(),
};

// Not in the story's ALL_COMBINATIONS: the custom variants, which are, or are to become, their own components. Each
// renders at both sizes and with no size, so the theme's default size and the order of the size variants against
// these are pinned too.
const CUSTOM_VARIANTS: Partial<ChipProps>[] = [
  { color: CHIP_PROPS.COLOR.PRIMARY, variant: "filterTag" },
  { color: CHIP_PROPS.COLOR.DEFAULT, variant: "ntag" },
  { color: CHIP_PROPS.COLOR.DEFAULT, variant: "status" },
  { color: CHIP_PROPS.COLOR.SUCCESS, variant: "status" },
];

recordInsertedRules();

/**
 * Renders the Chip story's DEFAULT with the given args, and returns only the styles findable-ui's theme changes: each
 * declaration MUI's default theme also produces for the same props is dropped, so MUI's own updates don't show.
 * @param props - Chip props passed as story args.
 * @returns Theme-changed styles for the root and label elements.
 */
function renderStoryChipStyles(
  props: Partial<ChipProps>,
): Record<string, ResolvedStyles> {
  const themed = renderChipStyles(<DEFAULT {...props} label={LABEL} />);
  const base = renderThemedChipStyles(props, MUI_THEME);
  return {
    label: diffStyles(themed.label, base.label),
    root: diffStyles(themed.root, base.root),
  };
}

/**
 * Renders a Chip under the given theme and returns its resolved styles.
 * @param props - Chip props.
 * @param theme - Theme to render with.
 * @returns Resolved styles for the root and label elements.
 */
function renderThemedChipStyles(
  props: Partial<ChipProps>,
  theme: Theme,
): Record<string, ResolvedStyles> {
  return renderChipStyles(
    <ThemeProvider theme={theme}>
      <Chip {...props} label={LABEL} />
    </ThemeProvider>,
  );
}

/**
 * Names a test case after its variant, colour and size.
 * @param props - Chip props.
 * @returns E.g. "filled success small", or "status default no size".
 */
function toName(props: Partial<ChipProps>): string {
  return [props.variant, props.color, props.size ?? "no size"].join(" ");
}

describe("MuiChip theme styles", () => {
  // Pins what findable-ui's theme changes for every colour, size and variant, so moving or restructuring MuiChip
  // can't change how chips look without the snapshot showing it. MUI's own base styles are left out. Every case
  // renders through the story, with its props as args.
  for (const variant of VARIANTS) {
    for (const color of COLORS) {
      for (const size of SIZES) {
        const props: Partial<ChipProps> = { color, size, variant };
        it(`should keep the ${toName(props)} styles`, () => {
          expect(renderStoryChipStyles(props)).toMatchSnapshot();
        });
        it(`should keep the ${toName(props)} removable styles`, () => {
          expect(
            renderStoryChipStyles({ ...props, ...REMOVABLE }),
          ).toMatchSnapshot();
        });
        it(`should keep the ${toName(props)} removable disabled styles`, () => {
          expect(
            renderStoryChipStyles({ ...props, ...REMOVABLE, disabled: true }),
          ).toMatchSnapshot();
        });
      }
    }
  }

  it("should keep the styles of a chip with no size", () => {
    expect(renderStoryChipStyles({ size: undefined })).toMatchSnapshot();
  });

  it("should draw a primary focus ring on keyboard focus, as mui/Button does", () => {
    const { root } = renderThemedChipStyles({}, THEME);
    expect(
      pickStyles(root, "&:focus-visible", ["outline", "outline-offset"]),
    ).toEqual({
      outline: `2px solid ${PALETTE.PRIMARY_MAIN}`,
      "outline-offset": "2px",
    });
  });

  for (const customVariant of CUSTOM_VARIANTS) {
    for (const size of [...SIZES, undefined]) {
      const props = { ...customVariant, size };
      it(`should keep the ${toName(props)} styles`, () => {
        expect(renderStoryChipStyles(props)).toMatchSnapshot();
      });
    }
  }
});

describe("MuiChip exported variants", () => {
  // These render outside the story, because the story's decorator always applies the default theme. An app overrides
  // one variant by spreading CHIP_VARIANTS and appending its own entry, because MUI's theme merge replaces the whole
  // variants array.
  const overrideTheme = createAppTheme({
    components: {
      MuiChip: {
        styleOverrides: {
          root: {
            variants: [
              ...CHIP_VARIANTS,
              {
                props: COLOR_SUCCESS.props,
                style: { backgroundColor: OVERRIDE_COLOR },
              },
            ],
          },
        },
      },
    },
  });

  const success: Partial<ChipProps> = { color: CHIP_PROPS.COLOR.SUCCESS };

  it("should change only the overridden declaration of success", () => {
    const { root: base } = renderThemedChipStyles(success, THEME);
    const { root: overridden } = renderThemedChipStyles(success, overrideTheme);
    expect(overridden).toEqual({
      ...base,
      "&": { ...base["&"], "background-color": OVERRIDE_COLOR },
    });
  });

  it("should leave info unchanged", () => {
    const info: Partial<ChipProps> = { color: CHIP_PROPS.COLOR.INFO };
    expect(renderThemedChipStyles(info, overrideTheme)).toEqual(
      renderThemedChipStyles(info, THEME),
    );
  });

  it("should drop findable-ui's variants for an app that sets its own without spreading them", () => {
    const appTheme = createAppTheme({
      components: {
        MuiChip: {
          styleOverrides: {
            root: {
              variants: [
                {
                  props: { color: CHIP_PROPS.COLOR.INFO },
                  style: { backgroundColor: OVERRIDE_COLOR },
                },
              ],
            },
          },
        },
      },
    });
    // MUI's own filled success styles show instead of findable-ui's light background and 20px height.
    const { root } = renderThemedChipStyles(success, appTheme);
    const { root: base } = renderThemedChipStyles(success, THEME);
    expect(base["&"]["background-color"]).toBe(PALETTE.SUCCESS_LIGHT);
    expect(base["&"].height).toBe("20px");
    expect(root["&"]["background-color"]).not.toBe(PALETTE.SUCCESS_LIGHT);
    expect(root["&"].height).not.toBe("20px");
  });
});
