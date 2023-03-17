import { SiteConfig } from "./entities";

let dxConfig: SiteConfig;

/**
 * Sets application config.
 * @param config - Application config.
 */
export function setConfig(config: SiteConfig): void {
  dxConfig = config;
}

/**
 * Returns application config.
 * @returns application config.
 */
export function getConfig(): SiteConfig {
  return dxConfig;
}
