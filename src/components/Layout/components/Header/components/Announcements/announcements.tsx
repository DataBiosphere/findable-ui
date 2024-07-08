import React from "react";
import { ComponentsConfig } from "../../../../../../config/entities";
import { ComponentCreator } from "../../../../../ComponentCreator/ComponentCreator";

export interface AnnouncementsProps {
  announcements?: ComponentsConfig;
}

export const Announcements = ({
  announcements,
}: AnnouncementsProps): JSX.Element | null => {
  if (!announcements) return null;
  return <ComponentCreator components={announcements} response={{}} />;
};
