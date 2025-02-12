import { TooltipProps as MTooltipProps } from "@mui/material";
import { ReactNode } from "react";

// `children` is defined as a `ReactNode` instead of an `Element`
// because the Data Dictionary `Tooltip` component wraps its child in a `span` element.
// This ensures that `children` can hold a ref properly (see https://mui.com/material-ui/api/tooltip/#props).

export type TooltipProps = Omit<MTooltipProps, "children"> & {
  children: ReactNode;
};
