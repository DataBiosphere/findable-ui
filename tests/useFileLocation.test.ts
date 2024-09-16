import { buildFetchFileUrl } from "../src/hooks/useFileLocation";

const URL_INVALID = "invalidUrl";
const URL_WITH_FETCH_PREPEND = "https://example.com/fetch/repository/file";
const URL_WITHOUT_FETCH_PREPEND = "https://example.com/repository/file";

jest.mock("../src/hooks/useRequestFileLocation");

describe("useFileLocation", () => {
  describe("build file URL", () => {
    describe("buildFetchFileUrl", () => {
      test("url is undefined", () => {
        expect(buildFetchFileUrl()).toBeUndefined();
      });
      test("url is invalid", () => {
        expect(() => buildFetchFileUrl(URL_INVALID)).toThrowError(
          `Invalid file URL: ${URL_INVALID}`
        );
      });
      test("url with 'fetch' prepended in path", () => {
        expect(buildFetchFileUrl(URL_WITH_FETCH_PREPEND)).toEqual(
          URL_WITH_FETCH_PREPEND
        );
      });
      test("url without 'fetch' prepended in path", () => {
        expect(buildFetchFileUrl(URL_WITHOUT_FETCH_PREPEND)).toEqual(
          URL_WITH_FETCH_PREPEND
        );
      });
    });
  });
});
