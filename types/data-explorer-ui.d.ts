import { Theme as MTheme } from "@mui/material";
import type {} from "@mui/material/Alert";
import type {} from "@mui/material/Button";
import type {} from "@mui/material/Checkbox";
import type {} from "@mui/material/Chip";
import type {} from "@mui/material/IconButton";
import type {} from "@mui/material/Paper";
import type {} from "@mui/material/styles";
import type {} from "@mui/material/styles/createPalette";
import { PaletteColorOptions } from "@mui/material/styles/createPalette";
import { TypographyStyleOptions } from "@mui/material/styles/createTypography";
import type {} from "@mui/material/SvgIcon";
import type {} from "@mui/material/Tabs";
import type {} from "@mui/material/Toolbar";
import type {} from "@mui/material/Typography";
import { RowData } from "@tanstack/react-table";
import { DataLayer } from "../src/common/analytics/entities";
import { GridTrackSize } from "../src/config/entities";

/**
 * Alert prop options.
 */
declare module "@mui/material/Alert" {
  interface AlertPropsColorOverrides {
    ink: true;
    primary: true;
  }

  interface AlertPropsVariantOverrides {
    banner: true; // Single line alert.
    neutral: true;
  }
}

/**
 * Breakpoint definitions.
 */
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    lg: true;
    md: true;
    sm: true;
    xl: false;
    xs: true;
  }
}

/**
 * Button prop options.
 */
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    nav: true;
  }
}

/**
 * Checkbox prop options.
 */
declare module "@mui/material/Checkbox" {
  interface CheckboxPropsSizeOverrides {
    xsmall: true;
  }
}

/**
 * Chip prop options.
 */
declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    default: true;
    info: true;
    warning: true;
  }

  interface ChipPropsVariantOverrides {
    filterTag: true;
    ntag: true;
    status: true;
  }
}

/**
 * IconButton prop options.
 */
declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    ink: true;
    inkLight: true;
  }

  interface IconButtonPropsSizeOverrides {
    xlarge: true;
    xsmall: true;
    xxsmall: true;
  }
}

/**
 * Palette definitions.
 */
declare module "@mui/material/styles/createPalette" {
  interface Palette {
    alert: PaletteColor;
    ink: PaletteColor;
    smoke: PaletteColor;
  }

  interface PaletteColor {
    lightest?: string;
  }

  interface PaletteOptions {
    alert?: PaletteColorOptions;
    ink?: PaletteColorOptions;
    smoke?: PaletteColorOptions;
  }

  interface SimplePaletteColorOptions {
    lightest?: string;
  }
}

/**
 * Paper prop options.
 */
declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    footer: true;
    menu: true;
    panel: true;
    searchbar: true;
  }
}

/**
 * SvgIcon prop options.
 */
declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    inkLight: true;
    inkMain: true;
  }

  interface SvgIconPropsSizeOverrides {
    xsmall: true;
    xxlarge: true;
    xxsmall: true;
  }
}

/**
 * Tabs prop options.
 */
declare module "@mui/material/Tabs" {
  interface TabsPropsIndicatorColorOverrides {
    transparent: true;
  }
}

/* eslint-disable sonarjs/no-duplicate-string  -- ignoring duplicate strings here */

/**
 * Typography definitions.
 */
declare module "@mui/material/styles" {
  interface TypographyVariants {
    "text-body-400": TypographyStyleOptions;
    "text-body-400-2lines": TypographyStyleOptions;
    "text-body-500": TypographyStyleOptions;
    "text-body-500-2lines": TypographyStyleOptions;
    "text-body-large-400": TypographyStyleOptions;
    "text-body-large-400-2lines": TypographyStyleOptions;
    "text-body-large-500": TypographyStyleOptions;
    "text-body-small-400": TypographyStyleOptions;
    "text-body-small-400-2lines": TypographyStyleOptions;
    "text-body-small-500": TypographyStyleOptions;
    "text-heading": TypographyStyleOptions;
    "text-heading-large": TypographyStyleOptions;
    "text-heading-small": TypographyStyleOptions;
    "text-heading-xlarge": TypographyStyleOptions;
    "text-uppercase-500": TypographyStyleOptions;
  }

  interface TypographyVariantsOptions {
    "text-body-400"?: TypographyStyleOptions;
    "text-body-400-2lines"?: TypographyStyleOptions;
    "text-body-500"?: TypographyStyleOptions;
    "text-body-500-2lines"?: TypographyStyleOptions;
    "text-body-large-400"?: TypographyStyleOptions;
    "text-body-large-400-2lines"?: TypographyStyleOptions;
    "text-body-large-500"?: TypographyStyleOptions;
    "text-body-small-400"?: TypographyStyleOptions;
    "text-body-small-400-2lines"?: TypographyStyleOptions;
    "text-body-small-500"?: TypographyStyleOptions;
    "text-heading"?: TypographyStyleOptions;
    "text-heading-large"?: TypographyStyleOptions;
    "text-heading-small"?: TypographyStyleOptions;
    "text-heading-xlarge"?: TypographyStyleOptions;
    "text-uppercase-500"?: TypographyStyleOptions;
  }
}

/**
 * Toolbar prop options.
 */
declare module "@mui/material/Toolbar" {
  interface ToolbarPropsVariantOverrides {
    table: true;
  }
}

/**
 * Typography variant overrides.
 */
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    "text-body-400": true;
    "text-body-400-2lines": true;
    "text-body-500": true;
    "text-body-500-2lines": true;
    "text-body-large-400": true;
    "text-body-large-400-2lines": true;
    "text-body-large-500": true;
    "text-body-small-400": true;
    "text-body-small-400-2lines": true;
    "text-body-small-500": true;
    "text-heading": true;
    "text-heading-large": true;
    "text-heading-small": true;
    "text-heading-xlarge": true;
    "text-uppercase-500": true;
  }
}

/* eslint-enable sonarjs/no-duplicate-string  -- watching duplicate strings here */

declare module "@emotion/react" {
  export interface Theme extends MTheme {
    name: "EmotionTheme";
  }
}

declare module "@tanstack/table-core" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TData and TValue are unused variables.
  interface ColumnMeta<TData extends RowData, TValue> {
    columnPinned?: boolean;
    header?: string;
    width?: GridTrackSize;
  }
}

/**
 * Window interface, containing Google Tag Manager data layer object.
 */
declare global {
  interface Window {
    dataLayer: DataLayer;
  }
}
