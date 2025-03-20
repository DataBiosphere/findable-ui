import { TypographyOwnProps } from "@mui/material";
import { TYPOGRAPHY_PROPS as MUI_TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";

export const TYPOGRAPHY_PROPS: Partial<TypographyOwnProps> = {
  sx: { marginRight: -2, paddingLeft: 2 },
  variant: MUI_TYPOGRAPHY_PROPS.VARIANT.INHERIT,
};
