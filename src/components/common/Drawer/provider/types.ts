import { DrawerProps } from "@mui/material";

export type DrawerContextProps = Omit<
  DrawerProps,
  "onClose" | "onOpen" | "open"
> & {
  onClose: () => void;
  onOpen: () => void;
  open: boolean;
};
