import { AlertProps, Button, Fade } from "@mui/material";
import React, { Fragment, ReactNode, useEffect } from "react";
import { FLAG } from "../../../../../hooks/useFeatureFlag/common/entities";
import { setLocalStorage } from "../../../../../hooks/useLocalStorage/common/utils";
import { useLocalStorage } from "../../../../../hooks/useLocalStorage/useLocalStorage";
import { BaseComponentProps } from "../../../../types";
import { useTransition } from "../../../Alert/hooks/useTransition/useTransition";
import { ALERT_PROPS } from "./constants";
import { StyledAlert } from "./cookieBanner.styles";

export interface CookieBannerProps
  extends Omit<AlertProps, "children">, BaseComponentProps {
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
