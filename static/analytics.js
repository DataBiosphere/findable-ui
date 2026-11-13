/*
 * findable-ui Analytics Dashboard Scripts
 *
 * The tooltip and toggletip behaviour that analytics.css can't provide on its
 * own. Copy it next to analytics.css and load it once per page:
 *
 *   <script defer src="analytics.js"></script>
 *
 * Tooltips: Escape closes an open tooltip (WCAG 1.4.13), which stays closed
 * until the pointer and focus have both left its trigger.
 *
 * Toggletips: a click on the button opens and closes the toggletip. Escape
 * closes it (returning focus to the button if focus was inside it), as does a
 * tap or click outside it, or focus moving to another element on the page.
 */

// A block, so these names stay out of the page's global scope.
{
  const DISMISSED = "fui-tooltip-dismissed";
  const EXPANDED = "aria-expanded";
  const TOGGLETIP = ".fui-toggletip";
  const TOGGLETIP_TRIGGER = ".fui-toggletip-trigger";
  const OPEN_TOGGLETIP_TRIGGER = `${TOGGLETIP_TRIGGER}[${EXPANDED}="true"]`;

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document
      .querySelectorAll(
        ".fui-tooltip-wrapper:hover, .fui-tooltip-wrapper:focus-within",
      )
      .forEach((el) => el.classList.add(DISMISSED));
    document.querySelectorAll(OPEN_TOGGLETIP_TRIGGER).forEach((trigger) => {
      const toggletip = trigger.closest(TOGGLETIP);
      if (toggletip.contains(document.activeElement)) trigger.focus();
      trigger.setAttribute(EXPANDED, "false");
    });
  });

  // Clears a dismissed tooltip once the pointer and focus have both left it.
  ["focusout", "mouseout"].forEach((type) => {
    document.addEventListener(type, (event) => {
      const el = event.target.closest(`.${DISMISSED}`);
      if (!el || el.contains(event.relatedTarget)) return;
      if (el.matches(type === "focusout" ? ":hover" : ":focus-within")) return;
      el.classList.remove(DISMISSED);
    });
  });

  document.addEventListener("pointerdown", (event) => {
    document.querySelectorAll(OPEN_TOGGLETIP_TRIGGER).forEach((trigger) => {
      if (!trigger.closest(TOGGLETIP).contains(event.target)) {
        trigger.setAttribute(EXPANDED, "false");
      }
    });
  });

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(TOGGLETIP_TRIGGER);
    if (!trigger) return;
    const expanded = trigger.getAttribute(EXPANDED) === "true";
    trigger.setAttribute(EXPANDED, String(!expanded));
  });

  document.addEventListener("focusout", (event) => {
    const toggletip = event.target.closest(TOGGLETIP);
    // No relatedTarget: a press on the page (left to the pointerdown handler, so
    // a press on the content's text keeps it open) or focus leaving the page.
    if (!toggletip || !event.relatedTarget) return;
    if (toggletip.contains(event.relatedTarget)) return;
    toggletip.querySelector(TOGGLETIP_TRIGGER).setAttribute(EXPANDED, "false");
  });
}
