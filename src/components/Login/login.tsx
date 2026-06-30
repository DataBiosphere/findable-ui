import { Checkbox, Typography } from "@mui/material";
import { ChangeEvent, JSX, useCallback, useState } from "react";
import { ProviderId } from "../../auth/types/common";
import { TYPOGRAPHY_PROPS } from "../../styles/common/mui/typography";
import { CheckedIcon } from "../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedErrorIcon } from "../common/CustomIcon/components/UncheckedErrorIcon/uncheckedErrorIcon";
import { UncheckedIcon } from "../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { RoundedPaper } from "../common/Paper/paper.styles";
import { SectionContent } from "../common/Section/section.styles";
import { Buttons } from "./components/Buttons/buttons";
import { useRequestLogin } from "./hooks/useRequestLogin/useRequestLogin";
import {
  LoginAgreement,
  LoginSection,
  LoginSectionActions,
  LoginWrapper,
  StyledTypography,
} from "./login.styles";
import { Props } from "./types";

export const Login = ({
  className,
  providers = [],
  termsOfService,
  text,
  title,
  warning,
}: Props): JSX.Element => {
  const { submit, submittingProviderId } = useRequestLogin();
  const [isError, setIsError] = useState<boolean>(false);
  const [isInAgreement, setIsInAgreement] = useState<boolean>(!termsOfService);

  // Authenticates the user, if the user has agreed to the terms of service.
  // If the terms of service are not accepted, set the terms of service error
  // state to true. Otherwise hand off to the shared sign-in guard, which
  // disables the provider buttons and shows the requesting provider's button in
  // a loading state while the login is in flight.
  const onLogin = useCallback(
    (providerId: ProviderId): void => {
      if (!isInAgreement) {
        setIsError(true);
        return;
      }
      submit(providerId);
    },
    [isInAgreement, submit],
  );

  // Callback fired when the checkbox value is changed.
  // Clears the terms of service error state and sets state isInAgreement with checkbox selected value.
  const handleChange = (changeEvent: ChangeEvent<HTMLInputElement>): void => {
    setIsError(false); // Clears terms of service error state when checkbox is touched.
    setIsInAgreement(changeEvent.target.checked);
  };

  return (
    <LoginWrapper className={className}>
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
              <LoginAgreement
                control={
                  <Checkbox
                    checkedIcon={<CheckedIcon />}
                    icon={isError ? <UncheckedErrorIcon /> : <UncheckedIcon />}
                    onChange={handleChange}
                  />
                }
                label={
                  <StyledTypography
                    component="span"
                    variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}
                  >
                    {termsOfService}
                  </StyledTypography>
                }
              />
            )}
            <Buttons
              handleLogin={onLogin}
              providers={providers}
              submittingProviderId={submittingProviderId}
            />
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
