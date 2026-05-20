import { ComponentProps } from "react";
import { AUTH_STATUS, AuthState } from "../../../../../../../auth/types/auth";
import { REQUEST_STATUS } from "../../../../../../../terra/types/common";
import { TerraProfileContextProps } from "../../../../../../../terra/types/context";
import { TerraSetUpForm } from "../terraSetUpForm";

/**
 * Authenticated, settled auth state — used so `TerraSetUpForm` doesn't bail
 * early on its `isAuthenticated` / status guards.
 */
export const MOCK_AUTH_STATE: AuthState = {
  isAuthenticated: true,
  status: AUTH_STATUS.SETTLED,
};

/**
 * Terra profile statuses where every onboarding step is supported but not yet
 * complete — produces three incomplete steps in the rendered form.
 */
export const MOCK_TERRA_PROFILE_INCOMPLETE: TerraProfileContextProps = {
  terraNIHProfileLoginStatus: {
    isSuccess: false,
    isSupported: true,
    requestStatus: REQUEST_STATUS.COMPLETED,
    response: undefined,
  },
  terraProfileLoginStatus: {
    isSuccess: false,
    isSupported: true,
    requestStatus: REQUEST_STATUS.COMPLETED,
    response: undefined,
  },
  terraTOSLoginStatus: {
    isSuccess: false,
    isSupported: true,
    requestStatus: REQUEST_STATUS.COMPLETED,
    response: undefined,
  },
};

export const DEFAULT_TERRA_SET_UP_FORM_ARGS: ComponentProps<
  typeof TerraSetUpForm
> = {
  collapsible: true,
};
