import { Fade } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import React from "react";
import { Attribute } from "../../common/entities";
import { Entities } from "./components/Entities/entities";
import { ColumnFilterTags } from "./components/Filters/components/ColumnFilterTags/columnFilterTags";
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
import { useMeasureFilters } from "./hooks/UseMeasureFilters/hook";
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

  // Layout measurements.
  // Get header and footer dimensions.
  const { spacing } = useLayoutSpacing();
  // Measure filters dimensions.
  const { dimensions, filtersRef } = useMeasureFilters();
  // Update entities' spacing with filters dimensions.
  const entitiesSpacing = { ...spacing, top: dimensions.height };

  // Table instance.
  const table = useTable<T>(dictionary, classes, tableOptions);

  // Dictionary outline.
  const outline = buildClassesOutline<T>(table);

  return (
    <Fade in={spacing.top > 0}>
      {/* Fade in when header is measured. */}
      <View className={className}>
        <TitleLayout {...spacing}>
          <Title title={title} />
        </TitleLayout>
        <OutlineLayout {...spacing}>
          <Outline outline={outline} />
        </OutlineLayout>
        <FiltersLayout ref={filtersRef} {...spacing}>
          <Filters table={table} />
          <ColumnFilterTags table={table} />
        </FiltersLayout>
        <Fade in={dimensions.height > 0}>
          {/* Fade in entities when filters are measured. */}
          <EntitiesLayout spacing={entitiesSpacing}>
            <Entities spacing={entitiesSpacing} table={table} />
          </EntitiesLayout>
        </Fade>
      </View>
    </Fade>
  );
};
