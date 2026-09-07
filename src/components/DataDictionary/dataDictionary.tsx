import { Fade } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import { JSX, useMemo } from "react";
import { Attribute } from "../../common/entities";
import { isColumnFilter } from "../../common/filters/adapters/tanstack/typeGuards";
import { useValidateFilterKeys } from "../../common/filters/hooks/UseValidateFilterKeys/hook";
import { PROPERTY } from "../../hooks/useHtmlStyle/constants";
import { useHtmlStyle } from "../../hooks/useHtmlStyle/hook";
import { DATA_DICTIONARY_URL_PARAMS } from "../../providers/dataDictionaryState/dictionaries/constants";
import { Description } from "./components/Description/description";
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
import { useMeasureFilters } from "./hooks/UseMeasureFilters/hook";
import { DataDictionaryProps } from "./types";
import { extractColumnId, getValidColumnIds } from "./utils";

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
  const { classes, description, tableOptions, title } =
    useDataDictionaryConfig<T>(dictionary);

  // Measure the filters, which the entities are offset to clear. Nothing here
  // reads the header or footer: the header is in flow and the scrollport begins
  // below it, so the sticky layouts anchor at top: 0 with no compensation.
  const { dimensions, filtersRef } = useMeasureFilters();

  // Table instance.
  const table = useTable<T>(dictionary, classes, tableOptions);

  // Validate filter URL param keys against the table's column IDs.
  const validColumnIds = useMemo(() => getValidColumnIds(table), [table]);

  useValidateFilterKeys(
    DATA_DICTIONARY_URL_PARAMS.COLUMN_FILTERS,
    validColumnIds,
    isColumnFilter,
    extractColumnId,
  );

  // Dictionary outline.
  const outline = buildClassesOutline<T>(table);

  // Declare how much of the scrollport's top the sticky filters obscure. Set on
  // the HTML element as a custom property so it inherits down to ScrollShell,
  // which is the scrollport and applies it as scroll-padding-top; that keeps
  // outline hash navigation from landing a class heading under the filters.
  useHtmlStyle(PROPERTY.SCROLL_PADDING_TOP, `${dimensions.height}px`);

  return (
    <View className={className}>
      <TitleLayout>
        <Title>{title}</Title>
      </TitleLayout>
      <OutlineLayout>
        <Outline outline={outline} />
      </OutlineLayout>
      <FiltersLayout ref={filtersRef}>
        <Filters table={table} />
        <ColumnFilterTags table={table} />
      </FiltersLayout>
      <Fade in={dimensions.height > 0}>
        {/* Fade in entities when filters are measured. */}
        <EntitiesLayout spacing={{ top: dimensions.height }}>
          <Description description={description} />
          <Entities table={table} />
        </EntitiesLayout>
      </Fade>
    </View>
  );
};
