import { ToggleButtonGroupProps } from "@mui/material";
import { FormEvent } from "react";
import { RANGE_OPERATOR } from "../../types";

export interface UseFilterRange {
  onChange: ToggleButtonGroupProps["onChange"];
  onSubmit: (e: FormEvent) => void;
  value: RANGE_OPERATOR;
}
