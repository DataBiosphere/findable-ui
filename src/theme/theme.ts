import { createTheme, Theme, ThemeOptions } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { breakpoints } from "./common/breakpoints";
import * as C from "./common/components";
import { fontStyles } from "./common/fontStyles";
import * as P from "./common/palette";
import { shadows } from "./common/shadows";
import { typography } from "./common/typography";
import * as M from "./components";

/**
 * Returns a generated theme with customization.
 * @param customOptions - Custom theme option overrides.
 * @returns theme with custom theme overrides.
 */
export function createAppTheme(customOptions: ThemeOptions = {}): Theme {
  // Clone custom options to avoid mutation.
  const options = { ...customOptions };

  // Create base theme.
  const baseTheme = createTheme({
    breakpoints: breakpoints(options),
    typography: fontStyles(options),
  });

  // Remove breakpoints from custom options.
  delete options.breakpoints;

  // Generate default theme with custom overrides.
  const theme = createTheme(
    deepmerge(
      {
        app: { fontFamily: baseTheme.typography.fontFamily },
        breakpoints: baseTheme.breakpoints,
        cssVariables: true,
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
        shadows,
        spacing: 4,
        typography: typography(baseTheme),
      },
      options
    )
  );

  // Theme components.
  theme.components = {
    MuiAccordion: C.MuiAccordion(theme),
    MuiAccordionDetails: C.MuiAccordionDetails,
    MuiAccordionSummary: C.MuiAccordionSummary,
    MuiAlert: M.MuiAlert(theme),
    MuiAlertTitle: M.MuiAlertTitle,
    MuiAppBar: C.MuiAppBar,
    MuiBackdrop: C.MuiBackdrop,
    MuiBreadcrumbs: C.MuiBreadcrumbs(theme),
    MuiButton: C.MuiButton(theme),
    MuiButtonBase: C.MuiButtonBase,
    MuiButtonGroup: M.MuiButtonGroup,
    MuiCard: C.MuiCard,
    MuiCheckbox: C.MuiCheckbox(theme),
    MuiChip: C.MuiChip(theme),
    MuiCircularProgress: C.MuiCircularProgress(theme),
    MuiCssBaseline: C.MuiCssBaseline(theme),
    MuiDialog: C.MuiDialog,
    MuiDialogActions: C.MuiDialogActions,
    MuiDialogContent: C.MuiDialogContent(theme),
    MuiDialogTitle: C.MuiDialogTitle,
    MuiDivider: C.MuiDivider(theme),
    MuiDrawer: C.MuiDrawer,
    MuiFormControlLabel: C.MuiFormControlLabel,
    MuiFormGroup: C.MuiFormGroup,
    MuiFormHelperText: C.MuiFormHelperText(theme),
    MuiIconButton: C.MuiIconButton(theme),
    MuiInputBase: C.MuiInputBase,
    MuiLink: C.MuiLink,
    MuiListItemButton: C.MuiListItemButton(theme),
    MuiListItemText: C.MuiListItemText,
    MuiListSubheader: C.MuiListSubheader(theme),
    MuiMenuItem: C.MuiMenuItem,
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
