import Link from "next/link";
import { ElementType } from "react";
import { isValidUrl } from "../../../../../../common/utils";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "../../../../../Links/common/entities";
import {
  assertAnchorRelAttribute,
  assertAnchorTargetAttribute,
} from "../../../../../common/Link/typeGuards";

/**
 * Returns the component to use for a link based on the given href and client-side navigation flag.
 * @param href - The href attribute to use.
 * @param isClientSide - Whether the link is a client-side navigation.
 * @returns The component to use for the link.
 */
export function getComponent(href: string, isClientSide: boolean): ElementType {
  if (isClientSide) return Link; // Use Next/Link for client-side navigation.
  if (isValidUrl(href)) return "a"; // Use anchor tag for external links.
  return "span"; // Use span for invalid links.
}

/**
 * Returns the rel attribute for a link based on the given rel and client-side navigation flag.
 * @param rel - The rel attribute to use.
 * @param isClientSideNavigation - Whether the link is a client-side navigation.
 * @returns The rel attribute for the link.
 */
export function getRelAttribute(
  rel: string | undefined,
  isClientSideNavigation: boolean,
): string {
  if (rel) {
    assertAnchorRelAttribute(rel);
    return rel;
  }
  return isClientSideNavigation
    ? REL_ATTRIBUTE.NO_OPENER
    : REL_ATTRIBUTE.NO_OPENER_NO_REFERRER;
}

/**
 * Returns the target attribute for a link based on the given target and client-side navigation flag.
 * @param target - The target attribute to use.
 * @param isClientSideNavigation - Whether the link is a client-side navigation.
 * @returns The target attribute for the link.
 */
export function getTargetAttribute(
  target: string | undefined,
  isClientSideNavigation: boolean,
): string {
  if (target) {
    assertAnchorTargetAttribute(target);
    return target;
  }
  return isClientSideNavigation ? ANCHOR_TARGET.SELF : ANCHOR_TARGET.BLANK;
}
