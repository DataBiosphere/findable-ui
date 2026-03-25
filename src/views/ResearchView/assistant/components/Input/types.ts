import { IconButtonProps, InputBaseProps } from "@mui/material";

export type InputProps = Omit<InputBaseProps, "onChange" | "value"> &
  Pick<IconButtonProps, "disabled">;
