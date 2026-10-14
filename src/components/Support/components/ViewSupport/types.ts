import { AnchorHTMLAttributes, ElementType } from "react";
import { BaseComponentProps } from "../../../types";

/**
 * Props for the ViewSupport component.
 */
export interface ViewSupportProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>, BaseComponentProps {
  Icon?: ElementType;
  url: string;
}
