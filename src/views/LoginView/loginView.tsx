import React from "react";
import { Login } from "../../components/Login/login";
import { useAuthenticationConfig } from "../../hooks/useAuthenticationConfig";

export const LoginView = (): JSX.Element => {
  const { googleGISAuthConfig, termsOfService, text, title, warning } =
    useAuthenticationConfig();

  return (
    <Login
      isGoogle={!!googleGISAuthConfig}
      termsOfService={termsOfService}
      text={text}
      title={title}
      warning={warning}
    />
  );
};
