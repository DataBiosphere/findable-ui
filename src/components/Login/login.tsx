import { Checkbox, Typography } from "@mui/material";
import { ChangeEvent, JSX, useCallback, useEffect, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { ProviderId } from "../../auth/types/common";
import { TYPOGRAPHY_PROPS } from "../../styles/common/mui/typography";
import { CheckedIcon } from "../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { LoadingIcon } from "../common/CustomIcon/components/LoadingIcon/loadingIcon";
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

export const Login = ({
  className,
  providers = [],
  termsOfService,
  text,
  title,
  warning,
}: Props): JSX.Element => {
  const { service: { requestLogin } = {} } = useAuth();
  const [isError, setIsError] = useState<boolean>(false);
  const [isInAgreement, setIsInAgreement] = useState<boolean>(!termsOfService);
  const [submittingProviderId, setSubmittingProviderId] =
    useState<ProviderId | null>(null);

  // Authenticates the user, if the user has agreed to the terms of service.
  // If the terms of service are not accepted, set the terms of service error state to true.
  // Once a login is in flight, disable the provider buttons and show the
  // requesting provider's button in a loading state.
  const onLogin = useCallback(
    (providerId: ProviderId): void => {
      if (!isInAgreement) {
        setIsError(true);
        return;
      }
      if (submittingProviderId !== null) return; // Prevent re-submission while in flight.
      if (!requestLogin) return; // No login service wired (e.g. outside an auth provider).
      setSubmittingProviderId(providerId);
      try {
        requestLogin(providerId);
      } catch (error) {
        // e.g. the Google implicit flow throws synchronously if the GIS script
        // isn't loaded. Re-enable the buttons (the focus reset won't fire
        // without a popup) before surfacing the error.
        setSubmittingProviderId(null);
        throw error;
      }
    },
    [isInAgreement, requestLogin, submittingProviderId],
  );

  // `requestLogin` may redirect away (then this never matters) or open a popup
  // and resolve in place (e.g. the Google implicit flow). For the popup case,
  // reset the submitting state when the window regains focus — i.e. the popup
  // was closed/cancelled — so the buttons re-enable and the user can retry
  // instead of being stuck disabled.
  useEffect(() => {
    if (submittingProviderId === null) return;
    const handleFocus = (): void => setSubmittingProviderId(null);
    window.addEventListener("focus", handleFocus);
    return (): void => window.removeEventListener("focus", handleFocus);
  }, [submittingProviderId]);

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
            {providers?.map((provider) => {
              const isSubmitting = submittingProviderId === provider.id;
              return (
                <Button
                  key={provider.id}
                  disabled={submittingProviderId !== null}
                  endIcon={
                    isSubmitting ? (
                      <LoadingIcon fontSize="small" />
                    ) : (
                      "icon" in provider && provider.icon
                    )
                  }
                  onClick={() => onLogin(provider.id)}
                >
                  {provider.name}
                </Button>
              );
            })}
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
