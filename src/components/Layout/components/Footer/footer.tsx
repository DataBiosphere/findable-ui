import { Toolbar } from "@mui/material";
import { JSX, ReactNode } from "react";
import { SELECTOR } from "../../../../common/selectors";
import { useLayoutDimensions } from "../../../../providers/layoutDimensions/hook";
import { Social } from "../../../common/Socials/socials";
import { StaticImageProps } from "../../../common/StaticImage/staticImage";
import { ANCHOR_TARGET } from "../../../Links/common/entities";
import { isNodeBoolean } from "../../../utils";
import { NavLinkItem } from "../Header/components/Content/components/Navigation/navigation";
import { PoweredByCleverCanary } from "./components/PoweredByCleverCanary/poweredByCleverCanary";
import { VersionInfo } from "./components/VersionInfo/versionInfo";
import { AppBar, Link, Links, Socials } from "./footer.styles";

/**
 * Props for the Footer component.
 */
export interface FooterProps {
  Branding?: ReactNode;
  className?: string;
  navLinks?: NavLinkItem[];
  poweredByCC?: Omit<StaticImageProps, "alt"> & { alt?: string };
  socials?: Social[];
  versionInfo?: ReactNode;
}

/**
 * Site footer, rendering the branding followed by the nav links, socials, version info and Powered by CleverCanary logo.
 * The links section renders only when nav links, socials, version info or Powered by CleverCanary props are given.
 * @param props - Component props.
 * @param props.Branding - Branding, rendered first.
 * @param props.className - Class name applied to the footer.
 * @param props.navLinks - Nav links; each link's target defaults to the same tab.
 * @param props.poweredByCC - Powered by CleverCanary logo props; the logo renders only when a src is given.
 * @param props.socials - Social links.
 * @param props.versionInfo - Version info; a boolean renders the default VersionInfo component, any other value renders as given.
 * @returns The footer.
 */
export const Footer = ({
  Branding,
  className,
  navLinks,
  poweredByCC,
  socials,
  versionInfo,
}: FooterProps): JSX.Element => {
  const { footerRef } = useLayoutDimensions();
  return (
    <AppBar
      className={className}
      color="inherit"
      component="footer"
      id={SELECTOR.FOOTER}
      ref={footerRef}
      variant="footer"
    >
      <Toolbar variant="dense">
        {Branding}
        {(navLinks || socials || versionInfo || poweredByCC) && (
          <Links>
            {navLinks &&
              navLinks.map(({ label, target = ANCHOR_TARGET.SELF, url }, i) => (
                <Link
                  key={`${url}${i}`}
                  label={label}
                  target={target}
                  url={url}
                />
              ))}
            {socials && <Socials buttonSize="small" socials={socials} />}
            {isNodeBoolean(versionInfo) ? <VersionInfo /> : versionInfo}
            <PoweredByCleverCanary {...poweredByCC} />
          </Links>
        )}
      </Toolbar>
    </AppBar>
  );
};
