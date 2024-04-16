import React, { ElementType, Fragment, ReactNode } from "react";
import { Stack } from "../Stack/stack";

/**
 * Basic key value pairs component.
 * Optional wrapper components for the key values, key value tuple, key and value for complete ui flexibility.
 */

export type Key = ReactNode;
export type KeyValue = [Key, Value];
export type Value = ReactNode | ReactNode[];
export type KeyValueFn = (keyValue: KeyValue) => void; // An KeyValue element onClick function.
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
      {[...keyValuePairs].map(([key, value], k) => {
        // Pass through the keyValue to the KeyValue element (for the KeyValueFn if defined).
        const keyValueProps =
          KeyValue === Fragment ? {} : { keyValue: [key, value] };
        return (
          <KeyValue key={`${key}${k}`} {...keyValueProps}>
            <Key>{key}</Key>
            <Value>{value}</Value>
          </KeyValue>
        );
      })}
    </KeyValues>
  );
};
