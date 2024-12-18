import { escapeRegExp } from "../../../common/utils";
import {
  FilterMenuSearchMatch,
  FilterMenuSearchMatchRange,
  FilterMenuSearchMatchStringFn,
  FilterMenuSearchSortMatchesFn,
} from "./entities";

/**
 * Get range of each substring matched by a regular expression
 * @param str - String to find matches in
 * @param regExp - Regular expression to match with
 * @returns array of match ranges
 */
function getRegExpMatchRanges(
  str: string,
  regExp: RegExp
): FilterMenuSearchMatchRange[] {
  return Array.from(str.matchAll(regExp), (match) => {
    const i = match.index as number; // type assertion to get around a TypeScript bug: https://github.com/microsoft/TypeScript/issues/36788
    return {
      end: i + match[0].length,
      start: i,
    };
  });
}

/**
 * Create a function that takes a string and matches it against a given search term, returning information about the match
 * @param searchTerm - Search term for the function to match strings against
 * @returns a function for matching, or null if the search term doesn't limit search results (namely, if it's empty string)
 */
function getMatchStringFn(
  searchTerm: string
): FilterMenuSearchMatchStringFn | null {
  if (!searchTerm) return null;
  const wordRegExps = searchTerm
    .split(/\s+/)
    .filter((w) => w)
    .map((w) => new RegExp(escapeRegExp(w), "ig"));
  const fullRegExp = new RegExp(escapeRegExp(searchTerm), "ig");
  return (str) => {
    let allMatch = true;
    const ranges: FilterMenuSearchMatchRange[] = [];
    for (const regExp of wordRegExps) {
      const wordRanges = getRegExpMatchRanges(str, regExp);
      if (!wordRanges.length) {
        allMatch = false;
        break;
      }
      ranges.push(...wordRanges);
    }
    const fullTermRanges = getRegExpMatchRanges(str, fullRegExp);
    ranges.push(...fullTermRanges);
    return allMatch ? { ranges, score: fullTermRanges.length ? 2 : 1 } : null;
  };
}

/**
 * Create a function that takes a SelectCategoryValueView array, and filters and sorts it according to a given search term, providing information about individual matches
 * @param searchTerm - Search term to apply to the SelectCategoryValueView array
 * @returns a function for searching SelectCategoryValueView arrays
 */
export function getSortMatchesFn(
  searchTerm: string
): FilterMenuSearchSortMatchesFn {
  const matchString = getMatchStringFn(searchTerm);
  if (!matchString) {
    return (values) => values.map((value) => ({ score: 0, value }));
  }
  return (values) => {
    const matches: FilterMenuSearchMatch[] = [];
    for (const value of values) {
      let match = matchString(value.label || "");
      if (match) {
        matches.push({ labelRanges: match.ranges, score: match.score, value });
      } else if (typeof value.key === "string") {
        match = matchString(value.key || "");
        if (match) matches.push({ score: match.score, value });
      }
    }
    return matches.sort(({ score: a }, { score: b }) => b - a);
  };
}
