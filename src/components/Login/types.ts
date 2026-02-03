import { ReactNode } from "react";
import { LoginProvider } from "../../auth/types/loginProvider";

export interface Props {
  providers?: LoginProvider[];
  termsOfService?: ReactNode;
  text?: ReactNode;
  title: string;
  warning?: ReactNode;
}
