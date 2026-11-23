/**
 * Returns the client's snapshot: once a component renders outside hydration, the page has hydrated.
 * @returns True.
 */
export function getClientSnapshot(): boolean {
  return true;
}

/**
 * Returns the server's snapshot, which React also uses for the hydration render: the page hasn't hydrated.
 * @returns False.
 */
export function getServerSnapshot(): boolean {
  return false;
}

/**
 * Subscribes to nothing, for a `useSyncExternalStore` snapshot that doesn't change while the page is open, such as
 * whether the page has hydrated.
 * @returns Unsubscribe, which does nothing.
 */
export function subscribeToNothing(): () => void {
  return (): void => undefined;
}
