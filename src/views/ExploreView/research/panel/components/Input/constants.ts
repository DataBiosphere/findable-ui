import { InputBaseProps } from "@mui/material";
import { INPUT_BASE_PROPS as MUI_INPUT_BASE_PROPS } from "../../../../../../styles/common/mui/inputBase";

export const INPUT_BASE_PROPS: InputBaseProps = {
  autoFocus: true,
  color: MUI_INPUT_BASE_PROPS.COLOR.PRIMARY,
  fullWidth: true,
  inputProps: { autoComplete: "off", spellCheck: false },
  margin: MUI_INPUT_BASE_PROPS.MARGIN.DENSE,
  maxRows: 4,
  minRows: 1,
  multiline: true,
  name: "ai-promt",
  placeholder: "Ask anything",
};
