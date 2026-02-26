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

export interface AiPrompt {
  inputPlaceholder?: string;
  suggestions?: AiSuggestions[];
  text: string;
}

export interface AiSuggestions {
  label: string;
  query: string;
  // For now, we only have one variant, but this allows for future expansion.
  variant: "CHIP";
}
