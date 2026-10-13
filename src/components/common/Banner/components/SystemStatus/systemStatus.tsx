import { AlertProps, Fade } from "@mui/material";
import { JSX } from "react";
import { useSystemStatus } from "../../../../../hooks/useSystemStatus";
import { BaseComponentProps, ContentProps } from "../../../../types";
import { Banner } from "../../banner";

/**
 * System status banner, fading in when the system status has loaded and is not ok.
 * @param props - Component props.
 * @param props.children - Banner content, used when no content is given.
 * @param props.className - Class name applied to the banner.
 * @param props.content - Banner content; takes precedence over children.
 * @returns The system status banner.
 */
export const SystemStatus = ({
  children,
  className,
  content,
  ...props
}: AlertProps & BaseComponentProps & ContentProps): JSX.Element => {
  const systemStatus = useSystemStatus();
  const { loading, ok } = systemStatus;
  return (
    <Fade in={!loading && !ok} unmountOnExit>
      <Banner className={className} {...props}>
        {content || children}
      </Banner>
    </Fade>
  );
};
