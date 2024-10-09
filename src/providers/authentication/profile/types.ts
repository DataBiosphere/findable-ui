import { Dispatch, ReactNode } from "react";

export interface BaseProfile {
  status: STATUS;
}

export type Profile<P> = P extends UserProfile ? P & UserProfile : P;

export type ProfileAction<P> =
  | RequestProfileErrorAction<P>
  | RequestProfileSuccessAction<P>
  | ResetProfileAction;

export enum ProfileActionKind {
  RequestProfileErrorAction = "REQUEST_PROFILE_ERROR_ACTION",
  RequestProfileSuccessAction = "REQUEST_PROFILE_SUCCESS_ACTION",
  ResetProfileAction = "RESET_PROFILE_ACTION",
}

export interface ProfileContextProps<P> {
  profileDispatch: Dispatch<ProfileAction<P>> | null;
  profileState: ProfileState<P>;
}

export interface ProfileProviderProps {
  children: ReactNode | ReactNode[];
}

export interface ProfileState<P> {
  [provider: string]: ProviderValue<P> | undefined;
}

export type ProviderKey = string;

export interface ProviderValue<P> extends BaseProfile {
  profile: Profile<P> | undefined;
}

export type RequestProfileErrorAction<P> = {
  payload: RequestProfileErrorPayload<P>;
  type: ProfileActionKind.RequestProfileErrorAction;
};

export interface RequestProfileErrorPayload<P> {
  providerKey: ProviderKey;
  providerValue: ProviderValue<P>;
}

export type RequestProfileSuccessAction<P> = {
  payload: RequestProfileSuccessPayload<P>;
  type: ProfileActionKind.RequestProfileSuccessAction;
};

export interface RequestProfileSuccessPayload<P> {
  providerKey: ProviderKey;
  providerValue: ProviderValue<P>;
}

export type ResetProfileAction = {
  payload: ResetProfilePayload;
  type: ProfileActionKind.ResetProfileAction;
};

export type ResetProfilePayload = {
  providerKey: ProviderKey;
};

export enum STATUS {
  ERROR = "ERROR",
  NOT_STARTED = "NOT_STARTED",
  SUCCESS = "SUCCESS",
}

export interface UserProfile {
  email: string;
  fullName: string;
  picture?: string;
}
