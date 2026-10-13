import { JSX } from "react";
import { ComponentsConfig } from "../../../../../../config/entities";
import { ComponentCreator } from "../../../../../ComponentCreator/ComponentCreator";

/**
 * Props for the Announcements component.
 */
export interface AnnouncementsProps {
  announcements?: ComponentsConfig;
}

/**
 * Renders the configured header announcements.
 * @param props - Component props.
 * @param props.announcements - Announcements components config.
 * @returns The announcements, or null when there are none.
 */
export const Announcements = ({
  announcements,
}: AnnouncementsProps): JSX.Element | null => {
  if (!announcements) return null;
  return <ComponentCreator components={announcements} response={{}} />;
};
