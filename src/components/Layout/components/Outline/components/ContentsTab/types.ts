import { TabProps } from "@mui/material";
import { BaseComponentProps } from "../../../../../types";

export interface ContentsTabProps
  extends BaseComponentProps,
    Omit<TabProps, "value"> {
  value: string;
}
