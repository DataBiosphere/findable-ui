import type { ReactNode } from "react";

/**
 * Returns the accessible name for the dialog title: the given label, or the
 * title itself when it is non-blank text.
 * @param title - Title content.
 * @param titleLabel - Accessible name provided by the consumer.
 * @returns The trimmed label when it is non-blank, else the trimmed title when it is non-blank text, else undefined.
 */
export function getTitleAriaLabel(
  title: ReactNode,
  titleLabel?: string,
): string | undefined {
  const textTitle = typeof title === "string" ? title.trim() : "";
  return titleLabel?.trim() || textTitle || undefined;
}
