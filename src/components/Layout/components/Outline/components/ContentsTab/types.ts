import { TabProps } from "@mui/material";
import { BaseComponentProps } from "../../../../../types";

/**
 * Props for the ContentsTab component.
 */
export interface ContentsTabProps
  extends BaseComponentProps, Omit<TabProps, "value"> {
  value: string;
}
