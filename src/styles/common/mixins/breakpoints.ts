import { ThemeProps } from "../../../theme/theme";

export const mediaDown = ({ theme }: ThemeProps, px: number): string =>
  theme.breakpoints.down(px);

export const mediaDownSmall = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down("sm");

export const mediaDownMedium = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down("md");

export const mediaDownLarge = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down("lg");

export const mediaDownXLarge = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down("xl");

export const mediaUp = ({ theme }: ThemeProps, px: number): string =>
  theme.breakpoints.up(px);

export const mediaUpXSmall = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up("xs");

export const mediaUpSmall = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up("sm");

export const mediaUpMedium = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up("md");

export const mediaUpLarge = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up("lg");

export const mediaUpXLarge = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up("xl");
