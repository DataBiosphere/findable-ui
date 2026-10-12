/**
 * AI configuration.
 */
export interface AiConfig {
  enabled: boolean;
  prompt?: AiPrompt;
  routes: {
    research: string;
    search: string;
  };
  url: string;
}

/**
 * AI prompt configuration.
 */
export interface AiPrompt {
  inputPlaceholder?: string;
  suggestions?: AiSuggestions[];
  text: string;
}

/**
 * Suggested query shown with the AI prompt.
 */
export interface AiSuggestions {
  label: string;
  query: string;
  // For now, we only have one variant, but this allows for future expansion.
  variant: "CHIP";
}
