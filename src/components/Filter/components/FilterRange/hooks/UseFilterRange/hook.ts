import { FormEvent, useCallback, useState } from "react";
import { ValidationError } from "yup";
import { VIEW_KIND } from "../../../../../../common/categories/views/types";
import { useToggleButtonGroup } from "../../../../../common/ToggleButtonGroup/hooks/UseToggleButtonGroup/hook";
import { SCHEMA } from "./schema";
import {
  FieldErrors,
  OnSubmitFn,
  RANGE_OPERATOR,
  SubmitParams,
  UseFilterRange,
} from "./types";
import { getFormValues } from "./utils";

export const useFilterRange = (
  initialValue: RANGE_OPERATOR = RANGE_OPERATOR.BETWEEN
): UseFilterRange => {
  const [errors, setErrors] = useState<FieldErrors>({});
  const { onChange, value } =
    useToggleButtonGroup<RANGE_OPERATOR>(initialValue);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const handleSubmit = useCallback(
    (onSubmit: OnSubmitFn, parameters: SubmitParams) => {
      return (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const fieldValues = getFormValues(e.currentTarget, value); // `value` is current range operator.
        SCHEMA.validate(fieldValues, { abortEarly: false })
          .then(() => {
            setErrors({});
            onSubmit(
              parameters.categoryKey,
              [fieldValues.min, fieldValues.max],
              true,
              parameters.categorySection,
              VIEW_KIND.RANGE
            );
          })
          .catch((validationError: ValidationError) => {
            const fieldErrors: FieldErrors = {};
            for (const error of validationError.inner) {
              if (error.path) fieldErrors[error.path] = error.message;
            }
            setErrors(fieldErrors);
          });
      };
    },
    [value]
  );

  return {
    clearErrors,
    formState: { errors },
    handleSubmit,
    onChange,
    value,
  };
};
