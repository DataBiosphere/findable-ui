import { ColumnSort } from "@tanstack/react-table";
import Link from "next/link";
import React, { useCallback } from "react";
import { UrlObject } from "url";
import { SelectedFilter } from "../../../../../../common/entities";
import { useExploreState } from "../../../../../../hooks/useExploreState";
import {
  ExploreActionKind,
  ExploreState,
} from "../../../../../../providers/exploreState";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
  UrlObjectWithHrefAndQuery,
} from "../../../../common/entities";
import { LinkProps } from "../../link";

const PARAM_FILTER = "filter";
const PARAM_SORTING = "sorting";

export interface ExploreViewLinkProps
  extends Omit<LinkProps, "copyable" | "noWrap" | "TypographyProps" | "url"> {
  url: UrlObjectWithHrefAndQuery;
}

export const ExploreViewLink = ({
  className,
  label,
  onClick,
  target = ANCHOR_TARGET.SELF,
  url,
}: ExploreViewLinkProps): JSX.Element => {
  const { exploreDispatch, exploreState } = useExploreState();

  if (!isValidExploreURL(url, exploreState)) {
    throwError(url);
  }

  const onNavigate = useCallback(() => {
    const entityListType = getEntityListType(url.href);
    const filters = getSelectedFilters(url.query);
    const sorting = getSorting(url.query);
    exploreDispatch({
      payload: { entityListType, filters, sorting },
      type: ExploreActionKind.UpdateEntityFilters,
    });
    onClick?.();
  }, [exploreDispatch, onClick, url]);

  return (
    <Link
      className={className}
      href={url.href}
      onClick={onNavigate}
      rel={REL_ATTRIBUTE.NO_OPENER}
      target={target}
    >
      {label}
    </Link>
  );
};

/**
 * Returns the entity list type "entityListType" inferred from the given href.
 * @param href - Href.
 * @returns entity list type.
 */
function getEntityListType(href: UrlObjectWithHrefAndQuery["href"]): string {
  return href.substring(href.lastIndexOf("/") + 1);
}

/**
 * Returns the selected filters from the given query.
 * @param query - Query.
 * @returns selected filters.
 */
function getSelectedFilters(
  query: UrlObjectWithHrefAndQuery["query"]
): SelectedFilter[] {
  const decodedQuery = decodeURIComponent(query);
  const parsedQuery = JSON.parse(decodedQuery);
  return parsedQuery[PARAM_FILTER];
}

/**
 * Returns the sorting from the given query.
 * @param query - Query.
 * @returns sorting.
 */
function getSorting(
  query: UrlObjectWithHrefAndQuery["query"]
): ColumnSort[] | undefined {
  const decodedQuery = decodeURIComponent(query);
  const parsedQuery = JSON.parse(decodedQuery);
  return parsedQuery[PARAM_SORTING];
}

/**
 * Returns true if the given value is a SelectedFilter.
 * @param value - Value.
 * @returns true if the given value is a SelectedFilter.
 */
function isSelectedFilter(value: unknown): value is SelectedFilter {
  return (
    typeof value === "object" &&
    value !== null &&
    "categoryKey" in value &&
    "value" in value
  );
}

/**
 * Returns true if the given query string is a valid JSON string.
 * @param query - Query string.
 * @returns true if the given query string is a valid JSON string.
 */
function isValidJsonString(query: string): boolean {
  try {
    JSON.parse(query);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Returns true if the given explore link is valid.
 * @param url - Explore link URL.
 * @param exploreState - Explore state.
 * @returns true if the given explore link is valid.
 */
function isValidExploreURL(
  url: UrlObjectWithHrefAndQuery,
  exploreState: ExploreState
): boolean {
  const validHref = isValidHref(url, exploreState);
  const validQuery = isValidQuery(url);
  return validHref && validQuery;
}

/**
 * Returns true if the given href is a path ending with a configured key in the explore state's entityPageState.
 * @param url - Explore link URL.
 * @param exploreState - Explore state.
 * @returns true if the given href is configured in the explore state.
 */
function isValidHref(
  url: UrlObjectWithHrefAndQuery,
  exploreState: ExploreState
): boolean {
  const { entityPageState } = exploreState;
  const { href } = url;
  return (
    href.startsWith("/") &&
    href.substring(href.lastIndexOf("/") + 1) in entityPageState
  );
}

/**
 * Returns true if the given explore query is valid.
 * @param url - Explore link URL.
 * @returns true if the given explore query is valid.
 */
function isValidQuery(url: UrlObjectWithHrefAndQuery): boolean {
  const { query } = url;
  // Decode and parse the query.
  const decodedQuery = decodeURIComponent(query);
  // Query should be a valid JSON string.
  if (isValidJsonString(decodedQuery)) {
    const parsedQuery = JSON.parse(decodedQuery);
    // Query should contain "filter" key.
    if (PARAM_FILTER in parsedQuery) {
      const filters = parsedQuery[PARAM_FILTER];
      // Filter should be an array.
      if (Array.isArray(filters)) {
        // Filter should contain only SelectedFilter objects.
        return filters.every(isSelectedFilter);
      }
    }
  }
  return false;
}

/**
 * Throws an error with the given URL object.
 * @param url - URL object.
 */
function throwError(url: UrlObject): never {
  throw new Error(
    `Invalid explore URL href or query: ${url.href}, ${url.query}`
  );
}
