import { ReactNode } from "react";
import { LoginProvider } from "../../auth/types/loginProvider";
import { BaseComponentProps } from "../types";

/**
 * Props for the Login component.
 */
export interface Props extends BaseComponentProps {
  providers?: LoginProvider[];
  termsOfService?: ReactNode;
  text?: ReactNode;
  title: string;
  warning?: ReactNode;
}
