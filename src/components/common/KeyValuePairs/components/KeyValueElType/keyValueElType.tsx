import { Box, SxProps } from "@mui/material";
import { JSX, ReactNode } from "react";
import { KeyValue, KeyValueFn } from "../../keyValuePairs";

/**
 * Props for the KeyValueElType component.
 */
export interface KeyValueElTypeProps {
  boxSx?: SxProps;
  children: ReactNode;
  keyValue: KeyValue; // From KeyValuePairs component.
  keyValueFn?: KeyValueFn; // Optional, not all keyValue pairs may have a corresponding function.
}

/**
 * Basic KeyValuePairs "key value" component.
 * Facilitates handling of onClick on the KeyValue element in KeyValuePairs component.
 * @param props - Component props.
 * @param props.boxSx - Styles applied to the box.
 * @param props.children - Key and value elements.
 * @param props.keyValue - Key value tuple, passed to the click handler.
 * @param props.keyValueFn - Function invoked with the key value tuple on click; the pointer cursor shows only when given.
 * @returns The key value element.
 */
export const KeyValueElType = ({
  boxSx,
  children,
  keyValue,
  keyValueFn,
  ...props /* Spread props to allow for Mui Box specific prop overrides. */
}: KeyValueElTypeProps): JSX.Element => {
  return (
    <Box
      onClick={(): void => keyValueFn && keyValueFn(keyValue)}
      role="button"
      sx={{ cursor: keyValueFn ? "pointer" : "default", ...boxSx }}
      {...props}
    >
      {children}
    </Box>
  );
};
