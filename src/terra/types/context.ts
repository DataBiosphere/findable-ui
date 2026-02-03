import { LoginStatus } from "./common";
import { TerraNIHResponse } from "./terra-nih";
import { TerraResponse } from "./terra-profile";
import { TerraTermsOfServiceResponse } from "./terra-tos";

/**
 * Terra profile context props.
 */
export interface TerraProfileContextProps {
  terraNIHProfileLoginStatus: LoginStatus<TerraNIHResponse>;
  terraProfileLoginStatus: LoginStatus<TerraResponse>;
  terraTOSLoginStatus: LoginStatus<TerraTermsOfServiceResponse>;
}
