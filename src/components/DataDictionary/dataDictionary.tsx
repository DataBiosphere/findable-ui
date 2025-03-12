import React from "react";
import { BaseComponentProps } from "../types";
import { Entities } from "./components/Entities/entities";
import { View } from "./dataDictionary.styles";
import { useDataDictionary } from "./hooks/UseDataDictionary/hook";

export const DataDictionary = ({
  className,
}: BaseComponentProps): JSX.Element => {
  const { classes } = useDataDictionary();
  return (
    <View className={className}>
      <Entities classes={classes} />
    </View>
  );
};
