import { RowData } from "@tanstack/react-table";
import React from "react";
import { Attribute } from "../../common/entities";
import { Entities } from "./components/Entities/entities";
import { Filters } from "./components/Filters/filters";
import { EntitiesLayout as DefaultEntitiesLayout } from "./components/Layout/components/EntitiesLayout/entitiesLayout";
import { FiltersLayout as DefaultFiltersLayout } from "./components/Layout/components/FiltersLayout/filtersLayout";
import { OutlineLayout as DefaultOutlineLayout } from "./components/Layout/components/OutlineLayout/outlineLayout";
import { TitleLayout as DefaultTitleLayout } from "./components/Layout/components/TitleLayout/titleLayout";
import { Outline as DefaultOutline } from "./components/Outline/outline";
import { Title as DefaultTitle } from "./components/Title/title";
import { View } from "./dataDictionary.styles";
import { useDataDictionary } from "./hooks/UseDataDictionary/hook";
import { useLayoutSpacing } from "./hooks/UseLayoutSpacing/hook";
import { DataDictionaryProps } from "./types";

export const DataDictionary = <T extends RowData = Attribute>({
  className,
  EntitiesLayout = DefaultEntitiesLayout,
  FiltersLayout = DefaultFiltersLayout,
  Outline = DefaultOutline,
  OutlineLayout = DefaultOutlineLayout,
  Title = DefaultTitle,
  TitleLayout = DefaultTitleLayout,
}: DataDictionaryProps): JSX.Element => {
  const { outline, table, title } = useDataDictionary<T>();
  const { spacing } = useLayoutSpacing();
  return (
    <View className={className}>
      <TitleLayout {...spacing}>
        <Title title={title} />
      </TitleLayout>
      <OutlineLayout {...spacing}>
        <Outline outline={outline} />
      </OutlineLayout>
      <FiltersLayout {...spacing}>
        <Filters table={table} />
      </FiltersLayout>
      <EntitiesLayout {...spacing}>
        <Entities spacing={spacing} table={table} />
      </EntitiesLayout>
    </View>
  );
};
