import { jest } from "@jest/globals";
import { act, render, screen } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { ComponentType } from "react";
import { formatA11yViolations, getA11yViolations } from "./utils/a11y";

// The header's sign-in button and the footer read the router.
const ROUTER = {
  asPath: "/",
  events: { emit: jest.fn(), off: jest.fn(), on: jest.fn() },
  isReady: true,
  pathname: "/",
  push: jest.fn(),
  query: {},
  replace: jest.fn(),
  route: "/",
};

jest.unstable_mockModule("next/router", () => ({
  ...jest.requireActual<typeof import("next/router")>("next/router"),
  useRouter: jest.fn(() => ROUTER),
}));

const { composeStories } = await import("@storybook/react");

const SRC_DIR = fileURLToPath(new URL("../src", import.meta.url));

// The detail and back page stories render whole pages, which axe takes several
// seconds over in jsdom, past Jest's 5s default under a full parallel run. A
// timed-out run keeps going and fails every later story with "Axe is already
// running".
const STORY_TIMEOUT_MS = 30000;

/**
 * Waits for stories whose content loads after the first render, keyed by story
 * id. Without one, axe would check the loading state and miss the content.
 */
const STORY_READY: Record<string, () => Promise<unknown>> = {
  // The chart's category labels, from the story's args, replace the Suspense
  // fallback once the code-split chart has loaded.
  "components/Index/components/EntityView/components/views/ChartView/stories/lazyChartView.stories.tsx#Default":
    () =>
      screen.findAllByText(/Biological Sex|Genus Species/, undefined, {
        timeout: 10000,
      }),
};

/**
 * Violations that predate this test, keyed by story id, as the number of nodes
 * failing each axe rule, tracked by epic #1065. The list only shrinks: a story
 * failing an unlisted rule fails, and so does a count that changes either way -
 * up is a regression, down is a fix to record here.
 */
const KNOWN_VIOLATIONS: Record<string, Record<string, number>> = {
  // The row position column has no header text (#1068).
  "components/Detail/components/Table/stories/table.stories.tsx#Default": {
    "empty-table-header": 1,
  },
  // The error detail sections are h3s directly under the page's h1 (#1069).
  "components/Error/error.stories.tsx#ClientSideErrorWithErrorCodeStory": {
    "heading-order": 1,
  },
  // Each item is a role="button" holding an unlabelled checkbox, directly in a
  // <ul> (#1066).
  "components/Filter/components/FilterMenu/filterMenu.stories.tsx#FilterMenuStory":
    { label: 15, list: 1, "nested-interactive": 15 },
  // Observable Plot sets aria-label on each mark's <g>, which has no role
  // (#1067).
  "components/Index/components/EntityView/components/views/ChartView/components/Chart/stories/chart.stories.tsx#Default":
    { "aria-prohibited-attr": 2 },
  "components/Index/components/EntityView/components/views/ChartView/components/Chart/stories/chart.stories.tsx#Selected":
    { "aria-prohibited-attr": 2 },
  "components/Index/components/EntityView/components/views/ChartView/stories/chartView.stories.tsx#Default":
    { "aria-prohibited-attr": 4 },
  "components/Index/components/EntityView/components/views/ChartView/stories/lazyChartView.stories.tsx#Default":
    { "aria-prohibited-attr": 4 },
};

// jsdom does no layout, so it lacks these: the assistant's message list scrolls,
// and the chart measures its labels in a requestAnimationFrame callback. jsdom
// has no SVGTextElement, so the measuring methods go on SVGElement.
Element.prototype.scrollTo = (): void => undefined;
// Without IntersectionObserver, next/link marks itself visible on an idle timer,
// a state update outside act; an observer that never fires leaves it alone.
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
  unobserve: jest.fn(),
})) as unknown as typeof IntersectionObserver;
Object.assign(SVGElement.prototype, {
  getBBox: (): DOMRect => ({ height: 0, width: 0, x: 0, y: 0 }) as DOMRect,
  getCTM: (): DOMMatrix | null => null,
});

// Matches the story globs in .storybook/main.ts.
const STORY_FILE = /\.stories\.(js|jsx|mjs|ts|tsx)$/;

/**
 * Finds every story file under a directory.
 * @param dir - Directory to search.
 * @returns Story file paths, relative to the directory, with "/" separators so
 * they match the story ids keyed below on any platform.
 */
function findStoryFiles(dir: string): string[] {
  return fs
    .readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && STORY_FILE.test(entry.name))
    .map((entry) =>
      path
        .relative(dir, path.join(entry.parentPath, entry.name))
        .split(path.sep)
        .join("/"),
    )
    .sort();
}

const STORIES: { Story: ComponentType; id: string }[] = [];

// Imported one at a time: concurrent imports race in Jest's ESM module linker.
for (const file of findStoryFiles(SRC_DIR)) {
  // A file URL, as import() reads a bare Windows path as a "c:" URL scheme.
  const stories = composeStories(
    await import(pathToFileURL(path.join(SRC_DIR, file)).href),
  );
  for (const [name, Story] of Object.entries(stories)) {
    STORIES.push({ Story: Story as ComponentType, id: `${file}#${name}` });
  }
}

describe("stories", () => {
  // A timed-out story's axe run keeps going; awaiting it here confines the
  // failure to that story instead of failing every later one with "Axe is
  // already running".
  let axeRun: Promise<unknown> | undefined;

  afterEach(async () => {
    await axeRun?.catch(() => undefined);
    axeRun = undefined;
  }, STORY_TIMEOUT_MS);

  it.each(STORIES)(
    "$id should have no a11y violations",
    async ({ id, Story }) => {
      // Lets async content (e.g. MarkdownRenderer) settle inside act before
      // axe reads the DOM.
      await act(async () => {
        render(<Story />);
        await new Promise((resolve) => setTimeout(resolve, 0));
      });
      await STORY_READY[id]?.();
      const run = getA11yViolations(document.body);
      axeRun = run;
      const violations = await run;
      const known = KNOWN_VIOLATIONS[id] ?? {};

      expect(
        formatA11yViolations(violations.filter((v) => !(v.id in known))),
      ).toEqual([]);

      // A changed count is a regression (up) or a fix to record in
      // KNOWN_VIOLATIONS (down).
      expect(
        Object.fromEntries(
          Object.keys(known).map((rule) => [
            rule,
            violations.find((v) => v.id === rule)?.nodes.length ?? 0,
          ]),
        ),
      ).toEqual(known);
    },
    STORY_TIMEOUT_MS,
  );

  it("should list known violations only for stories that exist", () => {
    const ids = new Set(STORIES.map(({ id }) => id));
    expect(Object.keys(KNOWN_VIOLATIONS).filter((id) => !ids.has(id))).toEqual(
      [],
    );
  });
});
