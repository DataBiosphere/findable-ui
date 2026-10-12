import { JSX } from "react";
import { LoginProvider } from "../../auth/types/loginProvider";
import { Login } from "../../components/Login/login";
import { BaseComponentProps } from "../../components/types";
import { useAuthenticationConfig } from "../../hooks/authentication/config/useAuthenticationConfig";

/**
 * Props for the LoginView component.
 */
export interface LoginViewProps extends BaseComponentProps {
  providers?: LoginProvider[];
}

/**
 * Renders the login page from the authentication config.
 * @param props - Component props.
 * @param props.className - Class name applied to the login component.
 * @param props.providers - Login providers; defaults to the providers in the authentication config.
 * @returns The login view, or null if authentication is not configured.
 */
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
