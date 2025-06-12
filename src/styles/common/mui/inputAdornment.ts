import { InputAdornmentProps } from "@mui/material";

type InputAdornmentPropsOptions = {
  POSITION: typeof POSITION;
  VARIANT: typeof VARIANT;
};

const POSITION: Record<string, InputAdornmentProps["position"]> = {
  END: "end",
  START: "start",
};

const VARIANT: Record<string, InputAdornmentProps["variant"]> = {
  FILLED: "filled",
  OUTLINED: "outlined",
  STANDARD: "standard",
};

export const INPUT_ADORNMENT_PROPS: InputAdornmentPropsOptions = {
  POSITION,
  VARIANT,
};
