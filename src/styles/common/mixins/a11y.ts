import { css } from "@emotion/react";

/**
 * Removes content from view while leaving it in the accessibility tree, for
 * text that names a control or announces a change without taking up space.
 * The content is clipped rather than hidden: `display: none` and
 * `visibility: hidden` would remove it from the accessibility tree as well.
 */
export const visuallyHidden = css`
  border: 0;
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
