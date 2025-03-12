import React from "react";
import { DataDictionary } from "../../components/DataDictionary/dataDictionary";
import { BaseComponentProps } from "../../components/types";

export const DataDictionaryView = ({
  className,
}: BaseComponentProps): JSX.Element => {
  return <DataDictionary className={className} />;
};
