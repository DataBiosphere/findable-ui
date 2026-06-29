import { ComponentProps } from "react";
import { Login } from "../login";

export const DEFAULT_ARGS: ComponentProps<typeof Login> = {
  providers: [{ id: "google", name: "Sign in with Google" }],
  termsOfService: (
    <>
      I have read and agree to the <a href="#privacy-notice">privacy notice</a>{" "}
      and <a href="#terms-of-service">terms of service</a>.
    </>
  ),
  text: "Sign in to manage atlases, source studies, and validations.",
  title: "Sign in",
  warning: "Access is limited to approved users.",
};
