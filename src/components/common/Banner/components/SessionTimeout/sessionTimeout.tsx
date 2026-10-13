import { AlertProps, Fade } from "@mui/material";
import { JSX } from "react";
import { useSessionTimeout } from "../../../../../hooks/authentication/session/useSessionTimeout";
import { BaseComponentProps, ContentProps } from "../../../../types";
import { Banner } from "../../banner";

/**
 * Session timeout banner, fading in when the session has timed out; closing it clears the session timeout.
 * @param props - Component props.
 * @param props.children - Banner content, used when content is falsy.
 * @param props.className - Class name applied to the banner.
 * @param props.content - Banner content, used in place of children when truthy.
 * @returns The session timeout banner.
 */
export const SessionTimeout = ({
  children,
  className,
  content,
  ...props
}: AlertProps & BaseComponentProps & ContentProps): JSX.Element => {
  const { clearSessionTimeout, isSessionTimeout } = useSessionTimeout();
  return (
    <Fade in={isSessionTimeout} unmountOnExit>
      <Banner className={className} onClose={clearSessionTimeout} {...props}>
        {content || children}
      </Banner>
    </Fade>
  );
};
