import { Toolbar } from "@mui/material";
import React, { ReactNode } from "react";
import { SELECTOR } from "../../../../common/selectors";
import { Social } from "../../../common/Socials/socials";
import { ANCHOR_TARGET } from "../../../Links/common/entities";
import { isNodeBoolean } from "../../../utils";
import { NavLinkItem } from "../Header/components/Content/components/Navigation/navigation";
import { VersionInfo } from "./components/VersionInfo/versionInfo";
import { AppBar, Link, Links, Socials } from "./footer.styles";

export interface FooterProps {
  Branding?: ReactNode;
  className?: string;
  navLinks?: NavLinkItem[];
  socials?: Social[];
  versionInfo?: ReactNode;
}

export const Footer = ({
  Branding,
  className,
  navLinks,
  socials,
  versionInfo,
}: FooterProps): JSX.Element => {
  return (
    <AppBar
      className={className}
      color="inherit"
      component="footer"
      id={SELECTOR.FOOTER}
      variant="footer"
    >
      <Toolbar variant="dense">
        {Branding}
        {(navLinks || socials || versionInfo) && (
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
          </Links>
        )}
      </Toolbar>
    </AppBar>
  );
};
