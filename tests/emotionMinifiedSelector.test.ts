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

// Loading Next's native SWC bindings can take a few seconds on a cold start.
const SWC_TIMEOUT_MS = 30000;

const SOURCE_FILE = /\.tsx?$/;

const SRC_DIR = fileURLToPath(new URL("../src", import.meta.url));

const PINNED_MIXIN = path.join(SRC_DIR, "styles/common/mixins/pinned.ts");

/**
 * Compiles a source file the way a Next consumer with `compiler.emotion` does.
 * @param filePath - Source file to compile.
 * @returns Compiled code, with each Emotion template minified.
 */
async function compileWithNextEmotion(filePath: string): Promise<string> {
  // Stops loadBindings rewriting package-lock.json when it lacks an SWC binary.
  process.env.NEXT_IGNORE_INCORRECT_LOCKFILE = "1";
  const swc = await import("next/dist/build/swc/index.js");
  await swc.loadBindings();
  const { code } = await swc.transform(fs.readFileSync(filePath, "utf8"), {
    emotion: { enabled: true },
    filename: filePath,
    jsc: { parser: { syntax: "typescript" } },
  });
  return code;
}

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

  it(
    "should keep pinnedFocus a descendant selector through Next's SWC Emotion transform",
    async () => {
      expect(await compileWithNextEmotion(PINNED_MIXIN)).toContain(
        "& *:is(a,button,input,select,textarea,[tabindex])",
      );
    },
    SWC_TIMEOUT_MS,
  );
});
