export type Credentials = string;

export interface AuthenticationService {
  login: () => void;
  logout: () => void;
}

export interface OAuthResponse {
  access_token: string;
}

export interface OAuthRevokeResponse {
  error?: boolean;
  error_description?: string;
  successful?: boolean;
}
