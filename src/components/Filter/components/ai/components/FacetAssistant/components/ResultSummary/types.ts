export type MentionTermPair = [mention: string, term: string];

export type ResultSummaryData = {
  matched: MentionTermPair[];
  unmatched: MentionTermPair[];
};

export interface ResultSummaryProps {
  summary?: ResultSummaryData;
}
