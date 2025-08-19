import { OutlinedInputProps } from "@mui/material";
import { TEXT_FIELD_PROPS as MUI_TEXT_FIELD_PROPS } from "../../../../../../styles/common/mui/textField";

export const TEXT_FIELD_PROPS: OutlinedInputProps = {
  color: MUI_TEXT_FIELD_PROPS.COLOR.SECONDARY,
  fullWidth: true,
  placeholder: "Search all filters...",
  size: MUI_TEXT_FIELD_PROPS.SIZE.SMALL,
};
