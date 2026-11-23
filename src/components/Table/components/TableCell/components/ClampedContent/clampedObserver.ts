const callbacks = new WeakMap<Element, () => void>();
let observer: ResizeObserver | undefined;

/**
 * Observes the element's size with a ResizeObserver shared by all clamped content, calling back on each resize.
 * @param element - Element to observe.
 * @param callback - Called when the element resizes.
 * @returns function that stops observing the element.
 */
export function observeResize(
  element: Element,
  callback: () => void,
): () => void {
  observer ??= new ResizeObserver((entries) => {
    for (const { target } of entries) callbacks.get(target)?.();
  });
  callbacks.set(element, callback);
  observer.observe(element);
  return (): void => {
    observer?.unobserve(element);
    callbacks.delete(element);
  };
}
