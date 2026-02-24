import { PromptMessage } from "../../views/ExploreView/research/state/types";

/**
 * AI configuration.
 */
export interface AiConfig {
  enabled: boolean;
  prompt?: Omit<PromptMessage, "type">;
  url: string;
}
