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
import { buildClassesOutline } from "./components/Outline/utils";
import { useTable } from "./components/Table/hook";
import { Title as DefaultTitle } from "./components/Title/title";
import { View } from "./dataDictionary.styles";
import { useDataDictionaryConfig } from "./hooks/UseDataDictionaryConfig/hook";
import { useLayoutSpacing } from "./hooks/UseLayoutSpacing/hook";
import { DataDictionaryProps } from "./types";

export const DataDictionary = <T extends RowData = Attribute>({
  className,
  dictionary,
  EntitiesLayout = DefaultEntitiesLayout,
  FiltersLayout = DefaultFiltersLayout,
  Outline = DefaultOutline,
  OutlineLayout = DefaultOutlineLayout,
  Title = DefaultTitle,
  TitleLayout = DefaultTitleLayout,
}: DataDictionaryProps): JSX.Element => {
  // Get dictionary configuration.
  const { classes, tableOptions, title } =
    useDataDictionaryConfig<T>(dictionary);

  const { spacing } = useLayoutSpacing();

  // Table instance.
  const table = useTable<T>(dictionary, classes, tableOptions);

  // Dictionary outline.
  const outline = buildClassesOutline<T>(table);

  return (
    <View className={className}>
      <TitleLayout {...spacing}>
        <Title title={title} />
      </TitleLayout>
      <OutlineLayout {...spacing}>
        {/* Force re-render on dictionary change to prevent stale outline */}
        <Outline key={dictionary} outline={outline} />
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
