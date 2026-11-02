import { jest } from "@jest/globals";
import fetchMock from "jest-fetch-mock";
import { SiteConfig } from "../src/config/entities";

type TestSiteConfig = Pick<SiteConfig, "dataSource">;

const SITE_CONFIG: TestSiteConfig = {
  dataSource: {
    defaultListParams: { size: "25" },
    url: "https://service.azul.data/",
  },
};

jest.unstable_mockModule("../src/config/config", () => ({
  // `getConfig` is mocked with only the relevant parts of the site config included in the return value
  getConfig: jest.fn((): TestSiteConfig => SITE_CONFIG),
}));

const { fetchAllEntities, fetchEntitiesFromApiURL } =
  await import("../src/entity/api/service");

const API_PATH = "https://service.azul.data/index/projects";
const NEXT_URL = `${API_PATH}?catalog=dcp1&filters=%7B%22genusSpecies%22%3A%7B%22is%22%3A%5B%22Homo%20sapiens%22%5D%7D%7D&size=25&sort=projectTitle&order=asc&search_after=Brain&search_after_uid=doc%23a`;
const TOKEN = "test-token";

/**
 * Returns an Azul entities response body.
 * @param hits - Hits.
 * @param next - Next page link, if any.
 * @returns Response body.
 */
function responseBody(hits: unknown[], next?: string): string {
  return JSON.stringify({
    hits,
    pagination: { count: hits.length, next, pages: 2, size: 25, total: 2 },
    termFacets: {},
  });
}

/**
 * Returns the requests made to the mocked fetch.
 * @returns Requests.
 */
function getRequests(): Request[] {
  return fetchMock.mock.calls.map(([request]) => request as Request);
}

beforeAll(() => {
  fetchMock.doMock();
  globalThis.fetch = ((...args) => {
    return fetchMock(...(args as Parameters<typeof fetchMock>));
  }) as typeof fetch;
});

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("fetchEntitiesFromApiURL", () => {
  it("requests the pagination link exactly as given, with the token", async () => {
    fetchMock.mockResponseOnce(responseBody([{ id: "b" }]));

    const response = await fetchEntitiesFromApiURL(API_PATH, NEXT_URL, TOKEN);

    const [request] = getRequests();
    expect(request.url).toBe(NEXT_URL);
    expect(request.headers.get("Authorization")).toBe(`Bearer ${TOKEN}`);
    expect(response.apiPath).toBe(API_PATH);
    expect(response.hits).toEqual([{ id: "b" }]);
  });

  it("sends no token when signed out", async () => {
    fetchMock.mockResponseOnce(responseBody([]));

    await fetchEntitiesFromApiURL(API_PATH, NEXT_URL, undefined);

    const [request] = getRequests();
    expect(request.url).toBe(NEXT_URL);
    expect(request.headers.has("Authorization")).toBe(false);
  });
});

describe("fetchAllEntities", () => {
  it("follows the next links as given, sending the token on every page", async () => {
    fetchMock.mockResponseOnce(responseBody([{ id: "a" }], NEXT_URL));
    fetchMock.mockResponseOnce(responseBody([{ id: "b" }]));

    const response = await fetchAllEntities(API_PATH, TOKEN, "dcp1");

    const requests = getRequests();
    expect(requests).toHaveLength(2);
    expect(requests[1].url).toBe(NEXT_URL);
    requests.forEach((request) =>
      expect(request.headers.get("Authorization")).toBe(`Bearer ${TOKEN}`),
    );
    expect(response.hits).toEqual([{ id: "a" }, { id: "b" }]);
  });
});
