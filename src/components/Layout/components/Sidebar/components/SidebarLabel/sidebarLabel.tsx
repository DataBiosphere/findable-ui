import { Typography } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";

/**
 * Props for the SidebarLabel component.
 */
export interface SidebarLabelProps {
  label: string;
}

/**
 * Sidebar label, rendered in the "body-large-500" typography variant.
 * @param props - Component props.
 * @param props.label - Label text.
 * @returns The sidebar label.
 */
export const SidebarLabel = ({ label }: SidebarLabelProps): JSX.Element => {
  return (
    <Typography
      component="div"
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_500}
    >
      {label}
    </Typography>
  );
};
