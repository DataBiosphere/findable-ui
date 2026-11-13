import { Fragment, ReactNode } from "react";

const BREAK_AFTER = /(?<=\/)/;

/**
 * Adds a line break opportunity after each slash.
 * @param text - Cell text.
 * @returns the text with line break opportunities.
 */
export function addWordBreaks(text: string): ReactNode {
  const parts = text.split(BREAK_AFTER);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <wbr />}
      {part}
    </Fragment>
  ));
}
