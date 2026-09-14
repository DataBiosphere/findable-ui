import { DrawerProps } from "@mui/material";
import { ReactNode } from "react";

export type DrawerContextProps = Omit<DrawerProps, "onClose"> & {
  /**
   * Per-instance DOM id for the drawer surface, so a trigger's `aria-controls`
   * can target it. Owned here because the trigger and the drawer are siblings
   * under this provider rather than nested, so neither can generate it alone.
   */
  id: string;
  onClose: () => void;
  onOpen: () => void;
  open: boolean;
};

export type DrawerProviderProps = {
  children: ReactNode | ((props: DrawerContextProps) => ReactNode);
};
