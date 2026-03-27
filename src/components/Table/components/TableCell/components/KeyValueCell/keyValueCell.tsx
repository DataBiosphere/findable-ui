import { CellContext, RowData } from "@tanstack/react-table";
import React from "react";
import {
  KeyValuePairs,
  KeyValuePairsProps,
} from "../../../../../../components/common/KeyValuePairs/keyValuePairs";
import { KeyElType } from "./components/KeyElType/keyElType";
import { KeyValueElType } from "./components/KeyValueElType/keyValueElType";
import { KeyValuesElType } from "./components/KeyValuesElType/keyValuesElType";

export const KeyValueCell = <
  T extends RowData,
  TValue extends KeyValuePairsProps = KeyValuePairsProps
>({
  getValue,
}: CellContext<T, TValue>): JSX.Element | null => {
  const props = getValue();
  if (!props) return null;
  return (
    <KeyValuePairs
      KeyElType={KeyElType}
      KeyValueElType={KeyValueElType}
      KeyValuesElType={KeyValuesElType}
      {...props}
    />
  );
};
