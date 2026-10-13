import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import { JSX, ReactNode } from "react";
import { List, NavBar } from "./nav.styles";

/**
 * A nav bar item.
 */
export interface NavItem {
  active?: boolean;
  label: string;
  url?: string;
}

/**
 * Props for the Nav component.
 */
export interface NavProps {
  Hero?: ReactNode;
  navigation: NavItem[];
}

/**
 * Nav bar, rendering the hero above a list of nav items. Each item links to its URL using client-side navigation, and is disabled when it has no URL.
 * @param props - Component props.
 * @param props.Hero - Hero rendered above the nav items.
 * @param props.navigation - Nav items.
 * @returns The nav bar.
 */
export const Nav = ({ Hero, navigation }: NavProps): JSX.Element => {
  return (
    <NavBar>
      {Hero}
      <List>
        {navigation.map(({ active, label, url }, i) => {
          return (
            <ListItem key={`${label}${i}`}>
              <ListItemButton
                component={Link}
                disabled={!url}
                href={url ?? ""}
                selected={active}
              >
                <ListItemText disableTypography primary={label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </NavBar>
  );
};
