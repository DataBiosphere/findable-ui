import { createContext } from "react";
import { LOGIN_STATUS_NOT_STARTED } from "./constants";
import { LoginStatus } from "./types/common";
import { TerraProfileContextProps } from "./types/context";
import { TerraNIHResponse } from "./types/terra-nih";
import { TerraResponse } from "./types/terra-profile";
import { TerraTermsOfServiceResponse } from "./types/terra-tos";

/**
 * Terra profile context.
 */
export const TerraProfileContext = createContext<TerraProfileContextProps>({
  terraNIHProfileLoginStatus:
    LOGIN_STATUS_NOT_STARTED as LoginStatus<TerraNIHResponse>,
  terraProfileLoginStatus:
    LOGIN_STATUS_NOT_STARTED as LoginStatus<TerraResponse>,
  terraTOSLoginStatus:
    LOGIN_STATUS_NOT_STARTED as LoginStatus<TerraTermsOfServiceResponse>,
});
