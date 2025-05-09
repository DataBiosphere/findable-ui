import { ToggleButtonGroupProps } from "@mui/material";
import { OnFilterFn } from "hooks/useCategoryFilter";
import { FormEventHandler } from "react";
import { FIELD_NAME } from "./constants";

export type FieldErrors = Partial<Record<FieldName, string>>;

export type FieldName = (typeof FIELD_NAME)[keyof typeof FIELD_NAME];

export type FieldValues = Record<
  FieldName,
  number | RANGE_OPERATOR | undefined
>;

export type OnSubmitFn = OnFilterFn;

export type OnSubmitParams = Parameters<OnSubmitFn>;

export enum RANGE_OPERATOR {
  BETWEEN = "between",
  GREATER_THAN = "greaterThan",
  LESS_THAN = "lessThan",
}

export type SubmitParams = {
  categoryKey: OnSubmitParams[0];
  categorySection?: OnSubmitParams[3];
};

export interface UseFilterRange {
  clearErrors: () => void;
  formState: { errors: FieldErrors };
  handleSubmit: (
    onSubmit: OnSubmitFn,
    parameters: SubmitParams
  ) => FormEventHandler;
  onChange: ToggleButtonGroupProps["onChange"];
  value: RANGE_OPERATOR;
}
