import { FilterListRounded } from "@mui/icons-material";
import { JSX, ReactNode } from "react";
import { Badge, SidebarButton as Button } from "./sidebarButton.styles";

export interface SidebarButtonProps {
  className?: string;
  count: number;
  label: ReactNode;
  onClick: () => void;
}

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
