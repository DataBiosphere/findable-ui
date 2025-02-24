import { Grid2Props } from "@mui/material";
import { ReactNode } from "react";
import { UseUserConsent } from "../../../../hooks/useUserConsent/types";

export interface ConsentProps
  extends Grid2Props,
    Pick<UseUserConsent, "handleConsent">,
    Pick<UseUserConsent["state"], "isDisabled" | "isError"> {
  children: ReactNode;
}
