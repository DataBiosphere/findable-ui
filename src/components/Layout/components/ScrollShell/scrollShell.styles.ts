import styled from "@emotion/styled";

/**
 * Scroll container for the page, wrapping `main` and the footer inside
 * `AppLayout`, below the header.
 *
 * Content scrolls here rather than in the document, so the header — which sits
 * outside this element — stays put without being taken out of flow, and sticky
 * content inside anchors at top: 0 against a scrollport that already begins
 * below the header. Nothing inside needs to know the header's height.
 *
 * The footer belongs in here too, so it still scrolls into view after the
 * content. Keep it a sibling of main rather than a descendant: ARIA in HTML
 * maps a footer inside main to generic instead of contentinfo, and does not
 * permit role="contentinfo" to restore it there.
 *
 * flex-direction: column with main's own flex: 1 keeps the footer at the bottom
 * on pages shorter than the viewport; min-height: 0 lets AppLayout's 100dvh
 * bound this element, which a flex item's automatic minimum size would otherwise
 * prevent. Note overflow-x computes to auto rather than visible once overflow-y
 * is auto, so unexpectedly wide content scrolls here instead of being clipped.
 *
 * container-type: size makes this element a query container, so descendants can
 * size against the scrollport with cqh rather than vh — vh is the viewport,
 * which is a header taller than the space available in here. Safe because the
 * shell's own size comes from the layout above it, not from its contents, which
 * is what size containment requires. Note cqh resolves against the nearest size
 * container, so introducing another one between here and a consumer would
 * silently change what it means.
 *
 * scroll-padding-top keeps fragment navigation and scrollIntoView from landing
 * a target underneath sticky content. Its value comes from a custom property
 * because scroll-padding has to sit on the scrollport, while only the page knows
 * how much of the top is obscured; custom properties inherit, so the page
 * declares it on the HTML element and it reaches here.
 */
export const ScrollShell = styled.div`
  container-type: size;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scroll-padding-top: var(--scroll-padding-top, 0px);
`;
