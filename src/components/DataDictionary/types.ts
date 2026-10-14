import { ElementType } from "react";
import { BaseComponentProps } from "../types";

/**
 * Props for the DataDictionary component.
 */
export interface DataDictionaryProps extends BaseComponentProps {
  dictionary: string;
  EntitiesLayout?: ElementType;
  FiltersLayout?: ElementType;
  Outline?: ElementType;
  OutlineLayout?: ElementType;
  Title?: ElementType;
  TitleLayout?: ElementType;
}
