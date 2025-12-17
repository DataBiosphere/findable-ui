import { Switch } from "@mui/material";
import React from "react";
import { SWITCH_PROPS } from "../../../../../../../styles/common/mui/switch";
import { StyledFormControlLabel } from "./aiSwitch.styles";
import { AiSwitchProps } from "./types";

export const AiSwitch = ({
  enabled = false,
}: AiSwitchProps): JSX.Element | null => {
  if (!enabled) return null;
  return (
    <StyledFormControlLabel
      control={<Switch color={SWITCH_PROPS.COLOR.PURPLE} />}
      label="AI Search Assist"
    />
  );
};
