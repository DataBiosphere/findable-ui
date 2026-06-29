import { ComponentProps } from "react";
import { SiteConfig } from "../../../../config/entities";
import { getDefaultConfig } from "../../../../config/utils";
import { LoginDialog } from "../loginDialog";

export const CONFIG = {
  ...getDefaultConfig(),
  authentication: {
    providers: [{ id: "google", name: "Sign in with Google" }],
    termsOfService: (
      <>
        I have read and agree to the{" "}
        <a href="#privacy-notice">privacy notice</a> and{" "}
        <a href="#terms-of-service">terms of service</a>.
      </>
    ),
    title: "Sign in",
    warning: "Access is limited to approved users.",
  },
} satisfies SiteConfig;

export const DEFAULT_ARGS: ComponentProps<typeof LoginDialog> = {
  onClose: () => undefined,
  open: true,
};
