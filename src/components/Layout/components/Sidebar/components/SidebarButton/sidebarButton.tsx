import { FilterListRounded } from "@mui/icons-material";
import { JSX, ReactNode } from "react";
import { Badge, SidebarButton as Button } from "./sidebarButton.styles";

/**
 * Props for the SidebarButton component.
 */
export interface SidebarButtonProps {
  className?: string;
  count: number;
  label: ReactNode;
  onClick: () => void;
}

/**
 * Sidebar button, rendering a filter icon, the label and, when the count is greater than 0, a count badge.
 * @param props - Component props.
 * @param props.className - Class name applied to the button.
 * @param props.count - Count shown in the badge.
 * @param props.label - Button label.
 * @param props.onClick - Function invoked when the button is clicked.
 * @returns The sidebar button.
 */
export const SidebarButton = ({
  className,
  count,
  label,
  onClick,
  ...props
}: SidebarButtonProps): JSX.Element => {
  return (
    <Button className={className} onClick={onClick} {...props}>
      <FilterListRounded fontSize="small" />
      {label}
      {count > 0 && <Badge>{count}</Badge>}
    </Button>
  );
};
