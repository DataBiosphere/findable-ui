import { ClientSafeProvider } from "next-auth/react";
import { ReactNode } from "react";
import { OAuthProvider } from "../../config/entities";

export interface Props<P> {
  providers?: ClientSafeProvider[] | OAuthProvider<P>[];
  termsOfService?: ReactNode;
  text?: ReactNode;
  title: string;
  warning?: ReactNode;
}
