import { JSX } from "react";
import { LoginProvider } from "../../auth/types/loginProvider";
import { Login } from "../../components/Login/login";
import { BaseComponentProps } from "../../components/types";
import { useAuthenticationConfig } from "../../hooks/authentication/config/useAuthenticationConfig";

export interface LoginViewProps extends BaseComponentProps {
  providers?: LoginProvider[];
}

export const LoginView = ({
  className,
  providers,
}: LoginViewProps): JSX.Element | null => {
  const authConfig = useAuthenticationConfig();
  if (!authConfig) return null;
  return (
    <Login
      className={className}
      providers={providers || authConfig.providers}
      termsOfService={authConfig.termsOfService}
      text={authConfig.text}
      title={authConfig.title}
      warning={authConfig.warning}
    />
  );
};
