import { GoogleResponse } from "../useFetchGoogleProfile";
import { TerraNIHResponse } from "../useFetchTerraNIHProfile";
import { TerraResponse } from "../useFetchTerraProfile";
import { TerraTermsOfServiceResponse } from "../useFetchTerraTermsOfService";

export enum AUTHENTICATION_STATUS {
  COMPLETED = "COMPLETED",
  INCOMPLETE = "INCOMPLETE",
}

export type LoginResponse =
  | GoogleResponse
  | TerraResponse
  | TerraNIHResponse
  | TerraTermsOfServiceResponse;

export interface LoginResponseError {
  message: string;
  source: string;
  statusCode: number;
}

export interface LoginStatus<T> {
  isSuccess: boolean;
  isSupported: boolean;
  requestStatus: REQUEST_STATUS;
  response: T | undefined;
}

export enum REQUEST_STATUS {
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  NOT_STARTED = "NOT_STARTED",
}
