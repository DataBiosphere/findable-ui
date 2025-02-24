import { ButtonProps } from "@mui/material";
import { ClientSafeProvider } from "next-auth/react";
import { OAuthProvider } from "../../../../config/entities";
import { BaseComponentProps } from "../../../../theme/common/entities";

export interface Props<P> extends BaseComponentProps, ButtonProps {
  handleLogin: (providerId: string) => void;
  providers?: ClientSafeProvider[] | OAuthProvider<P>[];
}
