import { createTheme, Shadows, Theme, ThemeOptions } from "@mui/material";
import * as B from "./common/breakpoints";
import * as C from "./common/components";
import * as P from "./common/palette";
import { shadows } from "./common/shadows";
import * as T from "./common/typography";
import * as M from "./components";

export interface ThemeProps {
  theme: Theme;
}

/**
 * Returns a generated theme with customization.
 * @param customOptions - Custom theme option overrides.
 * @returns theme with custom theme overrides.
 */
export function createAppTheme(customOptions?: ThemeOptions): Theme {
  // Generate default theme with custom overrides.
  const theme = createTheme(
    {
      breakpoints: {
        values: {
          lg: B.desktop,
          md: B.desktopSm,
          sm: B.tablet,
          xs: B.mobile,
        },
      },
      palette: {
        alert: P.alert,
        background: P.background,
        common: P.common,
        info: P.info,
        ink: P.ink,
        primary: P.primary,
        smoke: P.smoke,
        success: P.success,
        text: P.text,
        warning: P.warning,
      },
      spacing: 4,
      typography: {
        [T.TEXT_BODY_400]: T.textBody400,
        [T.TEXT_BODY_400_2_LINES]: T.textBody4002Lines,
        [T.TEXT_BODY_500]: T.textBody500,
        [T.TEXT_BODY_500_2_LINES]: T.textBody5002Lines,
        [T.TEXT_BODY_LARGE_400]: T.textBodyLarge400,
        [T.TEXT_BODY_LARGE_400_2_LINES]: T.textBodyLarge4002Lines,
        [T.TEXT_BODY_LARGE_500]: T.textBodyLarge500,
        [T.TEXT_BODY_SMALL_400]: T.textBodySmall400,
        [T.TEXT_BODY_SMALL_400_2_LINES]: T.textBodySmall4002Lines,
        [T.TEXT_BODY_SMALL_500]: T.textBodySmall500,
        [T.TEXT_HEADING]: T.textHeading,
        [T.TEXT_HEADING_LARGE]: T.textHeadingLarge,
        [T.TEXT_HEADING_SMALL]: T.textHeadingSmall,
        [T.TEXT_HEADING_XLARGE]: T.textHeadingXLarge,
        [T.TEXT_HEADING_XSMALL]: T.textHeadingXSmall,
        [T.TEXT_UPPERCASE_500]: T.textUppercase500,
        fontFamily: T.fontFamily,
      },
    },
    { ...customOptions }
  );

  // Default shadow overrides.
  theme.shadows = [...theme.shadows].map(
    (shadow, s) => shadows[s] || shadow
  ) as Shadows;

  // Theme components.
  theme.components = {
    MuiAccordion: C.MuiAccordion(theme),
    MuiAccordionDetails: C.MuiAccordionDetails,
    MuiAccordionSummary: C.MuiAccordionSummary,
    MuiAlert: M.MuiAlert(theme),
    MuiAlertTitle: M.MuiAlertTitle,
    MuiAppBar: C.MuiAppBar,
    MuiBackdrop: C.MuiBackdrop(theme),
    MuiBreadcrumbs: C.MuiBreadcrumbs(theme),
    MuiButton: C.MuiButton(theme),
    MuiButtonBase: C.MuiButtonBase(theme),
    MuiButtonGroup: C.MuiButtonGroup(theme),
    MuiCard: C.MuiCard,
    MuiCheckbox: C.MuiCheckbox(theme),
    MuiChip: C.MuiChip(theme),
    MuiCircularProgress: C.MuiCircularProgress(theme),
    MuiCssBaseline: C.MuiCssBaseline(theme),
    MuiDialog: C.MuiDialog(theme),
    MuiDialogActions: C.MuiDialogActions,
    MuiDialogContent: C.MuiDialogContent(theme),
    MuiDialogTitle: C.MuiDialogTitle(theme),
    MuiDivider: C.MuiDivider(theme),
    MuiDrawer: C.MuiDrawer,
    MuiFormControlLabel: C.MuiFormControlLabel(theme),
    MuiFormGroup: C.MuiFormGroup,
    MuiFormHelperText: C.MuiFormHelperText(theme),
    MuiIconButton: C.MuiIconButton(theme),
    MuiInputBase: C.MuiInputBase(theme),
    MuiLink: C.MuiLink,
    MuiListItemButton: C.MuiListItemButton(theme),
    MuiListItemText: C.MuiListItemText,
    MuiListSubheader: C.MuiListSubheader(theme),
    MuiMenuItem: C.MuiMenuItem(theme),
    MuiOutlinedInput: C.MuiOutlinedInput(theme),
    MuiPaper: C.MuiPaper(theme),
    MuiRadio: C.MuiRadio(theme),
    MuiSelect: C.MuiSelect,
    MuiSvgIcon: C.MuiSvgIcon(theme),
    MuiTab: C.MuiTab(theme),
    MuiTableCell: M.MuiTableCell(theme),
    MuiTableSortLabel: C.MuiTableSortLabel,
    MuiTabs: C.MuiTabs(theme),
    MuiToggleButton: C.MuiToggleButton(theme),
    MuiToggleButtonGroup: C.MuiToggleButtonGroup(theme),
    MuiToolbar: C.MuiToolbar,
    MuiTooltip: C.MuiTooltip(theme),
    MuiTypography: C.MuiTypography,
  };

  return theme;
}

/**
 * Default theme without customization.
 */
export const defaultTheme: Theme = createAppTheme();
