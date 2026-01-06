import { ClientSafeProvider } from "next-auth/react";
import { JSX } from "react";
import { Login } from "../../components/Login/login";
import { useAuthenticationConfig } from "../../hooks/authentication/config/useAuthenticationConfig";

export interface LoginViewProps {
  providers?: ClientSafeProvider[];
}

export const LoginView = ({
  providers,
}: LoginViewProps): JSX.Element | null => {
  const authConfig = useAuthenticationConfig();
  if (!authConfig) return null;
  return (
    <Login
      providers={providers || authConfig.providers}
      termsOfService={authConfig.termsOfService}
      text={authConfig.text}
      title={authConfig.title}
      warning={authConfig.warning}
    />
  );
};
