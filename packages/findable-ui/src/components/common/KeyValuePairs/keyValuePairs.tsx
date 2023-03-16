import React, { ElementType, ReactNode } from "react";
import { Stack } from "../Stack/stack";

/**
 * Basic key value pairs component.
 * Optional wrapper components for the key values, key value tuple, key and value for complete ui flexibility.
 */

export type Key = string;
export type Value = number | number[] | ReactNode | string | string[];
export type KeyValues = Map<Key, Value>;

export interface KeyValuePairsProps {
  KeyElType?: ElementType; // Wrapper element around key.
  KeyValueElType?: ElementType; // Wrapper element around key value tuple.
  keyValuePairs: KeyValues;
  KeyValuesElType?: ElementType; // Wrapper element around key value pairs.
  ValueElType?: ElementType; // Wrapper elements around value.
}

export const KeyValuePairs = ({
  KeyElType: Key = "span",
  KeyValueElType: KeyValue = Stack,
  keyValuePairs,
  KeyValuesElType: KeyValues = Stack,
  ValueElType: Value = "span",
}: KeyValuePairsProps): JSX.Element => {
  return (
    <KeyValues>
      {[...keyValuePairs].map(([key, value], k) => (
        <KeyValue key={`${key}${k}`}>
          <Key>{key}</Key>
          <Value>{value}</Value>
        </KeyValue>
      ))}
    </KeyValues>
  );
};
