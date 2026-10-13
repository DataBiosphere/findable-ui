import { AlertProps, Button, Fade } from "@mui/material";
import { Fragment, JSX, ReactNode, useEffect } from "react";
import { FLAG } from "../../../../../hooks/useFeatureFlag/common/entities";
import { setLocalStorage } from "../../../../../hooks/useLocalStorage/common/utils";
import { useLocalStorage } from "../../../../../hooks/useLocalStorage/useLocalStorage";
import { BaseComponentProps } from "../../../../types";
import { useTransition } from "../../../Alert/hooks/useTransition/useTransition";
import { ALERT_PROPS } from "./constants";
import { StyledAlert } from "./cookieBanner.styles";

/**
 * Props for the CookieBanner component.
 */
export interface CookieBannerProps
  extends Omit<AlertProps, "children">, BaseComponentProps {
  localStorageKey: string;
  message?: ReactNode;
  secondaryAction?: ReactNode;
}

/**
 * Cookie banner, fading in when no value is stored under the given local storage key.
 * Clicking "Ok, Got It" stores the value and fades the banner out.
 * @param props - Component props.
 * @param props.className - Class name applied to the banner.
 * @param props.localStorageKey - Local storage key that records the cookie banner was accepted.
 * @param props.message - Banner message.
 * @param props.secondaryAction - Action rendered after the "Ok, Got It" button.
 * @returns The cookie banner.
 */
export const CookieBanner = ({
  className,
  localStorageKey,
  message,
  secondaryAction,
}: CookieBannerProps): JSX.Element => {
  const { isIn, onEnter, onExit } = useTransition();
  const localStorage = useLocalStorage(localStorageKey);

  useEffect(() => {
    if (localStorage === null) onEnter();
  }, [localStorage, onEnter]);

  return (
    <Fade in={isIn} unmountOnExit>
      <StyledAlert
        {...ALERT_PROPS}
        action={
          <Fragment>
            <Button
              color="primary"
              onClick={(): void => {
                setLocalStorage(localStorageKey, FLAG.TRUE);
                onExit();
              }}
              variant="contained"
            >
              Ok, Got It
            </Button>
            {secondaryAction}
          </Fragment>
        }
        className={className}
      >
        {message}
      </StyledAlert>
    </Fade>
  );
};
