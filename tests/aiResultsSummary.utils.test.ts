import type { ResultSummaryData } from "../src/components/Filter/components/ai/components/FacetAssistant/components/ResultSummary/types";
import { renderSummary } from "../src/components/Filter/components/ai/components/FacetAssistant/components/ResultSummary/utils";

describe("renderSummary", () => {
  const emptySummary = (): ResultSummaryData => ({
    matched: [],
    unmatched: [],
  });

  it("renders 'X matched' when only matched items exist (plural)", () => {
    const summary: ResultSummaryData = {
      matched: [
        ["a", "A"],
        ["b", "B"],
      ],
      unmatched: [],
    };

    expect(renderSummary(summary)).toBe("2 matched");
  });

  it("renders '1 matched' when a single matched item exists", () => {
    const summary: ResultSummaryData = {
      matched: [["a", "A"]],
      unmatched: [],
    };

    expect(renderSummary(summary)).toBe("1 matched");
  });

  it("renders 'X unmatched' when only unmatched items exist", () => {
    const summary: ResultSummaryData = {
      matched: [],
      unmatched: [
        ["a", "A"],
        ["b", "B"],
      ],
    };

    expect(renderSummary(summary)).toBe("2 unmatched");
  });

  it("renders 'X matched, Y unmatched' when both exist", () => {
    const summary: ResultSummaryData = {
      matched: [
        ["a", "A"],
        ["b", "B"],
      ],
      unmatched: [["c", "C"]],
    };

    expect(renderSummary(summary)).toBe("2 matched, 1 unmatched");
  });

  it("handles empty matched and unmatched arrays (current behavior)", () => {
    const summary = emptySummary();

    // With current implementation: matched = 0, unmatched = 0
    expect(renderSummary(summary)).toBe("0 matched");
  });
});
