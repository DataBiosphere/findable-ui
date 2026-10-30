/**
 * Calls the function on the animation frame after each page scroll, at most once a frame.
 * By that frame the page has settled: listeners that run after this one, and scroll-driven animations, have applied.
 * @param onFrame - Function to call after the page scrolls.
 * @returns A function removing the listener and any pending frame.
 */
export function onScrollFrame(onFrame: () => void): () => void {
  let frame = 0;
  const listener = (): void => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => onFrame());
  };
  window.addEventListener("scroll", listener, { passive: true });
  return (): void => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", listener);
  };
}
