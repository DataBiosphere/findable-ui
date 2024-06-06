import Link from "next/link";
import React, { useCallback } from "react";
import { UrlObject } from "url";
import { SelectedFilter } from "../../../../../../common/entities";
import { useExploreState } from "../../../../../../hooks/useExploreState";
import {
  ExploreActionKind,
  ExploreState,
} from "../../../../../../providers/exploreState";
import { ANCHOR_TARGET } from "../../../../common/entities";
import { LinkProps } from "../../link";

const PARAM_FILTER = "filter";

export interface ExploreViewLinkProps
  extends Omit<LinkProps, "copyable" | "noWrap" | "url"> {
  url: UrlObject;
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
    exploreDispatch({
      payload: { entityListType, filters },
      type: ExploreActionKind.UpdateEntityFilters,
    });
    onClick?.();
  }, [exploreDispatch, onClick, url]);

  return (
    <Link
      className={className}
      href={url.href ?? ""}
      onClick={onNavigate}
      rel="noopener"
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
function getEntityListType(href: UrlObject["href"]): string {
  // href should not be empty (href is expected to be a string; isValidExploreURL acts as a guard).
  if (!href) throwError({ href, query: "" });
  return href.substring(1);
}

/**
 * Returns the selected filters from the given query.
 * @param query - Query.
 * @returns selected filters.
 */
function getSelectedFilters(query: UrlObject["query"]): SelectedFilter[] {
  // Query should not be empty (query is expected to be a string; isValidExploreURL acts as a guard).
  if (typeof query !== "string") throwError({ href: "", query });
  const decodedQuery = decodeURIComponent(query);
  const parsedQuery = JSON.parse(decodedQuery);
  return parsedQuery[PARAM_FILTER];
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
 * Returns true if the given explore link is valid.
 * @param url - Explore link URL.
 * @param exploreState - Explore state.
 * @returns true if the given explore link is valid.
 */
function isValidExploreURL(
  url: UrlObject,
  exploreState: ExploreState
): boolean {
  const validHref = isValidHref(url, exploreState);
  const validQuery = isValidQuery(url);
  return validHref && validQuery;
}

/**
 * Returns true if the given href is a configured key in the explore state's entityPageState.
 * @param url - Explore link URL.
 * @param exploreState - Explore state.
 * @returns true if the given href is configured in the explore state.
 */
function isValidHref(url: UrlObject, exploreState: ExploreState): boolean {
  const { entityPageState } = exploreState;
  const { href } = url;
  return !!href && href.startsWith("/") && href.substring(1) in entityPageState;
}

/**
 * Returns true if the given explore query is valid.
 * @param url - Explore link URL.
 * @returns true if the given explore query is valid.
 */
function isValidQuery(url: UrlObject): boolean {
  const { query } = url;
  // Query should not be empty.
  if (!query) return false;
  // Query should not be typed as ParsedUrlQueryInput.
  if (typeof query !== "string") return false;
  // Decode and parse the query.
  const decodedQuery = decodeURIComponent(query);
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
