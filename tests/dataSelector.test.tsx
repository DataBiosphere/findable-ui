import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import type { JSX } from "react";
import type { ExploreMode } from "../src/hooks/useExploreMode/types";

const CS_FETCH_CS_FILTER = "CSFetchCSFilter";
const SS_FETCH_CS_FILTER = "SSFetchCSFilter";
const SS_FETCH_SS_FILTER = "SSFetchSSFilter";

let exploreMode: ExploreMode;

/**
 * Creates a stand-in for a strategy that renders its name and the props it received.
 * @param name - Strategy name.
 * @returns Strategy stand-in.
 */
function mockStrategy(name: string): (props: object) => JSX.Element {
  /**
   * Renders the strategy's name and props.
   * @param props - Props the strategy received.
   * @returns Strategy stand-in element.
   */
  function Strategy(props: object): JSX.Element {
    return <div data-testid={name}>{JSON.stringify(props)}</div>;
  }
  return Strategy;
}

jest.unstable_mockModule("../src/hooks/useExploreMode/useExploreMode", () => ({
  useExploreMode: jest.fn(() => exploreMode),
}));
jest.unstable_mockModule(
  "../src/views/ExploreView/entityList/data/strategies/CSFetchCSFilter/csFetchCSFilter",
  () => ({ CSFetchCSFilter: mockStrategy(CS_FETCH_CS_FILTER) }),
);
jest.unstable_mockModule(
  "../src/views/ExploreView/entityList/data/strategies/SSFetchCSFilter/lazy",
  () => ({ LazySSFetchCSFilter: mockStrategy(SS_FETCH_CS_FILTER) }),
);
jest.unstable_mockModule(
  "../src/views/ExploreView/entityList/data/strategies/SSFetchSSFilter/lazy",
  () => ({ LazySSFetchSSFilter: mockStrategy(SS_FETCH_SS_FILTER) }),
);

const { DataSelector } =
  await import("../src/views/ExploreView/entityList/data/selector/dataSelector");
const { EXPLORE_MODE } = await import("../src/hooks/useExploreMode/types");

const DATA = [{ id: "a" }];
const STRATEGIES = [CS_FETCH_CS_FILTER, SS_FETCH_CS_FILTER, SS_FETCH_SS_FILTER];

/**
 * Returns the names of the strategies rendered.
 * @returns Strategy names.
 */
function getRenderedStrategies(): string[] {
  return STRATEGIES.filter((name) => screen.queryByTestId(name));
}

describe("DataSelector", () => {
  it("renders only the client-side fetch strategy, with the static data, for client-side fetching", () => {
    exploreMode = EXPLORE_MODE.CS_FETCH_CS_FILTERING;

    render(<DataSelector data={DATA} entityListType="atlases" />);

    expect(getRenderedStrategies()).toEqual([CS_FETCH_CS_FILTER]);
    expect(
      JSON.parse(screen.getByTestId(CS_FETCH_CS_FILTER).textContent ?? ""),
    ).toEqual({ data: DATA, entityListType: "atlases" });
  });

  it("renders only the server-side fetch, client-side filter strategy, without the static data", () => {
    exploreMode = EXPLORE_MODE.SS_FETCH_CS_FILTERING;

    render(<DataSelector data={DATA} entityListType="atlases" />);

    expect(getRenderedStrategies()).toEqual([SS_FETCH_CS_FILTER]);
    expect(
      JSON.parse(screen.getByTestId(SS_FETCH_CS_FILTER).textContent ?? ""),
    ).toEqual({ entityListType: "atlases" });
  });

  it("renders only the server-side fetch, server-side filter strategy, without the static data", () => {
    exploreMode = EXPLORE_MODE.SS_FETCH_SS_FILTERING;

    render(<DataSelector data={DATA} entityListType="atlases" />);

    expect(getRenderedStrategies()).toEqual([SS_FETCH_SS_FILTER]);
    expect(
      JSON.parse(screen.getByTestId(SS_FETCH_SS_FILTER).textContent ?? ""),
    ).toEqual({ entityListType: "atlases" });
  });
});
