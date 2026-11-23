import { render } from "@testing-library/react";
import type { JSX } from "react";
import { renderToString } from "react-dom/server.node";

/**
 * Renders the element to static HTML, as the static export does, and puts it in the document. Then runs
 * `beforeHydrate`, which sets up what only the client has, such as the URL, and hydrates the same element, as a cold
 * page load does.
 * @param element - Element to render and hydrate.
 * @param beforeHydrate - Called between the server render and hydration.
 * @returns The static HTML, and the container it was hydrated in.
 */
export function hydrate(
  element: JSX.Element,
  beforeHydrate: () => void,
): { container: HTMLElement; html: string } {
  const html = renderToString(element);
  const container = document.createElement("div");
  container.innerHTML = html;
  document.body.appendChild(container);
  beforeHydrate();
  render(element, { container, hydrate: true });
  return { container, html };
}
