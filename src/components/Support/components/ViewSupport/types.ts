import { AnchorHTMLAttributes, ElementType } from "react";
import { BaseComponentProps } from "../../../types";

export interface ViewSupportProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>, BaseComponentProps {
  Icon?: ElementType;
  url: string;
}
