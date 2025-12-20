import { mixed, number, object } from "yup";
import { FIELD_NAME } from "./constants";
import { RANGE_OPERATOR } from "./types";

export const SCHEMA = object({
  [FIELD_NAME.MAX]: number()
    .typeError("Value must be a number")
    .when(FIELD_NAME.RANGE_OPERATOR, {
      is: RANGE_OPERATOR.BETWEEN,
      then: (schema) => schema.notRequired(),
    })
    .when(FIELD_NAME.RANGE_OPERATOR, {
      is: RANGE_OPERATOR.LESS_THAN,
      then: (schema) => schema.required("Value is required"),
    })
    .when(FIELD_NAME.RANGE_OPERATOR, {
      is: RANGE_OPERATOR.GREATER_THAN,
      then: (schema) => schema.notRequired(),
    }),
  [FIELD_NAME.MIN]: number()
    .typeError("Value must be a number")
    .when(FIELD_NAME.RANGE_OPERATOR, {
      is: RANGE_OPERATOR.BETWEEN,
      then: (schema) =>
        schema
          .notRequired()
          .test(
            "min-less-than-max",
            "Min must be less than max",
            function (min) {
              const max = this.parent[FIELD_NAME.MAX];
              // If either value is not a number, skip validation.
              if (!min || !max) return true;
              if (Number.isNaN(min) || Number.isNaN(max)) return true;
              return min < max;
            },
          )
          .test(
            "at-least-min-or-max",
            "Min or Max is required",
            function (min) {
              const max = this.parent[FIELD_NAME.MAX];
              // If both values are null, validation fails.
              return !(min === null && max === null);
            },
          ),
    })
    .when(FIELD_NAME.RANGE_OPERATOR, {
      is: RANGE_OPERATOR.LESS_THAN,
      then: (schema) => schema.notRequired(),
    })
    .when(FIELD_NAME.RANGE_OPERATOR, {
      is: RANGE_OPERATOR.GREATER_THAN,
      otherwise: (schema) => schema.notRequired(),
      then: (schema) => schema.required("Value is required"),
    }),
  [FIELD_NAME.RANGE_OPERATOR]: mixed<RANGE_OPERATOR>().default(
    RANGE_OPERATOR.BETWEEN,
  ),
});
