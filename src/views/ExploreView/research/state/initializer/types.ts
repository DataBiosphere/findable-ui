import { PromptMessage } from "../types";

export type InitialArgs = Omit<PromptMessage, "type">;
