/**
 * @jest-environment node
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Next's SWC Emotion plugin (`compiler.emotion`) minifies CSS templates and
// drops whitespace before a pseudo, so `& :is(a)` becomes `&:is(a)` and the rule
// moves from the descendants onto the element itself. A combinator or an
// explicit `*` (`& *:is(a)`) survives. Prettier always puts a space after a
// TypeScript colon, so whitespace followed directly by `:` and a pseudo name only
// occurs in a CSS selector.
const COLLAPSING_SELECTOR = /[^\s,>+~(]\s+::?[a-zA-Z-]/;

const COMMENT_LINE = /^\s*(\/\/|\/\*|\*)/;

const SOURCE_FILE = /\.tsx?$/;

const SRC_DIR = fileURLToPath(new URL("../src", import.meta.url));

/**
 * Finds every source line holding a selector the minifier would collapse.
 * @param dir - Directory to search.
 * @returns Matches as "path:line: text", with the path relative to the directory.
 */
function findCollapsingSelectors(dir: string): string[] {
  return fs
    .readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && SOURCE_FILE.test(entry.name))
    .flatMap((entry) => {
      const filePath = path.join(entry.parentPath, entry.name);
      const relativePath = path.relative(dir, filePath);
      return fs
        .readFileSync(filePath, "utf8")
        .split("\n")
        .map((line, i) => ({ line, lineNumber: i + 1 }))
        .filter(({ line }) => isCollapsingSelector(line))
        .map(
          ({ line, lineNumber }) =>
            `${relativePath}:${lineNumber}: ${line.trim()}`,
        );
    });
}

/**
 * Returns whether the line holds a selector the minifier would collapse.
 * @param line - Source line.
 * @returns True if the line has whitespace directly before a pseudo, outside a comment.
 */
function isCollapsingSelector(line: string): boolean {
  return !COMMENT_LINE.test(line) && COLLAPSING_SELECTOR.test(line);
}

describe("Emotion minified selector", () => {
  it.each([
    "  & :is(a, button) {",
    "  & :where(a) {",
    "  && ::placeholder {",
    "  &&.Mui-focused ::placeholder {",
    "  .MuiInput-root :hover {",
    "  && ::-webkit-input-placeholder {",
  ])("should flag %j", (line) => {
    expect(isCollapsingSelector(line)).toBe(true);
  });

  it.each([
    "  & *:is(a, button) {",
    "  && *::placeholder {",
    "  > :last-child {",
    "  &:has(.MuiTableContainer-root) > :last-child {",
    "  &:hover {",
    "  a, :focus {",
    " * The space in `& :is(…)` is dropped.",
    "  const value = isOpen ? first : second;",
  ])("should not flag %j", (line) => {
    expect(isCollapsingSelector(line)).toBe(false);
  });

  it("should find no collapsing selector in src", () => {
    expect(findCollapsingSelectors(SRC_DIR)).toEqual([]);
  });
});
