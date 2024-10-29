import { ButtonProps, AlertProps as MAlertProps } from "@mui/material";
import React, { forwardRef, Fragment, ReactNode } from "react";
import { FLAG } from "../../../../../hooks/useFeatureFlag/common/entities";
import { setLocalStorage } from "../../../../../hooks/useLocalStorage/common/utils";
import { useLocalStorage } from "../../../../../hooks/useLocalStorage/useLocalStorage";
import { BaseComponentProps } from "../../../../../theme/common/types";
import { ButtonPrimary } from "../../../Button/components/ButtonPrimary/buttonPrimary";
import { DismissibleBanner } from "../DismissibleBanner/dismissibleBanner";
import { CookieBanner as Banner } from "./cookieBanner.styles";

export interface CookieBannerProps extends BaseComponentProps, MAlertProps {
  localStorageKey: string;
  message?: ReactNode;
  secondaryAction?: ReactNode;
}

export const CookieBanner = ({
  className,
  localStorageKey,
  message,
  secondaryAction,
}: CookieBannerProps): JSX.Element => {
  const localStorage = useLocalStorage(localStorageKey);
  const isCookieAccepted = localStorage === FLAG.TRUE;

  // Callback fired when the banner requests to be closed.
  const onDismiss = (): void => {
    setLocalStorage(localStorageKey, FLAG.TRUE);
  };

  return (
    <DismissibleBanner
      Alert={Alert}
      className={className}
      onDismiss={onDismiss}
      open={!isCookieAccepted}
      slots={{
        closeButton: (props) => renderCloseButton(props, secondaryAction),
      }}
    >
      {message}
    </DismissibleBanner>
  );
};

/**
 * Return the cookie banner alert.
 * @param props - Alert props e.g. "onClick" to close banner.
 * @returns alert element.
 */
const Alert = forwardRef<HTMLDivElement, MAlertProps>(function Alert(
  { ...props },
  ref
): JSX.Element {
  return (
    <Banner
      color="ink"
      elevation={2}
      icon={false}
      ref={ref}
      variant="filled"
      {...props}
    >
      {props.children}
    </Banner>
  );
});

/**
 * Returns the close action component(s).
 * @param buttonProps - Button props e.g. "onClick" to close banner.
 * @param secondaryAction - Secondary action component.
 * @returns close button element(s).
 */
function renderCloseButton(
  buttonProps: ButtonProps,
  secondaryAction?: ReactNode
): JSX.Element {
  return (
    <Fragment>
      <ButtonPrimary onClick={buttonProps.onClick}>Ok, Got It</ButtonPrimary>
      {secondaryAction}
    </Fragment>
  );
}
