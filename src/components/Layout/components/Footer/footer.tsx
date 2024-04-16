import { Toolbar } from "@mui/material";
import React, { ReactNode } from "react";
import { IconButtonSocialsFooter } from "../../../common/IconButton/iconButton.styles";
import { Social } from "../../../common/Socials/socials";
import { ANCHOR_TARGET } from "../../../Links/common/entities";
import { NavLinkItem } from "../Header/components/Content/components/Navigation/navigation";
import { AppBar, Link, Links, Socials } from "./footer.styles";

export interface FooterProps {
  Branding: ReactNode;
  className?: string;
  navLinks?: NavLinkItem[];
  socials?: Social[];
}

export const Footer = ({
  Branding,
  className,
  navLinks,
  socials,
}: FooterProps): JSX.Element => {
  return (
    <AppBar
      className={className}
      color="inherit"
      component="footer"
      variant="footer"
    >
      <Toolbar variant="dense">
        {Branding}
        {(navLinks || socials) && (
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
            {socials && (
              <Socials
                buttonSize="small"
                IconButtonElType={IconButtonSocialsFooter}
                socials={socials}
              />
            )}
          </Links>
        )}
      </Toolbar>
    </AppBar>
  );
};
