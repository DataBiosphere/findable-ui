/**
 * Terra set-up UI context value. Tracks transient UI state for the
 * `TerraSetUpForm` (e.g. whether the wizard is open or collapsed by the user).
 *
 * State is held in-memory in the provider, so it persists across SPA
 * navigations within a session and resets on full page reload, new tab, or
 * browser close. No browser storage is used.
 */
export interface TerraSetUpUIContextValue {
  isOpen: boolean;
  onChange: () => void;
}
