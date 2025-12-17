import { OutlinedInputProps } from "@mui/material";
import { TEXT_FIELD_PROPS as MUI_TEXT_FIELD_PROPS } from "../../../../../../styles/common/mui/textField";

export const OUTLINED_INPUT_PROPS: OutlinedInputProps = {
  autoComplete: "off",
  color: MUI_TEXT_FIELD_PROPS.COLOR.SECONDARY,
  fullWidth: true,
  id: "query-to-facets",
  name: "query-to-facets",
  placeholder: "Type what you want to find...",
  size: MUI_TEXT_FIELD_PROPS.SIZE.SMALL,
};
