import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import React, { ReactNode } from "react";
import { List, NavBar } from "./nav.styles";

export interface NavItem {
  active?: boolean;
  label: string;
  url?: string;
}

export interface NavProps {
  Hero?: ReactNode;
  navigation: NavItem[];
}

export const Nav = ({ Hero, navigation }: NavProps): JSX.Element => {
  return (
    <NavBar>
      {Hero}
      <List>
        {navigation.map(({ active, label, url }, i) => {
          return (
            <ListItem key={`${label}${i}`}>
              <Link href={url ?? ""} legacyBehavior passHref>
                <ListItemButton disabled={!url} selected={active}>
                  <ListItemText disableTypography primary={label} />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </NavBar>
  );
};
