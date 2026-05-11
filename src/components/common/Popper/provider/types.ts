import { PopperProps } from "@mui/material";
import { MouseEvent, ReactNode } from "react";

export type PopperContextProps = Pick<PopperProps, "anchorEl" | "open"> & {
  onClose: () => void;
  onOpen: (e: MouseEvent<HTMLElement>) => void;
};

export type PopperProviderProps = {
  children: ReactNode | ((props: PopperContextProps) => ReactNode);
};
