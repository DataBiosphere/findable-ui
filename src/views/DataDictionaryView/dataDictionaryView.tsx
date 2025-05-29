import React from "react";
import { DataDictionary } from "../../components/DataDictionary/dataDictionary";
import { BaseComponentProps } from "../../components/types";
import { DataDictionarySyncProvider } from "../../providers/dataDictionarySync/provider";

export const DataDictionaryView = ({
  className,
}: BaseComponentProps): JSX.Element => {
  return (
    <DataDictionarySyncProvider>
      <DataDictionary className={className} />
    </DataDictionarySyncProvider>
  );
};
