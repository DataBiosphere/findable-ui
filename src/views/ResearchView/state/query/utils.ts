import { SiteConfig } from "../../../../config/entities";

/**
 * Returns the AI URL from the site config.
 * @param config - Site configuration.
 * @returns The AI URL.
 * @throws If the AI URL is not configured.
 */
export function getQueryUrl(config: SiteConfig): string {
  const url = config.ai?.url;
  if (!url) {
    throw new Error("Chat URL is not configured");
  }
  return url;
}
