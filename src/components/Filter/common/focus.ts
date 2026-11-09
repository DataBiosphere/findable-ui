import { dialogClasses, type PopperProps } from "@mui/material";
import type { KeyboardEvent, KeyboardEventHandler } from "react";

/**
 * Elements that can take focus from the keyboard, before excluding disabled, hidden, inert and negative tabindex ones.
 */
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button",
  "input",
  "select",
  "textarea",
  "[tabindex]",
].join(",");

/**
 * Paper of a MUI dialog, whose focus trap would otherwise pull focus back out of a panel portaled to the body. Only dialogs: findable-ui's own drawer and popover surfaces style every paper inside them, and the drawer surface's backdrop sits above anything rendered inside them, so panels there stay portaled to the body.
 */
const DIALOG_PAPER_SELECTOR = `.${dialogClasses.paper}`;

/**
 * Closes the panel and returns focus to its button, without scrolling the page.
 * @param onClose - Function to close the panel.
 * @param anchorEl - The panel's button.
 */
export function closeAndRestoreFocus(
  onClose: () => void,
  anchorEl: PopperProps["anchorEl"],
): void {
  onClose();
  if (anchorEl instanceof HTMLElement) anchorEl.focus({ preventScroll: true });
}

/**
 * Closes the panel, returning focus to its button when focus was in the panel: e.g. Escape, or the panel's own close control. A click away leaves focus where the click put it.
 * @param panelId - Id of the panel.
 * @param anchorEl - The panel's button.
 * @param onClose - Function to close the panel.
 */
function closePanel(
  panelId: string,
  anchorEl: PopperProps["anchorEl"],
  onClose: () => void,
): void {
  if (isFocusWithin(document.getElementById(panelId))) {
    closeAndRestoreFocus(onClose, anchorEl);
    return;
  }
  onClose();
}

/**
 * Moves focus to the panel's first control as it opens, without scrolling the page, so keyboard users land in the panel. Leaves focus alone when it is already in the panel, e.g. on a search box that focuses itself.
 * @param panel - The panel.
 */
export function focusFirstControl(panel: HTMLElement): void {
  if (isFocusWithin(panel)) return;
  getTabbables(panel)[0]?.focus({ preventScroll: true });
}

/**
 * Returns the panel's close handler: closes the panel, returning focus to its button when focus was in the panel (see closePanel).
 * @param panelId - Id of the panel.
 * @param anchorEl - The panel's button.
 * @param onClose - Function to close the panel.
 * @returns Close handler.
 */
export function getCloseHandler(
  panelId: string,
  anchorEl: PopperProps["anchorEl"],
  onClose: () => void,
): () => void {
  return () => closePanel(panelId, anchorEl, onClose);
}

/**
 * Returns the panel's keydown handler, which lets Tab flow on from the panel's edges (see onPanelKeyDown).
 * @param anchorEl - The panel's button.
 * @param onClose - Function to close the panel.
 * @returns Keydown handler, for the panel.
 */
export function getKeyDownHandler(
  anchorEl: PopperProps["anchorEl"],
  onClose: () => void,
): KeyboardEventHandler<HTMLElement> {
  return (event) => onPanelKeyDown(event, anchorEl, onClose);
}

/**
 * Returns the paper of the MUI dialog the element sits in, if any. A panel rendered there stays inside the dialog's focus trap, which would otherwise pull focus back out of it.
 * @param element - Element, e.g. the panel's button.
 * @returns The dialog's paper, or null when the element isn't in a dialog.
 */
export function getModalContainer(element: Element): HTMLElement | null {
  return element.closest<HTMLElement>(DIALOG_PAPER_SELECTOR);
}

/**
 * Returns the element that follows the anchor in the keyboard's tab order, leaving out the panel's controls: the panel renders elsewhere in the document, but sits after its button in the tab order. Within a dialog, only the dialog is searched; the rest of the page is out of reach.
 * @param anchor - The panel's button.
 * @param panel - The panel.
 * @returns The next tabbable element, or undefined when the anchor is the last.
 */
function getNextTabbable(
  anchor: HTMLElement,
  panel: HTMLElement,
): HTMLElement | undefined {
  const root = getModalContainer(anchor) ?? anchor.ownerDocument.body;
  const focusables = Array.from(
    root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  );
  const index = focusables.indexOf(anchor);
  if (index < 0) return undefined;
  // Checks only what follows the anchor, and stops at the first match, so the rest of the page isn't measured.
  return focusables
    .slice(index + 1)
    .find((element) => !panel.contains(element) && isTabbable(element));
}

/**
 * Returns the container's tabbable elements, in document order.
 * @param container - Container.
 * @returns Tabbable elements.
 */
function getTabbables(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(isTabbable);
}

/**
 * Returns true if a tabbable element in the panel lies beyond the focused element in the direction Tab moves: after it, or before it with Shift.
 * Measured by position rather than by matching the panel's first or last control, so focus on an element that is no longer tabbable, e.g. a button that disabled itself when pressed, still flows on.
 * @param panel - The panel.
 * @param active - The focused element, in the panel.
 * @param backwards - True for Shift+Tab.
 * @returns True if Tab stays in the panel.
 */
function hasTabbableBeyond(
  panel: HTMLElement,
  active: HTMLElement,
  backwards: boolean,
): boolean {
  const position = backwards
    ? Node.DOCUMENT_POSITION_PRECEDING
    : Node.DOCUMENT_POSITION_FOLLOWING;
  return getTabbables(panel).some(
    (element) =>
      element !== active &&
      Boolean(active.compareDocumentPosition(element) & position),
  );
}

/**
 * Returns true if focus is on the element or inside it.
 * @param element - Element.
 * @returns True if the element holds focus.
 */
function isFocusWithin(element: HTMLElement | null): boolean {
  if (!element) return false;
  return element.contains(element.ownerDocument.activeElement);
}

/**
 * Returns true if the element is rendered: not hidden by CSS (e.g. display: none, or visibility: hidden), as the browser's own Tab skips such elements. Assumed rendered where the browser can't tell (no checkVisibility, e.g. jsdom).
 * @param element - Element.
 * @returns True if the element is rendered.
 */
function isRendered(element: HTMLElement): boolean {
  if (typeof element.checkVisibility !== "function") return true;
  return element.checkVisibility({ visibilityProperty: true });
}

/**
 * Returns true if the element takes focus from the keyboard: not disabled, not a hidden input, not in an inert or aria-hidden subtree, with a tabindex of 0 or more, and rendered.
 * @param element - Element.
 * @returns True if the element is tabbable.
 */
function isTabbable(element: HTMLElement): boolean {
  if (element.tabIndex < 0) return false;
  if (element.matches(":disabled")) return false;
  if (element instanceof HTMLInputElement && element.type === "hidden")
    return false;
  if (element.closest("[inert], [aria-hidden='true']")) return false;
  return isRendered(element);
}

/**
 * Lets Tab flow on from the panel's edges as if the panel sat right after its button: Tab with no tabbable control after the focused one closes the panel and moves to what follows the button, and Shift+Tab with none before it closes the panel and returns to the button. Tab within the panel is left to the browser.
 * @param event - Keydown event on the panel.
 * @param anchorEl - The panel's button.
 * @param onClose - Function to close the panel.
 */
function onPanelKeyDown(
  event: KeyboardEvent<HTMLElement>,
  anchorEl: PopperProps["anchorEl"],
  onClose: () => void,
): void {
  if (event.key !== "Tab" || !(anchorEl instanceof HTMLElement)) return;
  const panel = event.currentTarget;
  const active = panel.ownerDocument.activeElement;
  if (!(active instanceof HTMLElement) || !panel.contains(active)) return;
  if (hasTabbableBeyond(panel, active, event.shiftKey)) return;
  event.preventDefault();
  const next = event.shiftKey ? undefined : getNextTabbable(anchorEl, panel);
  if (!next) {
    closeAndRestoreFocus(onClose, anchorEl);
    return;
  }
  onClose();
  next.focus();
  // A control that can't take focus, e.g. one hidden by CSS, leaves focus on the button rather than lost.
  if (next.ownerDocument.activeElement !== next)
    anchorEl.focus({ preventScroll: true });
}
