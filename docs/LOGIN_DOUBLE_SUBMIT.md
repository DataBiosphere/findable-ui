# Login Sign-In: Double-Submit Guard & Known Tradeoff

The sign-in guard against double-submitting lives in the shared `useRequestLogin` hook (`src/components/Login/hooks/useRequestLogin/`) and is consumed by **both** the `Login` page (`src/components/Login/login.tsx`) and the `LoginDialog` (`src/components/common/LoginDialog/loginDialog.tsx`, via `useUserLogin`). This document records how that guard works and a known false-positive in the recovery heuristic, so the tradeoff isn't lost once the introducing PR ([#965](https://github.com/DataBiosphere/findable-ui/pull/965)) merges. Because both surfaces share the hook, the behavior and the tradeoff below apply equally to the login page and the dialog ([#968](https://github.com/DataBiosphere/findable-ui/issues/968)).

## The guard

On clicking a provider, the hook tracks `submittingProviderId`:

- the requested provider's button shows a `LoadingIcon`,
- all provider buttons are `disabled` while a sign-in is in flight,
- re-submits are ignored until the in-flight state clears.

The in-flight flag is held in a `useRef` (mirrored into `submittingProviderId` state for rendering), so the guard is evaluated **synchronously**: two clicks in the same tick — before React commits the disabled state to the DOM — still can't both fire `requestLogin`. This prevents double-submit from a fast double-tap (most visible on mobile / slow connections).

## Clearing the in-flight state

`requestLogin` has two completion shapes, and the state must clear for both:

1. **Redirect flows** (e.g. NextAuth) — the page navigates away, the component unmounts, and the state never matters again.
2. **Popup / in-place flows** (e.g. the Google implicit flow, `initTokenClient`) — no navigation. If the user closes/cancels the popup, nothing would otherwise re-enable the buttons, leaving them stuck disabled.

To handle case 2, the hook resets the in-flight ref and `submittingProviderId` together when the window regains **focus** (popup closed/cancelled). A synchronous throw from `requestLogin` (e.g. the GIS script not loaded) is also caught and resets the state.

## Known tradeoff (false-positive on slow redirects)

The window-`focus` reset is a heuristic: it fires on **any** focus regain while a sign-in is in flight, not only on popup cancellation.

On a **redirect** flow over a **slow connection**, if the user backgrounds and returns to the app (or the browser blurs/refocuses) before the navigation commits, the `focus` handler clears `submittingProviderId` and re-enables the buttons — briefly reopening the double-submit window. This lands in exactly the scenario the guard targets (mobile / slow connections + app-switching), though it is narrow: it requires focus to fire before navigation completes, whereas a clean redirect simply unmounts the component.

This is an **accepted tradeoff**: the focus reset fixes the worse popup-stuck bug (case 2) at the cost of this narrow redirect false-positive.

## Proper fix (not yet implemented)

A **service-layer completion signal** — having `requestLogin` return a promise / signal completion — would clear the in-flight state on _actual_ completion. That single change would:

- eliminate the redirect false-positive,
- remove the window-`focus` heuristic entirely,
- and let the shared `useRequestLogin` hook clear the in-flight state on real completion instead of guessing via focus.

Until that lands, the focus-reset heuristic is retained as the pragmatic option that covers the real cases.
