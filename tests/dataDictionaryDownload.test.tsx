import { jest } from "@jest/globals";
import { ThemeProvider } from "@mui/material";
import { composeStories } from "@storybook/react";
import "@testing-library/jest-dom";
import { render, renderHook, screen } from "@testing-library/react";
import type { DataDictionaryConfig } from "../src/common/entities";

jest.unstable_mockModule("../src/hooks/useConfig", () => ({
  useConfig: jest.fn(),
}));

const { useConfig } = await import("../src/hooks/useConfig");
const { useDataDictionaryConfig } =
  await import("../src/components/DataDictionary/hooks/UseDataDictionaryConfig/hook");
const { Download } =
  await import("../src/components/DataDictionary/components/Filters/components/Download/download");
const stories =
  await import("../src/components/DataDictionary/components/Filters/stories/filters.stories");
const { DOWNLOAD } =
  await import("../src/components/DataDictionary/components/Filters/stories/constants");
const { createAppTheme } = await import("../src/theme/theme");

const { Default, WithDownload } = composeStories(stories);

const DATA_DICTIONARY_CONFIG: DataDictionaryConfig = {
  dataDictionary: { classes: [], name: "tier1", title: "Tier 1" },
  download: DOWNLOAD,
  path: "tier-1",
  tableOptions: { columns: [] },
};

/**
 * Stubs window.matchMedia (absent in jsdom) so every media query matches, as below 820px.
 * @returns Function restoring jsdom's missing matchMedia.
 */
function mockMatchMediaBelow820(): () => void {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: (query: string) => ({
      addEventListener: jest.fn(),
      addListener: jest.fn(),
      dispatchEvent: jest.fn(),
      matches: true,
      media: query,
      onchange: null,
      removeEventListener: jest.fn(),
      removeListener: jest.fn(),
    }),
    writable: true,
  });
  return () => {
    Reflect.deleteProperty(window, "matchMedia");
  };
}

describe("DataDictionaryDownload", () => {
  it("renders a download link with the configured href and label", () => {
    render(<WithDownload />);
    const linkEl = screen.getByRole("link", { name: DOWNLOAD.label });
    expect(linkEl).toHaveAttribute("href", DOWNLOAD.href);
    expect(linkEl).toHaveAttribute("download");
  });

  it("renders no download link without a download config", () => {
    render(<Default />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  describe("below 820px", () => {
    let restoreMatchMedia: () => void;

    beforeEach(() => {
      restoreMatchMedia = mockMatchMediaBelow820();
    });

    afterEach(() => {
      restoreMatchMedia();
    });

    it("renders an icon button link named by the label", () => {
      render(
        <ThemeProvider theme={createAppTheme()}>
          <Download download={DOWNLOAD} />
        </ThemeProvider>,
      );
      const linkEl = screen.getByRole("link", { name: DOWNLOAD.label });
      expect(linkEl).toHaveAttribute("href", DOWNLOAD.href);
      expect(linkEl).toHaveAttribute("download");
      expect(linkEl).not.toHaveTextContent(DOWNLOAD.label);
    });
  });

  describe("useDataDictionaryConfig", () => {
    it("returns the configured download link", () => {
      (useConfig as jest.Mock).mockReturnValue({
        config: { dataDictionaries: [DATA_DICTIONARY_CONFIG] },
      });
      const { result } = renderHook(() => useDataDictionaryConfig("tier-1"));
      expect(result.current.download).toEqual(DOWNLOAD);
    });
  });
});
