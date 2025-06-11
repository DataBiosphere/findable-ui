import { ElementType } from "react";
import { BaseComponentProps } from "../types";

export interface DataDictionaryProps extends BaseComponentProps {
  dictionary: string;
  EntitiesLayout?: ElementType;
  FiltersLayout?: ElementType;
  Outline?: ElementType;
  OutlineLayout?: ElementType;
  Title?: ElementType;
  TitleLayout?: ElementType;
}
