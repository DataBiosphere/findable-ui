import { Box, SxProps } from "@mui/material";
import { JSX, ReactNode } from "react";
import { KeyValue, KeyValueFn } from "../../keyValuePairs";
import { getButtonProps } from "./utils";

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
 * With a keyValueFn, the element is a focusable button that invokes it on
 * click, Enter or Space; without one, it is a plain element.
 * @param props - Component props.
 * @param props.boxSx - Styles applied to the box.
 * @param props.children - Key and value elements.
 * @param props.keyValue - Key value tuple, passed to keyValueFn.
 * @param props.keyValueFn - Function invoked with the key value tuple on click, Enter or Space; the button role, focus and pointer cursor apply only when given.
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
      {...getButtonProps(keyValue, keyValueFn)}
      sx={{ cursor: keyValueFn ? "pointer" : "default", ...boxSx }}
      {...props}
    >
      {children}
    </Box>
  );
};
