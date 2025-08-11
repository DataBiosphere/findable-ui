import { createTheme, Theme, ThemeOptions } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { breakpoints } from "./common/breakpoints";
import * as C from "./common/components";
import { fontStyles } from "./common/fontStyles";
import { palette } from "./common/palette";
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
        cssVarPrefix: "",
        cssVariables: true,
        palette,
        shadows,
        spacing: 4,
        typography: typography(baseTheme),
      },
      options
    )
  );

  // Theme components.
  theme.components = {
    MuiAccordion: C.MuiAccordion,
    MuiAccordionDetails: C.MuiAccordionDetails,
    MuiAccordionSummary: C.MuiAccordionSummary,
    MuiAlert: M.MuiAlert,
    MuiAlertTitle: M.MuiAlertTitle,
    MuiAppBar: C.MuiAppBar,
    MuiBackdrop: C.MuiBackdrop,
    MuiBreadcrumbs: C.MuiBreadcrumbs,
    MuiButton: C.MuiButton,
    MuiButtonBase: C.MuiButtonBase,
    MuiButtonGroup: M.MuiButtonGroup,
    MuiCard: C.MuiCard,
    MuiCheckbox: C.MuiCheckbox,
    MuiChip: C.MuiChip,
    MuiCircularProgress: C.MuiCircularProgress,
    MuiCssBaseline: C.MuiCssBaseline,
    MuiDialog: C.MuiDialog,
    MuiDialogActions: C.MuiDialogActions,
    MuiDialogContent: C.MuiDialogContent,
    MuiDialogTitle: C.MuiDialogTitle,
    MuiDivider: C.MuiDivider,
    MuiDrawer: C.MuiDrawer,
    MuiFormControlLabel: C.MuiFormControlLabel,
    MuiFormGroup: C.MuiFormGroup,
    MuiFormHelperText: C.MuiFormHelperText,
    MuiIconButton: C.MuiIconButton,
    MuiInputBase: C.MuiInputBase,
    MuiLink: C.MuiLink,
    MuiListItemButton: C.MuiListItemButton,
    MuiListItemText: C.MuiListItemText,
    MuiListSubheader: C.MuiListSubheader,
    MuiMenuItem: C.MuiMenuItem,
    MuiOutlinedInput: C.MuiOutlinedInput,
    MuiPaper: C.MuiPaper,
    MuiRadio: C.MuiRadio,
    MuiSelect: C.MuiSelect,
    MuiSvgIcon: C.MuiSvgIcon,
    MuiTab: C.MuiTab,
    MuiTableCell: M.MuiTableCell,
    MuiTableSortLabel: C.MuiTableSortLabel,
    MuiTabs: C.MuiTabs,
    MuiToggleButton: C.MuiToggleButton,
    MuiToggleButtonGroup: C.MuiToggleButtonGroup,
    MuiToolbar: C.MuiToolbar,
    MuiTooltip: C.MuiTooltip,
    MuiTypography: C.MuiTypography,
  };

  return theme;
}
