import { Global } from "@emotion/react";
import { Fade } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import { JSX, useMemo } from "react";
import { Attribute } from "../../common/entities";
import { isColumnFilter } from "../../common/filters/adapters/tanstack/typeGuards";
import { useValidateFilterKeys } from "../../common/filters/hooks/UseValidateFilterKeys/hook";
import { PROPERTY } from "../../hooks/useHtmlStyle/constants";
import { DATA_DICTIONARY_URL_PARAMS } from "../../providers/dataDictionaryState/dictionaries/constants";
import { useLayoutHeight } from "../Layout/hooks/UseLayoutHeight/hook";
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
import { scrollPadding, View } from "./dataDictionary.styles";
import { useDataDictionaryConfig } from "./hooks/UseDataDictionaryConfig/hook";
import { DataDictionaryProps } from "./types";
import { extractColumnId, getValidColumnIds } from "./utils";

/**
 * Data dictionary view: the title, the outline of classes, the filters with their tags, and the description and entities.
 * Throws during render when no configured data dictionary has a matching path, or when the column filters URL param is malformed or names an unknown column.
 * From 1024px up, a grid of title, outline, filters and entities areas: the title pins below the header in a fixed-height row (a long title truncates), and the outline and filters pin below the title.
 * The filters are measured once mounted, for the HTML scroll-padding-top, with a server-rendered fallback until then.
 * The entities fade in once the filters are measured, after hydration, because the server render of the table differs from the client.
 * @param props - Component props.
 * @param props.className - Class name applied to the view.
 * @param props.dictionary - Data dictionary path, matched against the configured data dictionaries.
 * @param props.EntitiesLayout - Entities layout component; defaults to EntitiesLayout.
 * @param props.FiltersLayout - Filters layout component; defaults to FiltersLayout.
 * @param props.Outline - Outline component; defaults to Outline.
 * @param props.OutlineLayout - Outline layout component; defaults to OutlineLayout.
 * @param props.Title - Title component; defaults to Title.
 * @param props.TitleLayout - Title layout component; defaults to TitleLayout.
 * @returns The data dictionary.
 */
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
  const { classes, description, download, tableOptions, title } =
    useDataDictionaryConfig<T>(dictionary);

  // Measure the filters; their height clears deep links below the sticky filters.
  const { isMeasured, ref: filtersRef } = useLayoutHeight<HTMLDivElement>(
    PROPERTY.DATA_DICTIONARY_FILTERS_HEIGHT,
  );

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

  return (
    <View className={className}>
      <Global styles={scrollPadding} />
      <TitleLayout>
        <Title>{title}</Title>
      </TitleLayout>
      <OutlineLayout>
        <Outline outline={outline} />
      </OutlineLayout>
      <FiltersLayout ref={filtersRef}>
        <Filters download={download} table={table} />
        <ColumnFilterTags table={table} />
      </FiltersLayout>
      <Fade in={isMeasured}>
        {/* Fade in entities after hydration, once the filters are measured. */}
        <EntitiesLayout>
          <Description description={description} />
          <Entities table={table} />
        </EntitiesLayout>
      </Fade>
    </View>
  );
};
