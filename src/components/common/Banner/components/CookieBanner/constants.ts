import { AlertProps } from "@mui/material";
import { COLOR, VARIANT } from "../../../../../styles/common/mui/alert";

export const ALERT_PROPS: Partial<AlertProps> = {
  color: COLOR.INK,
  elevation: 2,
  icon: false,
  variant: VARIANT.FILLED,
};
