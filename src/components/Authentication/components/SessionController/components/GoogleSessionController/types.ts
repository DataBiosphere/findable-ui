import { ReactNode } from "react";
import { TokenState } from "../../../../../../providers/authentication/token/types";

export interface SessionControllerProps {
  children: ReactNode | ReactNode[];
  token: TokenState["token"];
}
