import type { ResultSummaryData } from "../src/components/Filter/components/ai/components/FacetAssistant/components/ResultSummary/types";
import { renderSummary } from "../src/components/Filter/components/ai/components/FacetAssistant/components/ResultSummary/utils";

describe("renderSummary", () => {
  const emptySummary = (): ResultSummaryData => ({
    matched: [],
    unmatched: [],
  });

  it("renders 'AI found X matches' when only matched items exist (plural)", () => {
    const summary: ResultSummaryData = {
      matched: [
        ["a", "A"],
        ["b", "B"],
      ],
      unmatched: [],
    };

    expect(renderSummary(summary)).toBe("AI found 2 matches");
  });

  it("renders 'AI found 1 match' when a single matched item exists", () => {
    const summary: ResultSummaryData = {
      matched: [["a", "A"]],
      unmatched: [],
    };

    expect(renderSummary(summary)).toBe("AI found 1 match");
  });

  it("renders 'AI found X with no match' when only unmatched items exist", () => {
    const summary: ResultSummaryData = {
      matched: [],
      unmatched: [
        ["a", "A"],
        ["b", "B"],
      ],
    };

    expect(renderSummary(summary)).toBe("AI found 2 with no match");
  });

  it("renders 'AI found X matches and Y with no match' when both exist", () => {
    const summary: ResultSummaryData = {
      matched: [
        ["a", "A"],
        ["b", "B"],
      ],
      unmatched: [["c", "C"]],
    };

    expect(renderSummary(summary)).toBe(
      "AI found 2 matches and 1 with no match"
    );
  });

  it("handles empty matched and unmatched arrays (current behavior)", () => {
    const summary = emptySummary();

    // With current implementation: matched = 0, unmatched = 0
    expect(renderSummary(summary)).toBe("AI found 0 matches");
  });
});
