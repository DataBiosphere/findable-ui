import React from "react";
import { BaseComponentProps } from "../types";
import { Entities } from "./components/Entities/entities";
import { Outline } from "./components/Outline/outline";
import { StyledTitle } from "./components/Title/title.styles";
import { View } from "./dataDictionary.styles";
import { useDataDictionary } from "./hooks/UseDataDictionary/hook";

export const DataDictionary = ({
  className,
}: BaseComponentProps): JSX.Element => {
  const { classes } = useDataDictionary();
  return (
    <View className={className}>
      <StyledTitle title="Data Dictionary" />
      <Outline classes={classes} />
      <Entities classes={classes} />
    </View>
  );
};
