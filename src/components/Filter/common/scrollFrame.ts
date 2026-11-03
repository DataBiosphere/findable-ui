/**
 * Calls the function on the animation frame after each scroll, of the page or of any scrolling element within it (e.g. the sidebar), at most once a frame.
 * By that frame the page has settled: listeners that run after this one, and scroll-driven animations, have applied.
 * @param onFrame - Function to call after a scroll.
 * @param ignore - Element whose own scrolling is ignored, e.g. a panel scrolling its list.
 * @returns A function removing the listener and any pending frame.
 */
export function onScrollFrame(
  onFrame: () => void,
  ignore?: Element,
): () => void {
  let frame = 0;
  const listener = (event: Event): void => {
    if (ignore && event.target instanceof Node && ignore.contains(event.target))
      return;
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
