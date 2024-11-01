import { AlertProps } from "@mui/material";
import { COLOR, VARIANT } from "../../../styles/common/mui/alert";
import { FlatPaper } from "../Paper/paper.styles";

export const ALERT_PROPS: Partial<AlertProps> = {
  color: COLOR.PRIMARY,
  component: FlatPaper,
  elevation: 0,
  icon: false,
  variant: VARIANT.FILLED,
};
