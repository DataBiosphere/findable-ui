import { SignOutParams } from "next-auth/react";

/**
 * Resolve the options to pass to `service.logout` (NextAuth `signOut`).
 *
 * Precedence: caller-supplied options always win; the provider-level
 * `logoutCallbackUrl` only fills in defaults. `redirect` defaults to `true`
 * whenever a callbackUrl is resolved (caller or provider), so logout actually
 * navigates and Next middleware can re-run on the next render.
 *
 * @param options - Per-call options forwarded from `requestLogout(options)`.
 * @param logoutCallbackUrl - Provider-level default callbackUrl.
 * @returns Resolved `{ callbackUrl, redirect }` for `signOut`.
 */
export function resolveLogoutOptions(
  options: SignOutParams<boolean> | undefined,
  logoutCallbackUrl: string | undefined,
): SignOutParams<boolean> {
  // Caller wins; provider-level value fills in. Normalize an empty string to
  // `undefined` so we don't default `redirect` to `true` with no target.
  const resolved = options?.callbackUrl ?? logoutCallbackUrl;
  const callbackUrl = resolved || undefined;
  const redirect = options?.redirect ?? Boolean(callbackUrl);
  return { callbackUrl, redirect };
}
