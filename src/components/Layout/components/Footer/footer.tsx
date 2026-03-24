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

export interface FooterProps {
  Branding?: ReactNode;
  className?: string;
  navLinks?: NavLinkItem[];
  poweredByCC?: Omit<StaticImageProps, "alt"> & { alt?: string };
  socials?: Social[];
  versionInfo?: ReactNode;
}

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
