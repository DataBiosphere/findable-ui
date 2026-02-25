import {
  PromptMessage,
  PromptSuggestion,
} from "../../views/ResearchView/state/types";

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

export interface AiPrompt extends Omit<
  PromptMessage,
  "createdAt" | "suggestions" | "type"
> {
  suggestions?: Omit<PromptSuggestion, "createdAt">[];
}
