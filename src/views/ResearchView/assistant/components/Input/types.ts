import { IconButtonProps, InputBaseProps } from "@mui/material";

export type InputProps = InputBaseProps & Pick<IconButtonProps, "disabled">;
