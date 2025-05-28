import React from "react";
import { DataDictionary } from "../../components/DataDictionary/dataDictionary";
import { BaseComponentProps } from "../../components/types";
import { DataDictionaryMetaProvider } from "../../providers/dataDictionaryMeta/provider";

export const DataDictionaryView = ({
  className,
}: BaseComponentProps): JSX.Element => {
  return (
    <DataDictionaryMetaProvider>
      <DataDictionary className={className} />
    </DataDictionaryMetaProvider>
  );
};
