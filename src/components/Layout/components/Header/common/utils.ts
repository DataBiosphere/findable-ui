import { Social } from "../../../../common/Socials/socials";
import { RenderComponent } from "../../../../ComponentCreator/components/RenderComponent/renderComponent";
import { ANCHOR_TARGET } from "../../../../Links/common/entities";
import { MenuItem } from "../components/Content/components/Navigation/components/NavigationMenuItems/navigationMenuItems";
import { NavLinkItem } from "../components/Content/components/Navigation/navigation";
import { HEADER_NAVIGATION_LABEL } from "./constants";
import { SocialMedia } from "./entities";

/**
 * Returns the navigation links as configured, where the "More" menu is flattened.
 * @param links - Header navigation links.
 * @returns header navigation links, without links grouped under the "More" menu.
 */
export function flattenMoreLink(links: NavLinkItem[]): NavLinkItem[] {
  return links.flatMap((link: NavLinkItem) => {
    if (link.label === HEADER_NAVIGATION_LABEL.MORE) {
      if (link.flatten === false) {
        return link;
      }
      return link.menuItems as NavLinkItem[];
    }
    return link;
  });
}

/**
 * Returns the navigation links as configured, all menu links specified as "flatten" are flattened, including the "More" menu.
 * @param links - Header navigation links.
 * @returns header navigation links.
 */
export function flattenNavigationLinks(links: NavLinkItem[]): NavLinkItem[] {
  return links.flatMap((link: NavLinkItem) => {
    if (link.flatten || link.label === HEADER_NAVIGATION_LABEL.MORE) {
      return link.menuItems as NavLinkItem[];
    }
    return link;
  });
}

/**
 * Returns header navigation links with socials appended with the corresponding label "Follow Us".
 * @param links - Header navigation links.
 * @param socialMedia - Header social media.
 * @param onlySmDesktop - Media breakpoint query is "true" for small desktop only.
 * @returns header navigation links.
 */
export function getHeaderNavigationLinks(
  links: NavLinkItem[],
  socialMedia: SocialMedia | undefined,
  onlySmDesktop: boolean
): NavLinkItem[] {
  if (onlySmDesktop) {
    const navLinks = [...links];
    if (socialMedia) {
      navLinks.push({
        label: socialMedia.label,
        menuItems: getFollowUsMenuItems(socialMedia.socials),
        url: "",
      });
    }
    return navLinks;
  }
  // Return the links without the "More" or "Follow Us" menu.
  return flattenMoreLink(links);
}

/**
 * Returns menu items for the "Follow Us" menu.
 * @param socials - Social configuration.
 * @returns a list of social menu items for the "Follow Us" menu.
 */
function getFollowUsMenuItems(socials: Social[]): MenuItem[] {
  return socials.map(({ Icon, label, url }) => {
    return {
      icon: RenderComponent({
        Component: Icon,
        ...{ fontSize: "small" },
      }),
      label,
      target: ANCHOR_TARGET.BLANK,
      url,
    };
  });
}
