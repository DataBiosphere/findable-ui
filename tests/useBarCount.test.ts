import { act, renderHook, type RenderHookResult } from "@testing-library/react";
import type { SelectCategoryValueView } from "../src/common/entities";
import { MAX_BAR_COUNT } from "../src/components/Index/components/EntityView/components/views/ChartView/components/Chart/hooks/UseBarCount/constants";
import { useBarCount } from "../src/components/Index/components/EntityView/components/views/ChartView/components/Chart/hooks/UseBarCount/hook";
import type { UseBarCount } from "../src/components/Index/components/EntityView/components/views/ChartView/components/Chart/hooks/UseBarCount/types";
import { renderButtonText } from "../src/components/Index/components/EntityView/components/views/ChartView/components/Chart/utils";

const FEW = 5;
const MANY = 30;

/**
 * Builds the given number of category value views.
 * @param count - Number of values.
 * @returns Category value views.
 */
function buildValues(count: number): SelectCategoryValueView[] {
  return Array.from({ length: count }, (_, i) => ({
    count: 1,
    key: `value-${i}`,
    label: `Value ${i}`,
    selected: false,
  }));
}

/**
 * Renders the hook with the given number of values; rerender with new values to simulate a filter change on a mounted chart.
 * @param count - Initial number of values.
 * @returns The render hook result.
 */
function renderBarCount(
  count: number,
): RenderHookResult<UseBarCount, { values: SelectCategoryValueView[] }> {
  return renderHook(({ values }) => useBarCount(values), {
    initialProps: { values: buildValues(count) },
  });
}

describe("useBarCount", () => {
  it("shows all bars when the values do not exceed the maximum bar count", () => {
    const { result } = renderBarCount(FEW);

    expect(result.current.barCount).toBeUndefined();
    expect(result.current.expandable).toBe(false);
    expect(result.current.expanded).toBe(false);
  });

  // Regression: the bar count was set once from the first render's values.
  it("limits the bars when a mounted chart's values grow past the maximum bar count", () => {
    const { rerender, result } = renderBarCount(FEW);

    rerender({ values: buildValues(MANY) });

    expect(result.current.barCount).toBe(MAX_BAR_COUNT);
    expect(result.current.expandable).toBe(true);
    expect(result.current.expanded).toBe(false);
  });

  it("toggles between all bars and the maximum bar count", () => {
    const { result } = renderBarCount(MANY);

    act(() => result.current.onToggleBarCount());

    expect(result.current.barCount).toBeUndefined();
    expect(result.current.expanded).toBe(true);

    act(() => result.current.onToggleBarCount());

    expect(result.current.barCount).toBe(MAX_BAR_COUNT);
    expect(result.current.expanded).toBe(false);
  });

  it("collapses an expanded chart whose values no longer exceed the maximum bar count", () => {
    const { rerender, result } = renderBarCount(MANY);
    act(() => result.current.onToggleBarCount());

    rerender({ values: buildValues(FEW) });

    expect(result.current.expanded).toBe(false);

    rerender({ values: buildValues(MANY) });

    expect(result.current.barCount).toBe(MAX_BAR_COUNT);
    expect(result.current.expanded).toBe(false);
  });
});

describe("renderButtonText", () => {
  it("returns the number of additional results when collapsed", () => {
    expect(renderButtonText(false, buildValues(MANY))).toBe(
      `Show ${MANY - MAX_BAR_COUNT} additional results`,
    );
  });

  it("returns show less when expanded", () => {
    expect(renderButtonText(true, buildValues(MANY))).toBe("Show less");
  });
});
