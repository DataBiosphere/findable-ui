import { Stack, StackProps } from "@mui/material";
import React from "react";

export const KeyValuesElType = ({
  ...props /* MuiStackProps */
}: StackProps): JSX.Element => {
  return <Stack {...props} gap={1} useFlexGap />;
};
