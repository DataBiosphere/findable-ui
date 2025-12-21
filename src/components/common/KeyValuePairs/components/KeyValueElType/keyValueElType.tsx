import { Box, SxProps } from "@mui/material";
import { JSX, ReactNode } from "react";
import { KeyValue, KeyValueFn } from "../../keyValuePairs";

/**
 * Basic KeyValuePairs "key value" component.
 * Facilitates handling of onClick on the KeyValue element in KeyValuePairs component.
 */

export interface KeyValueElTypeProps {
  boxSx?: SxProps;
  children: ReactNode;
  keyValue: KeyValue; // From KeyValuePairs component.
  keyValueFn?: KeyValueFn; // Optional, not all keyValue pairs may have a corresponding function.
}

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
