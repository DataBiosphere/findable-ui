import { jest } from "@jest/globals";
import { startDownload } from "../src/components/Index/components/AzulFileDownload/hooks/UseDownload/utils";

describe("startDownload", () => {
  const FILE_URL = "https://example.com/storage/file";

  it("should point the anchor at the file location", () => {
    const anchorEl = document.createElement("a");
    jest.spyOn(anchorEl, "click").mockImplementation(() => undefined);
    startDownload(anchorEl, FILE_URL);
    expect(anchorEl.href).toBe(FILE_URL);
  });

  it("should click the anchor once", () => {
    const anchorEl = document.createElement("a");
    const clickSpy = jest
      .spyOn(anchorEl, "click")
      .mockImplementation(() => undefined);
    startDownload(anchorEl, FILE_URL);
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it("should set the location before clicking, so the click downloads the file", () => {
    const anchorEl = document.createElement("a");
    let hrefAtClick: string | undefined;
    jest.spyOn(anchorEl, "click").mockImplementation(() => {
      hrefAtClick = anchorEl.href;
    });
    startDownload(anchorEl, FILE_URL);
    expect(hrefAtClick).toBe(FILE_URL);
  });

  it("should replace the location of an anchor used for an earlier download", () => {
    const anchorEl = document.createElement("a");
    jest.spyOn(anchorEl, "click").mockImplementation(() => undefined);
    startDownload(anchorEl, "https://example.com/storage/first");
    startDownload(anchorEl, FILE_URL);
    expect(anchorEl.href).toBe(FILE_URL);
  });
});
