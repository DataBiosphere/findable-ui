import { ButtonProps } from "@mui/material";
import { ProviderId } from "../../../../auth/types/common";
import { LoginProvider } from "../../../../auth/types/loginProvider";
import { BaseComponentProps } from "../../../types";

/**
 * Props for the Buttons component.
 */
export interface Props extends BaseComponentProps, ButtonProps {
  handleLogin: (providerId: ProviderId) => void;
  providers?: LoginProvider[];
  submittingProviderId?: ProviderId | null;
}
