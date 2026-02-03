import { ButtonProps } from "@mui/material";
import { LoginProvider } from "../../../../auth/types/login-provider";
import { BaseComponentProps } from "../../../types";

export interface Props extends BaseComponentProps, ButtonProps {
  handleLogin: (providerId: string) => void;
  providers?: LoginProvider[];
}
