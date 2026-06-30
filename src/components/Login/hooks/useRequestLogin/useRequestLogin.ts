import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../auth/hooks/useAuth";
import { ProviderId } from "../../../../auth/types/common";
import { UseRequestLogin } from "./types";

/**
 * Shared sign-in submission guard. Tracks the in-flight provider so callers can
 * disable buttons and show a loading state, prevents double-submit while a login
 * is in flight, and recovers from popup-based flows that resolve without a
 * navigation (e.g. the Google implicit flow).
 * @returns The in-flight provider id and a guarded submit function.
 */
export const useRequestLogin = (): UseRequestLogin => {
  const { service: { requestLogin } = {} } = useAuth();
  const [submittingProviderId, setSubmittingProviderId] =
    useState<ProviderId | null>(null);
  // Mirror of submittingProviderId that updates synchronously. The guard reads
  // the ref (not the state, which only changes after a commit) so two clicks in
  // the same tick can't both pass; state still drives rendering.
  const submittingRef = useRef<ProviderId | null>(null);

  // Clears the in-flight ref and state together.
  const reset = useCallback((): void => {
    submittingRef.current = null;
    setSubmittingProviderId(null);
  }, []);

  // Once a login is in flight, ignore further submissions and surface the
  // requesting provider via `submittingProviderId`.
  const submit = useCallback(
    (providerId: ProviderId): void => {
      if (submittingRef.current !== null) return; // Prevent re-submission while in flight.
      if (!requestLogin) return; // No login service wired (e.g. outside an auth provider).
      submittingRef.current = providerId;
      setSubmittingProviderId(providerId);
      try {
        requestLogin(providerId);
      } catch (error) {
        // e.g. the Google implicit flow throws synchronously if the GIS script
        // isn't loaded. Re-enable the buttons (the focus reset won't fire
        // without a popup) before surfacing the error.
        reset();
        throw error;
      }
    },
    [requestLogin, reset],
  );

  // `requestLogin` may redirect away (then this never matters) or open a popup
  // and resolve in place (e.g. the Google implicit flow). For the popup case,
  // reset the submitting state when the window regains focus — i.e. the popup
  // was closed/cancelled — so the buttons re-enable and the user can retry
  // instead of being stuck disabled.
  useEffect(() => {
    if (submittingProviderId === null) return;
    const handleFocus = (): void => reset();
    window.addEventListener("focus", handleFocus);
    return (): void => window.removeEventListener("focus", handleFocus);
  }, [reset, submittingProviderId]);

  return { submit, submittingProviderId };
};
