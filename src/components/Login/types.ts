import { ReactNode } from "react";
import { LoginProvider } from "../../auth/types/login-provider";

export interface Props {
  providers?: LoginProvider[];
  termsOfService?: ReactNode;
  text?: ReactNode;
  title: string;
  warning?: ReactNode;
}
