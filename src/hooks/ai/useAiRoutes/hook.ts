import { FEATURE_FLAG } from "../../../common/ai/constants";
import { AiConfig } from "../../../common/ai/types";
import { useConfig } from "../../useConfig";
import { useFeatureFlag } from "../../useFeatureFlag/useFeatureFlag";

/**
 * Returns AI route configuration when the AI feature is enabled.
 * @returns AI routes, or undefined if AI is not configured or enabled.
 */
export const useAiRoutes = (): Pick<AiConfig, "routes"> | undefined => {
  const flagEnabled = useFeatureFlag(FEATURE_FLAG.CHAT);
  const { config } = useConfig();
  const { ai } = config;

  if (!ai) return;

  const { enabled, routes } = ai;

  if (enabled || flagEnabled) {
    return { routes };
  }
};
