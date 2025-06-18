/**
 * Error thrown when a dictionary config is not found.
 * @param dictionary - Dictionary ID.
 * @throws Error - Dictionary config not found.
 */
export function throwDictionaryConfigNotFoundError(dictionary: string): void {
  throw new Error(`Dictionary config not found for dictionary: ${dictionary}`);
}
