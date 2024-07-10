import { ReactNode } from "react";
import { Social } from "../../../../common/Socials/socials";
import { NavLinkItem } from "../components/Content/components/Navigation/navigation";

export type Navigation = [
  NavLinkItem[] | undefined,
  NavLinkItem[] | undefined,
  NavLinkItem[] | undefined
]; // [LEFT, CENTER, RIGHT]

export interface SocialMedia {
  label: ReactNode;
  socials: Social[];
}
