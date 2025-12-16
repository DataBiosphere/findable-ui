import { ReactNode } from "react";
import { MentionTermPair } from "../../../../types";

export interface ResultSummarySectionProps {
  icon: ReactNode;
  mentionTermPair: MentionTermPair[];
  title: string;
}
