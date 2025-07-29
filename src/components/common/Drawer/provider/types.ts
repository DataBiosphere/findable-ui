import { DrawerProps } from "@mui/material";
import { ReactNode } from "react";

export type DrawerContextProps = Omit<DrawerProps, "onClose"> & {
  onClose: () => void;
  onOpen: () => void;
  open: boolean;
};

export type DrawerProviderProps = {
  children: ReactNode | ((props: DrawerContextProps) => ReactNode);
};
