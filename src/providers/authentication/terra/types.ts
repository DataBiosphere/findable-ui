import { ReactNode } from "react";
import { TokenState } from "../token/types";
import { LoginStatus } from "./hooks/common/entities";
import { TerraNIHResponse } from "./hooks/useFetchTerraNIHProfile";
import { TerraResponse } from "./hooks/useFetchTerraProfile";
import { TerraTermsOfServiceResponse } from "./hooks/useFetchTerraTermsOfService";

export interface TerraProfileProviderProps {
  children: ReactNode;
  token: TokenState["token"];
}

export interface TerraProfileContextProps {
  terraNIHProfileLoginStatus: LoginStatus<TerraNIHResponse>;
  terraProfileLoginStatus: LoginStatus<TerraResponse>;
  terraTOSLoginStatus: LoginStatus<TerraTermsOfServiceResponse>;
}
