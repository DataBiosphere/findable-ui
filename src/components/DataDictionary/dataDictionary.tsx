import { RowData } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { Attribute } from "../../common/entities";
import { Entities } from "./components/Entities/entities";
import { EntitiesLayout as DefaultEntitiesLayout } from "./components/Layout/components/EntitiesLayout/entitiesLayout";
import { OutlineLayout as DefaultOutlineLayout } from "./components/Layout/components/OutlineLayout/outlineLayout";
import { TitleLayout as DefaultTitleLayout } from "./components/Layout/components/TitleLayout/titleLayout";
import { Outline as DefaultOutline } from "./components/Outline/outline";
import { buildClassesOutline } from "./components/Outline/utils";
import { Title as DefaultTitle } from "./components/Title/title";
import { View } from "./dataDictionary.styles";
import { useDataDictionary } from "./hooks/UseDataDictionary/hook";
import { useLayoutSpacing } from "./hooks/UseLayoutSpacing/hook";
import { DataDictionaryProps } from "./types";

export const DataDictionary = <T extends RowData = Attribute>({
  className,
  EntitiesLayout = DefaultEntitiesLayout,
  Outline = DefaultOutline,
  OutlineLayout = DefaultOutlineLayout,
  Title = DefaultTitle,
  TitleLayout = DefaultTitleLayout,
}: DataDictionaryProps): JSX.Element => {
  const { classes, columnDefs, title } = useDataDictionary<T>();
  const { spacing } = useLayoutSpacing();
  const outline = useMemo(() => buildClassesOutline(classes), [classes]);
  return (
    <View className={className}>
      <TitleLayout {...spacing}>
        <Title title={title} />
      </TitleLayout>
      <OutlineLayout {...spacing}>
        <Outline outline={outline} />
      </OutlineLayout>
      <EntitiesLayout {...spacing}>
        <Entities classes={classes} columnDefs={columnDefs} spacing={spacing} />
      </EntitiesLayout>
    </View>
  );
};
