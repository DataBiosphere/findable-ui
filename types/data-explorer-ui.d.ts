import {
  Theme as MTheme,
  PaletteColorOptions,
  TypographyStyleOptions,
} from "@mui/material";
import type {} from "@mui/material/Alert";
import type {} from "@mui/material/Button";
import type {} from "@mui/material/Checkbox";
import type {} from "@mui/material/Chip";
import type {} from "@mui/material/CircularProgress";
import type {} from "@mui/material/IconButton";
import type {} from "@mui/material/Paper";
import type {} from "@mui/material/styles";
import type {} from "@mui/material/SvgIcon";
import type {} from "@mui/material/TableCell";
import type {} from "@mui/material/Tabs";
import type {} from "@mui/material/themeCssVarsAugmentation";
import type {} from "@mui/material/Toolbar";
import type {} from "@mui/material/Typography";
import type {} from "@tanstack/react-table";
import { RowData } from "@tanstack/react-table";
import { Components } from "rehype-react";
import { DataLayer } from "../src/common/analytics/entities";
import { DataDictionaryAnnotation } from "../src/common/entities";
import {
  CustomFeatureColumn,
  CustomFeatureInitialTableState,
  CustomFeatureInstance,
  CustomFeatureOptions,
  CustomFeatureRow,
  CustomFeatureTableState,
} from "../src/components/Table/features/entities";
import { GridTrackSize } from "../src/config/entities";
import { SIZE } from "../src/styles/common/constants/size";

declare module "@mui/material/Alert" {
  interface AlertProps {
    size?: SIZE.MEDIUM | SIZE.LARGE;
  }

  interface AlertPropsColorOverrides {
    ink: true;
    primary: true;
    smoke: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    activeNav: true;
    backNav: true;
    nav: true;
  }
}

declare module "@mui/material/CircularProgress" {
  interface CircularProgressPropsColorOverrides {
    alert: true;
  }
}

declare module "@mui/material/Checkbox" {
  interface CheckboxPropsSizeOverrides {
    xsmall: true;
  }
}

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

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    footer: true;
    menu: true;
    panel: true;
    searchbar: true;
  }
}

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

declare module "@mui/material/Tabs" {
  interface TabsPropsIndicatorColorOverrides {
    transparent: true;
  }
}

/* eslint-disable sonarjs/no-duplicate-string  -- ignoring duplicate strings here */

declare module "@mui/material/styles" {
  interface CssVarsTheme {
    vars: CssVarsTheme["vars"] & {
      app?: {
        fontFamily?: string;
      };
    };
  }

  interface ThemeVars {
    app?: {
      fontFamily?: string;
    };
  }

  interface BreakpointOverrides {
    lg: true;
    md: true;
    sm: true;
    xl: false;
    xs: true;
  }

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

  interface Theme {
    app?: {
      fontFamily?: string;
    };
  }

  interface ThemeOptions {
    app?: {
      fontFamily?: string;
    };
  }

  interface TypographyVariants {
    "body-400": TypographyStyleOptions;
    "body-400-2lines": TypographyStyleOptions;
    "body-500": TypographyStyleOptions;
    "body-large-400": TypographyStyleOptions;
    "body-large-400-2lines": TypographyStyleOptions;
    "body-large-500": TypographyStyleOptions;
    "body-small-400": TypographyStyleOptions;
    "body-small-400-2lines": TypographyStyleOptions;
    "body-small-500": TypographyStyleOptions;
    heading: TypographyStyleOptions;
    "heading-large": TypographyStyleOptions;
    "heading-small": TypographyStyleOptions;
    "heading-xlarge": TypographyStyleOptions;
    "heading-xsmall": TypographyStyleOptions;
    "uppercase-500": TypographyStyleOptions;
  }

  interface TypographyVariantsOptions {
    "body-400"?: TypographyStyleOptions;
    "body-400-2lines"?: TypographyStyleOptions;
    "body-500"?: TypographyStyleOptions;
    "body-500-2lines"?: TypographyStyleOptions;
    "body-large-400"?: TypographyStyleOptions;
    "body-large-400-2lines"?: TypographyStyleOptions;
    "body-large-500"?: TypographyStyleOptions;
    "body-small-400"?: TypographyStyleOptions;
    "body-small-400-2lines"?: TypographyStyleOptions;
    "body-small-500"?: TypographyStyleOptions;
    heading?: TypographyStyleOptions;
    "heading-large"?: TypographyStyleOptions;
    "heading-small"?: TypographyStyleOptions;
    "heading-xlarge"?: TypographyStyleOptions;
    "heading-xsmall"?: TypographyStyleOptions;
    "uppercase-500"?: TypographyStyleOptions;
  }
}

/* eslint-enable sonarjs/no-duplicate-string  -- watching duplicate strings here */

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    "body-400": true;
    "body-400-2lines": true;
    "body-500": true;
    "body-500-2lines": true;
    "body-large-400": true;
    "body-large-400-2lines": true;
    "body-large-500": true;
    "body-small-400": true;
    "body-small-400-2lines": true;
    "body-small-500": true;
    heading: true;
    "heading-large": true;
    "heading-small": true;
    "heading-xlarge": true;
    "heading-xsmall": true;
    "uppercase-500": true;
  }
}

declare module "@emotion/react" {
  export interface Theme extends MTheme {
    name: "EmotionTheme";
  }
}

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TData and TValue are unused variables.
  interface Column<TData extends RowData, TValue> extends CustomFeatureColumn {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TData and TValue are unused variables.
  interface ColumnDefBase<TData extends RowData, TValue> {
    enableTableDownload?: boolean;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TData and TValue are unused variables.
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: TableCellProps["align"];
    annotation?: DataDictionaryAnnotation;
    columnPinned?: boolean;
    components?: Partial<Components>; // For `MarkdownRendererCell` component.
    header?: string;
    width?: GridTrackSize;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface -- empty interface is needed for extending.
  interface InitialTableState extends CustomFeatureInitialTableState {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars -- empty interface is needed for extending, TData is an unused variable.
  interface Row<TData extends RowData> extends CustomFeatureRow {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TData is an unused variables.
  interface SortingOptions<TData extends RowData> {
    /**
     * When false, sorting can still be applied programmatically (e.g., `getSortedRowModel`),
     * but user interactions or showing sort icons are disabled.
     */
    enableSortingInteraction?: boolean;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface -- empty interface is needed for extending.
  interface Table<TData extends RowData> extends CustomFeatureInstance<TData> {}

  interface TableOptionsResolved<TData extends RowData>
    extends CustomFeatureOptions<TData> {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface -- empty interface is needed for extending.
  interface TableState extends CustomFeatureTableState {}
}

/**
 * Window interface, containing Google Tag Manager data layer object.
 */
declare global {
  interface Window {
    dataLayer: DataLayer;
  }
}
