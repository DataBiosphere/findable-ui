import { Checkbox, Typography } from "@mui/material";
import { JSX, ChangeEvent, useCallback, useState } from "react";
import { useAuth } from "../../providers/authentication/auth/hook";
import { ProviderId } from "../../providers/authentication/common/types";
import { TYPOGRAPHY_PROPS } from "../../styles/common/mui/typography";
import { CheckedIcon } from "../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedErrorIcon } from "../common/CustomIcon/components/UncheckedErrorIcon/uncheckedErrorIcon";
import { UncheckedIcon } from "../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { RoundedPaper } from "../common/Paper/paper.styles";
import { SectionContent } from "../common/Section/section.styles";
import { Button } from "./components/Button/button";
import {
  LoginAgreement,
  LoginSection,
  LoginSectionActions,
  LoginWrapper,
  StyledTypography,
} from "./login.styles";
import { Props } from "./types";

export const Login = <P,>({
  providers = [],
  termsOfService,
  text,
  title,
  warning,
}: Props<P>): JSX.Element => {
  const { service: { requestLogin } = {} } = useAuth();
  const [isError, setIsError] = useState<boolean>(false);
  const [isInAgreement, setIsInAgreement] = useState<boolean>(!termsOfService);

  // Authenticates the user, if the user has agreed to the terms of service.
  // If the terms of service are not accepted, set the terms of service error state to true.
  const onLogin = useCallback(
    (providerId: ProviderId): void => {
      if (!isInAgreement) {
        setIsError(true);
        return;
      }
      requestLogin?.(providerId);
    },
    [isInAgreement, requestLogin],
  );

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
            <Typography
              color={TYPOGRAPHY_PROPS.COLOR.INK_MAIN}
              component="h3"
              variant={TYPOGRAPHY_PROPS.VARIANT.HEADING}
            >
              {title}
            </Typography>
            {text && (
              <Typography
                component="div"
                variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}
              >
                {text}
              </Typography>
            )}
          </SectionContent>
          <LoginSectionActions>
            {termsOfService && (
              <LoginAgreement>
                <Checkbox
                  checkedIcon={<CheckedIcon />}
                  icon={isError ? <UncheckedErrorIcon /> : <UncheckedIcon />}
                  onChange={handleChange}
                />
                <StyledTypography
                  component="div"
                  variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}
                >
                  {termsOfService}
                </StyledTypography>
              </LoginAgreement>
            )}
            {providers?.map((provider) => (
              <Button
                key={provider.id}
                endIcon={"icon" in provider && provider.icon}
                onClick={() => onLogin(provider.id)}
              >
                {provider.name}
              </Button>
            ))}
          </LoginSectionActions>
        </LoginSection>
      </RoundedPaper>
      {warning && (
        <Typography
          color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
          component="div"
          variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}
        >
          {warning}
        </Typography>
      )}
    </LoginWrapper>
  );
};
