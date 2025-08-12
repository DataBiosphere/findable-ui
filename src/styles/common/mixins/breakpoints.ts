import { ThemeProps } from "../../../theme/types";

export const bpDown820 = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down(820);

export const bpDown1024 = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down(1024);

export const bpUp1366 = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up(1366);

export const bpDownLg = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down("lg");

export const bpDownMd = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down("md");

export const bpDownSm = ({ theme }: ThemeProps): string =>
  theme.breakpoints.down("sm");

export const bpUpLg = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up("lg");

export const bpUpMd = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up("md");

export const bpUpSm = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up("sm");

export const bpUpXs = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up("xs");
