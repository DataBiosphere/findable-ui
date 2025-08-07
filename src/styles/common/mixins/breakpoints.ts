import { ThemeProps } from "../../../theme/types";

export const bpDown820 = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down(820);

export const bpDown1024 = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down(1024);

export const bpDownSm = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down("sm");

export const bpUpLg = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up("lg");

export const bpUpSm = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up("sm");

export const bpUpXs = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up("xs");

export const mediaDesktopSmallDown = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down("md");

export const mediaDesktopSmallUp = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up("md");

export const mediaDesktopUp = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up("lg");

export const media1366Up = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up(1366);
