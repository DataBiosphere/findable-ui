import { AssistantMessage } from "../../../../../state/types";

/**
 * Formats mention mappings from an assistant message as a readable string.
 * @param message - Assistant message containing response mentions.
 * @returns Formatted facet-value mappings separated by slashes, or empty string if no mentions.
 */
export function getMappings(message: AssistantMessage): string {
  const mappings = message.response.query.mentions.reduce<
    Record<string, string[]>
  >((acc, m) => {
    const key = m.exclude ? `${m.facet} (exclude)` : m.facet;
    acc[key] = [...(acc[key] || []), ...m.values];
    return acc;
  }, {});

  return Object.entries(mappings)
    .map(([facet, values]) => `${facet}: ${values.join(", ")}`)
    .join(" / ");
}

/**
 * Extracts original mention text from an assistant message.
 * @param message - Assistant message containing response mentions.
 * @returns Comma-separated original mention text, or empty string if no mentions.
 */
export function getMentions(message: AssistantMessage): string {
  return message.response.query.mentions
    .map((mention) => mention.originalText)
    .join(", ");
}
