import { Stack, StackProps } from "@mui/material";
import React from "react";
import { KeyValueElTypeProps } from "../../../../../../../../components/common/KeyValuePairs/components/KeyValueElType/keyValueElType";

export const KeyValueElType = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- `keyValue` is accepted for compatibility but not used.
  keyValue,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- `keyValueFn` is accepted for compatibility but not used.
  keyValueFn,
  ...props /* MuiStackProps */
}: StackProps &
  Pick<KeyValueElTypeProps, "keyValue" | "keyValueFn">): JSX.Element => {
  return <Stack {...props} direction="row" gap={1} useFlexGap />;
};
