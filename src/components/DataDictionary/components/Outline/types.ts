import { TabsProps } from "@mui/material";
import { OutlineItem } from "../../../Layout/components/Outline/types";

/**
 * Props for the Outline component.
 */
export interface OutlineProps extends TabsProps {
  outline: OutlineItem[];
}
