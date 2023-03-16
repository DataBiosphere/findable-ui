import { AppBar, Link, Toolbar } from "@mui/material";
import NLink from "next/link";
import React from "react";
import { IconButtonSocialsFooter } from "../../../common/IconButton/iconButton.styles";
import { Social, Socials } from "../../../common/Socials/socials";
import { Stack } from "../../../common/Stack/stack";
import { Logo, LogoProps } from "../Header/components/Logo/logo";
import { NavLinkItem } from "../Header/components/NavLinks/navLinks";

export interface FooterProps {
  feedbackForm?: boolean;
  logos: LogoProps[];
  navLinks: NavLinkItem[];
  socials: Social[];
}

export const Footer = ({
  feedbackForm,
  logos,
  navLinks,
  socials,
}: FooterProps): JSX.Element => {
  return (
    <AppBar component="footer" color="inherit" variant="footer">
      <Toolbar
        sx={{ gap: 4, justifyContent: "space-between", minHeight: 56 }}
        variant="dense"
      >
        <Stack alignItems="center" direction="row" gap={6}>
          {logos.map(({ alt, height, link, src, width }, l) => (
            <Logo
              key={`${link}${l}`}
              alt={alt}
              height={height}
              link={link}
              src={src}
              width={width}
            />
          ))}
        </Stack>
        <Stack alignItems="stretch" direction="row" gap={6}>
          {navLinks.map(({ label, url }) => (
            <NLink key={label} href={url} passHref>
              <Link
                alignItems="center"
                color="ink.main"
                display="flex"
                variant="text-body-small-400"
              >
                {label}
              </Link>
            </NLink>
          ))}
          {feedbackForm && <>{/* TODO feedback form */}</>}
          <Socials
            buttonSize="small"
            IconButtonElType={IconButtonSocialsFooter}
            socials={socials}
            sx={{ gap: 2 }}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
