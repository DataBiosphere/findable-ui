import { ReactNode } from "react";

export type CollapseContextProps = {
  isIn: boolean;
  onChange: () => void;
};

export type CollapseProviderProps = {
  children: ReactNode | ((props: CollapseContextProps) => ReactNode);
  initialState?: boolean;
};
