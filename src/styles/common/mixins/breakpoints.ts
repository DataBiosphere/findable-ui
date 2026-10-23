import { ThemeProps } from "../../../theme/types";

/**
 * Media query for viewports narrower than 820px.
 * @param props - Theme props.
 * @param props.theme - MUI theme.
 * @returns The media query string.
 */
export const bpDown820 = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down(820);

/**
 * Media query for viewports narrower than 1024px.
 * @param props - Theme props.
 * @param props.theme - MUI theme.
 * @returns The media query string.
 */
export const bpDown1024 = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down(1024);

/**
 * Media query for viewports at or wider than 1024px.
 * @param props - Theme props.
 * @param props.theme - MUI theme.
 * @returns The media query string.
 */
export const bpUp1024 = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up(1024);

/**
 * Media query for viewports at or wider than 1366px.
 * @param props - Theme props.
 * @param props.theme - MUI theme.
 * @returns The media query string.
 */
export const bpUp1366 = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up(1366);

/**
 * Media query for viewports narrower than the `lg` breakpoint.
 * @param props - Theme props.
 * @param props.theme - MUI theme.
 * @returns The media query string.
 */
export const bpDownLg = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down("lg");

/**
 * Media query for viewports narrower than the `md` breakpoint.
 * @param props - Theme props.
 * @param props.theme - MUI theme.
 * @returns The media query string.
 */
export const bpDownMd = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down("md");

/**
 * Media query for viewports narrower than the `sm` breakpoint.
 * @param props - Theme props.
 * @param props.theme - MUI theme.
 * @returns The media query string.
 */
export const bpDownSm = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down("sm");

/**
 * Media query for viewports at or wider than the `lg` breakpoint.
 * @param props - Theme props.
 * @param props.theme - MUI theme.
 * @returns The media query string.
 */
export const bpUpLg = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up("lg");

/**
 * Media query for viewports at or wider than the `md` breakpoint.
 * @param props - Theme props.
 * @param props.theme - MUI theme.
 * @returns The media query string.
 */
export const bpUpMd = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up("md");

/**
 * Media query for viewports at or wider than the `sm` breakpoint.
 * @param props - Theme props.
 * @param props.theme - MUI theme.
 * @returns The media query string.
 */
export const bpUpSm = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up("sm");

/**
 * Media query for viewports at or wider than the `xs` breakpoint.
 * @param props - Theme props.
 * @param props.theme - MUI theme.
 * @returns The media query string.
 */
export const bpUpXs = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up("xs");
