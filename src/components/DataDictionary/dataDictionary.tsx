import React, { useMemo } from "react";
import { BaseComponentProps } from "../types";
import { Entities } from "./components/Entities/entities";
import { Outline } from "./components/Outline/outline";
import { buildClassesOutline } from "./components/Outline/utils";
import { StyledTitle } from "./components/Title/title.styles";
import {
  LeftColumn,
  LeftColumnScroller,
  RightColumn,
  TitleRow,
  View,
} from "./dataDictionary.styles";
import { useDataDictionary } from "./hooks/UseDataDictionary/hook";
import { useLayoutMetrics } from "./hooks/UseLayoutMetrics/hook";

export const DataDictionary = ({
  className,
}: BaseComponentProps): JSX.Element => {
  const { classes } = useDataDictionary();
  const { metrics } = useLayoutMetrics();
  const outline = useMemo(() => buildClassesOutline(classes), [classes]);
  return (
    <View className={className}>
      <TitleRow {...metrics}>
        <StyledTitle title="Data Dictionary" />
      </TitleRow>
      <LeftColumn {...metrics}>
        <LeftColumnScroller>
          <Outline outline={outline} />
        </LeftColumnScroller>
      </LeftColumn>
      <RightColumn {...metrics}>
        <Entities classes={classes} metrics={metrics} />
      </RightColumn>
    </View>
  );
};
