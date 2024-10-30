import { AlertProps } from "@mui/material";
import { COLOR, SEVERITY, VARIANT } from "../../../styles/common/mui/alert";

export const ALERT_PROPS: Record<string, Partial<AlertProps>> = {
  FILLED_INK: {
    color: COLOR.INK,
    variant: VARIANT.FILLED,
  },
  FILLED_PRIMARY: {
    color: COLOR.PRIMARY,
    variant: VARIANT.FILLED,
  },
  FILLED_SMOKE: {
    color: COLOR.SMOKE,
    variant: VARIANT.FILLED,
  },
  STANDARD_ERROR: {
    severity: SEVERITY.ERROR,
  },
  STANDARD_INFO: {
    severity: SEVERITY.INFO,
  },
  STANDARD_SUCCESS: {
    severity: SEVERITY.SUCCESS,
  },
  STANDARD_WARNING: {
    severity: SEVERITY.WARNING,
  },
};
