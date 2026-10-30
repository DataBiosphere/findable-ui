/**
 * Calls the function on the animation frame after each scroll, of the page or of any scrolling element within it (e.g. the sidebar), at most once a frame.
 * By that frame the page has settled: listeners that run after this one, and scroll-driven animations, have applied.
 * @param onFrame - Function to call after a scroll.
 * @returns A function removing the listener and any pending frame.
 */
export function onScrollFrame(onFrame: () => void): () => void {
  let frame = 0;
  const listener = (): void => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => onFrame());
  };
  // Scroll events do not bubble; capturing them on the window also reports scrolling elements.
  window.addEventListener("scroll", listener, { capture: true, passive: true });
  return (): void => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", listener, { capture: true });
  };
}
