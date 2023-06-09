import React from "react";
import { LoginNotice } from "../../components/Login/components/LoginNotice/loginNotice";
import { Login } from "../../components/Login/login";
import { useAuthenticationConfig } from "../../hooks/useAuthenticationConfig";

export const LoginView = (): JSX.Element => {
  const { googleGISAuthConfig, loginNotice, text, title } =
    useAuthenticationConfig();

  return (
    <Login
      isGoogle={!!googleGISAuthConfig}
      loginNotice={
        loginNotice ? (
          <LoginNotice
            privacyUrl={loginNotice.privacyUrl}
            conditionsUrl={loginNotice.conditionsUrl}
          />
        ) : undefined
      }
      text={text}
      title={title}
    />
  );
};
