import { Checkbox, Typography } from "@mui/material";
import React, { ChangeEvent, ReactNode, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication/useAuthentication";
import { LoginButton } from "../common/Button/components/LoginButton/loginButton";
import { CheckedIcon } from "../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { GoogleIcon } from "../common/CustomIcon/components/GoogleIcon/googleIcon";
import { UncheckedErrorIcon } from "../common/CustomIcon/components/UncheckedErrorIcon/uncheckedErrorIcon";
import { UncheckedIcon } from "../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { RoundedPaper } from "../common/Paper/paper.styles";
import { SectionContent } from "../common/Section/section.styles";
import {
  LoginAgreement,
  LoginSection,
  LoginSectionActions,
  LoginText,
  LoginWarning,
  LoginWrapper,
  TermsOfService,
} from "./login.styles";

export interface LoginProps {
  isGoogle?: boolean;
  termsOfService?: ReactNode;
  text?: ReactNode;
  title: string;
  warning?: ReactNode;
}

export const Login = ({
  isGoogle = false,
  termsOfService,
  text,
  title,
  warning,
}: LoginProps): JSX.Element => {
  const { authenticateUser } = useAuthentication();
  const [isError, setIsError] = useState<boolean>(false);
  const [isInAgreement, setIsInAgreement] = useState<boolean>(!termsOfService);

  // Authenticates the user, if the user has agreed to the terms of service.
  // If the terms of service are not accepted, set the terms of service error state to true.
  const onAuthenticateUser = (): void => {
    if (!isInAgreement) {
      setIsError(true);
      return;
    }
    authenticateUser();
  };

  // Callback fired when the checkbox value is changed.
  // Clears the terms of service error state and sets state isInAgreement with checkbox selected value.
  const handleChange = (changeEvent: ChangeEvent<HTMLInputElement>): void => {
    setIsError(false); // Clears terms of service error state when checkbox is touched.
    setIsInAgreement(changeEvent.target.checked);
  };

  return (
    <LoginWrapper>
      <RoundedPaper>
        <LoginSection>
          <SectionContent>
            <Typography color="ink.main" component="h3" variant="text-heading">
              {title}
            </Typography>
            {text && <LoginText>{text}</LoginText>}
          </SectionContent>
          <LoginSectionActions>
            {termsOfService && (
              <LoginAgreement>
                <Checkbox
                  checkedIcon={<CheckedIcon />}
                  icon={isError ? <UncheckedErrorIcon /> : <UncheckedIcon />}
                  onChange={handleChange}
                />
                <TermsOfService>{termsOfService}</TermsOfService>
              </LoginAgreement>
            )}
            {isGoogle && (
              <LoginButton EndIcon={GoogleIcon} onClick={onAuthenticateUser}>
                Google
              </LoginButton>
            )}
          </LoginSectionActions>
        </LoginSection>
      </RoundedPaper>
      {warning && <LoginWarning>{warning}</LoginWarning>}
    </LoginWrapper>
  );
};
