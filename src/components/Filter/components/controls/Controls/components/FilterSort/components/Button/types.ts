import { ButtonProps as MButtonProps, MenuProps } from "@mui/material";

export type ButtonProps = MButtonProps & Pick<MenuProps, "open">;
