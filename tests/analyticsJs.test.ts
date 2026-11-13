import { fireEvent } from "@testing-library/react";
import { readFileSync } from "fs";
import { resolve } from "path";

// Markup as in static/analytics-preview.html: a tooltip, a toggletip and a
// button outside both.
const MARKUP = `
  <span class="fui-tooltip-wrapper">
    <button aria-describedby="tip" class="fui-tooltip-trigger" type="button">Users</button>
    <span class="fui-tooltip" id="tip" role="tooltip">Unique visitors.</span>
  </span>
  <span class="fui-toggletip">
    <button aria-controls="help" aria-expanded="false" class="fui-toggletip-trigger" type="button">i</button>
    <span class="fui-toggletip-content" id="help">Engaged sessions. <a href="#">Learn more</a></span>
  </span>
  <button id="outside" type="button">Outside</button>
`;

const DISMISSED = "fui-tooltip-dismissed";

/**
 * Returns the element matching the selector, failing the test if it is missing.
 * @param selector - CSS selector.
 * @returns The matching element.
 */
function get(selector: string): HTMLElement {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) throw new Error(`No element matches ${selector}`);
  return el;
}

/**
 * Presses Escape on the focused element, which bubbles to the document.
 */
function pressEscape(): void {
  fireEvent.keyDown(document.activeElement ?? document.body, {
    key: "Escape",
  });
}

describe("analytics.js", () => {
  let content: HTMLElement;
  let link: HTMLElement;
  let outside: HTMLElement;
  let toggletipTrigger: HTMLElement;
  let tooltipTrigger: HTMLElement;
  let wrapper: HTMLElement;

  beforeAll(() => {
    // The script adds listeners to the document that it never removes, so it
    // is loaded once; loading it per test would stack up click handlers that
    // cancel each other's toggle.
    window.eval(
      readFileSync(resolve(process.cwd(), "static/analytics.js"), "utf8"),
    );
  });

  beforeEach(() => {
    document.body.innerHTML = MARKUP;
    content = get(".fui-toggletip-content");
    link = get(".fui-toggletip-content a");
    outside = get("#outside");
    toggletipTrigger = get(".fui-toggletip-trigger");
    tooltipTrigger = get(".fui-tooltip-trigger");
    wrapper = get(".fui-tooltip-wrapper");
  });

  describe("toggletip", () => {
    it("toggles aria-expanded on a click on the button", () => {
      fireEvent.click(toggletipTrigger);
      expect(toggletipTrigger.getAttribute("aria-expanded")).toBe("true");
      fireEvent.click(toggletipTrigger);
      expect(toggletipTrigger.getAttribute("aria-expanded")).toBe("false");
    });

    it("closes on a pointerdown outside it", () => {
      fireEvent.click(toggletipTrigger);
      fireEvent.pointerDown(outside);
      expect(toggletipTrigger.getAttribute("aria-expanded")).toBe("false");
    });

    it("stays open on a pointerdown inside it", () => {
      fireEvent.click(toggletipTrigger);
      fireEvent.pointerDown(content);
      expect(toggletipTrigger.getAttribute("aria-expanded")).toBe("true");
    });

    it("closes on Escape and returns focus to the button when focus was inside it", () => {
      fireEvent.click(toggletipTrigger);
      link.focus();
      pressEscape();
      expect(toggletipTrigger.getAttribute("aria-expanded")).toBe("false");
      expect(document.activeElement).toBe(toggletipTrigger);
    });

    it("closes on Escape and leaves focus where it is when focus was outside it", () => {
      fireEvent.click(toggletipTrigger);
      outside.focus();
      pressEscape();
      expect(toggletipTrigger.getAttribute("aria-expanded")).toBe("false");
      expect(document.activeElement).toBe(outside);
    });

    it("closes when focus moves to an element outside it", () => {
      fireEvent.click(toggletipTrigger);
      fireEvent.focusOut(toggletipTrigger, { relatedTarget: outside });
      expect(toggletipTrigger.getAttribute("aria-expanded")).toBe("false");
    });

    it("stays open when focus moves within it", () => {
      fireEvent.click(toggletipTrigger);
      fireEvent.focusOut(toggletipTrigger, { relatedTarget: link });
      expect(toggletipTrigger.getAttribute("aria-expanded")).toBe("true");
    });

    it("stays open on a focusout with no relatedTarget", () => {
      fireEvent.click(toggletipTrigger);
      fireEvent.focusOut(toggletipTrigger, { relatedTarget: null });
      expect(toggletipTrigger.getAttribute("aria-expanded")).toBe("true");
    });
  });

  // jsdom never matches :hover, so these cover the focus side only; the
  // pointer side was checked by hand in browsers.
  describe("tooltip", () => {
    it("is dismissed on Escape while its trigger has focus", () => {
      tooltipTrigger.focus();
      pressEscape();
      expect(wrapper.classList.contains(DISMISSED)).toBe(true);
    });

    it("stays dismissed on a mouseout while focus is still inside it", () => {
      tooltipTrigger.focus();
      pressEscape();
      fireEvent.mouseOut(tooltipTrigger, { relatedTarget: outside });
      expect(wrapper.classList.contains(DISMISSED)).toBe(true);
    });

    it("stays dismissed when focus moves within it", () => {
      tooltipTrigger.focus();
      pressEscape();
      fireEvent.focusOut(tooltipTrigger, { relatedTarget: wrapper });
      expect(wrapper.classList.contains(DISMISSED)).toBe(true);
    });

    it("clears the dismissal once focus leaves it", () => {
      tooltipTrigger.focus();
      pressEscape();
      outside.focus();
      expect(wrapper.classList.contains(DISMISSED)).toBe(false);
    });
  });
});
