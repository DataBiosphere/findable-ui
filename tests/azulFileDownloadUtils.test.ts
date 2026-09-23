import { ARIA_LABEL } from "../src/components/Index/components/AzulFileDownload/common/constants";
import { getDownloadLabel } from "../src/components/Index/components/AzulFileDownload/common/utils";

describe("getDownloadLabel", () => {
  it("should name the button 'Preparing download' while the location request is in flight", () => {
    expect(getDownloadLabel(true)).toBe(ARIA_LABEL.DOWNLOAD_PENDING);
  });

  it("should name the button 'Download file' when idle", () => {
    expect(getDownloadLabel(false)).toBe(ARIA_LABEL.DOWNLOAD);
  });
});
