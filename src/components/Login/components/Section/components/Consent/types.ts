import { GridProps } from "@mui/material";
import { ReactNode } from "react";
import { UseUserConsent } from "../../../../hooks/useUserConsent/types";

/**
 * Props for the Consent component.
 */
export interface ConsentProps
  extends
    GridProps,
    Pick<UseUserConsent, "handleConsent">,
    Pick<UseUserConsent["state"], "isDisabled" | "isError"> {
  children: ReactNode;
}
