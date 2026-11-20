import {
  Button,
  ButtonProps,
  createTheme,
  Theme,
  ThemeProvider,
} from "@mui/material";
import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import { BUTTON_PROPS } from "../src/contracts/mui/Button/constants";
import * as stories from "../src/contracts/mui/Button/stories/button.stories";
import {
  COMBINATIONS,
  SIZES,
} from "../src/contracts/mui/Button/stories/constants";
import {
  BUTTON_VARIANTS,
  CONTAINED_PRIMARY,
} from "../src/contracts/mui/Button/theme";
import { createAppTheme } from "../src/theme/theme";
import {
  diffStyles,
  getEmotionStyles,
  recordInsertedRules,
  ResolvedStyles,
} from "./utils/emotionStyles";

const { DEFAULT } = composeStories(stories);

// Not in the story's ALL_COMBINATIONS: the nav variants, which are to become their own component. They render through DEFAULT with args.
const NAV_VARIANTS: Pick<ButtonProps, "variant">[] = [
  { variant: "activeNav" },
  { variant: "backNav" },
  { variant: "nav" },
];

const OVERRIDE_COLOR = "rgb(1, 2, 3)";

// MUI's own default theme, with findable-ui's CSS variable settings, to subtract
// MUI's base styles from each snapshot.
const MUI_THEME = createTheme({ cssVariables: { cssVarPrefix: "" } });

const THEME = createAppTheme();

recordInsertedRules();

/**
 * Returns the resolved styles of a rendered Button's root and icon slots.
 * @param container - Element the Button was rendered into.
 * @returns Resolved styles for the root, startIcon and endIcon elements.
 */
function getButtonStyles(
  container: HTMLElement,
): Record<string, ResolvedStyles> {
  const root = container.querySelector(".MuiButton-root") as Element;
  return {
    endIcon: getEmotionStyles(
      root.querySelector(".MuiButton-endIcon") as Element,
    ),
    root: getEmotionStyles(root),
    startIcon: getEmotionStyles(
      root.querySelector(".MuiButton-startIcon") as Element,
    ),
  };
}

/**
 * Renders a Button with both icons under the given theme and returns its resolved styles.
 * @param props - Button props.
 * @param theme - Theme to render with.
 * @returns Resolved styles for the root, startIcon and endIcon elements.
 */
function renderButtonStyles(
  props: ButtonProps,
  theme: Theme = THEME,
): Record<string, ResolvedStyles> {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Button endIcon={<svg />} startIcon={<svg />} {...props}>
        Label
      </Button>
    </ThemeProvider>,
  );
  return getButtonStyles(container);
}

/**
 * Renders the Button story's DEFAULT with both icons and the given args, and returns
 * only the styles findable-ui's theme changes: each declaration MUI's default theme
 * also produces for the same props is dropped, so MUI's own updates don't show.
 * @param props - Button props passed as story args.
 * @returns Theme-changed styles for the root, startIcon and endIcon elements.
 */
function renderStoryButtonStyles(
  props: ButtonProps,
): Record<string, ResolvedStyles> {
  const { container } = render(
    <DEFAULT endIcon={<svg />} startIcon={<svg />} {...props} />,
  );
  const themed = getButtonStyles(container);
  const base = renderButtonStyles(props, MUI_THEME);
  return {
    endIcon: diffStyles(themed.endIcon, base.endIcon),
    root: diffStyles(themed.root, base.root),
    startIcon: diffStyles(themed.startIcon, base.startIcon),
  };
}

/**
 * Names a test case after its variant, colour and size.
 * @param props - Button props.
 * @returns E.g. "contained primary medium".
 */
function toName(props: ButtonProps): string {
  return [props.variant, props.color, props.size].filter(Boolean).join(" ");
}

describe("MuiButton theme styles", () => {
  // Pins what findable-ui's theme changes for every variant, colour and size it
  // styles, so moving or restructuring MuiButton can't change how buttons look
  // without the snapshot showing it. MUI's own base styles are left out. Every case renders through the story, with
  // its props as args.
  for (const combination of COMBINATIONS) {
    for (const size of SIZES) {
      const props = { ...combination, size };
      it(`should keep the ${toName(props)} styles`, () => {
        expect(renderStoryButtonStyles(props)).toMatchSnapshot();
      });
      it(`should keep the ${toName(props)} disabled styles`, () => {
        expect(
          renderStoryButtonStyles({ ...props, disabled: true }),
        ).toMatchSnapshot();
      });
    }
    const small = { ...combination, size: BUTTON_PROPS.SIZE.SMALL };
    it(`should keep the ${toName(small)} styles`, () => {
      expect(renderStoryButtonStyles(small)).toMatchSnapshot();
    });
  }

  for (const navVariant of NAV_VARIANTS) {
    for (const size of Object.values(BUTTON_PROPS.SIZE)) {
      const props = { ...navVariant, size };
      it(`should keep the ${toName(props)} styles`, () => {
        expect(renderStoryButtonStyles(props)).toMatchSnapshot();
      });
    }
  }
});

describe("MuiButton exported variants", () => {
  // These render outside the story, because the story's decorator always applies
  // the default theme. An app overrides one variant by spreading BUTTON_VARIANTS and appending its
  // own entry, because MUI's theme merge replaces the whole variants array.
  const overrideTheme = createAppTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            variants: [
              ...BUTTON_VARIANTS,
              {
                props: CONTAINED_PRIMARY.props,
                style: { backgroundColor: OVERRIDE_COLOR },
              },
            ],
          },
        },
      },
    },
  });

  it("should change only the overridden declaration of contained primary", () => {
    const props: ButtonProps = {
      color: BUTTON_PROPS.COLOR.PRIMARY,
      variant: BUTTON_PROPS.VARIANT.CONTAINED,
    };
    const { root: base } = renderButtonStyles(props);
    const { root: overridden } = renderButtonStyles(props, overrideTheme);
    expect(overridden).toEqual({
      ...base,
      "&": { ...base["&"], "background-color": OVERRIDE_COLOR },
    });
  });

  it("should leave outlined secondary unchanged", () => {
    const props: ButtonProps = {
      color: BUTTON_PROPS.COLOR.SECONDARY,
      variant: BUTTON_PROPS.VARIANT.OUTLINED,
    };
    expect(renderButtonStyles(props, overrideTheme)).toEqual(
      renderButtonStyles(props),
    );
  });
});
