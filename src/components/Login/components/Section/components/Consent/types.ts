import { GridProps } from "@mui/material";
import { ReactNode } from "react";
import { UseUserConsent } from "../../../../hooks/useUserConsent/types";

export interface ConsentProps
  extends GridProps,
    Pick<UseUserConsent, "handleConsent">,
    Pick<UseUserConsent["state"], "isDisabled" | "isError"> {
  children: ReactNode;
}
