import { Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { ELEMENT_ALIGNMENT } from "../../../../../../common/entities";
import { MenuItem, NavLinkMenu } from "../NavLinkMenu/navLinkMenu";

export type NavAlignment = Exclude<ELEMENT_ALIGNMENT, ELEMENT_ALIGNMENT.RIGHT>;

export interface NavLinkItem {
  label: string;
  menuItems?: MenuItem[];
  url: string;
}

export interface NavLinksProps {
  center?: boolean;
  links: NavLinkItem[];
}

export const NavLinks = ({
  center = false,
  links,
}: NavLinksProps): JSX.Element => {
  return (
    <Box
      display="flex"
      flex={1}
      flexDirection={{ md: "row", xs: "column" }}
      gap={2}
      justifyContent={{
        md: center ? "center" : "flex-start",
        xs: undefined,
      }}
      marginLeft={{ md: center ? undefined : 6, xs: undefined }}
    >
      {links.map(({ label, menuItems, url }) =>
        menuItems ? (
          <NavLinkMenu key={label} menuItems={menuItems} menuLabel={label} />
        ) : (
          <Link key={url} href={url} passHref>
            <Button
              href="passHref"
              sx={{
                justifyContent: { md: "unset", xs: "flex-start" },
              }}
              variant="nav"
            >
              {label}
            </Button>
          </Link>
        )
      )}
    </Box>
  );
};
