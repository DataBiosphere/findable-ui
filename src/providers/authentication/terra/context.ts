import { createContext } from "react";
import { LOGIN_STATUS_NOT_STARTED } from "./hooks/common/constants";
import { LoginStatus } from "./hooks/common/entities";
import { TerraNIHResponse } from "./hooks/useFetchTerraNIHProfile";
import { TerraResponse } from "./hooks/useFetchTerraProfile";
import { TerraTermsOfServiceResponse } from "./hooks/useFetchTerraTermsOfService";
import { TerraProfileContextProps } from "./types";

export const TerraProfileContext = createContext<TerraProfileContextProps>({
  terraNIHProfileLoginStatus:
    LOGIN_STATUS_NOT_STARTED as LoginStatus<TerraNIHResponse>,
  terraProfileLoginStatus:
    LOGIN_STATUS_NOT_STARTED as LoginStatus<TerraResponse>,
  terraTOSLoginStatus:
    LOGIN_STATUS_NOT_STARTED as LoginStatus<TerraTermsOfServiceResponse>,
});
