import { mixed, number, object } from "yup";
import { FIELD_NAME } from "./constants";
import { RANGE_OPERATOR } from "./types";

export const SCHEMA = object({
  [FIELD_NAME.MAX]: number()
    .typeError("Value must be a number")
    .when(FIELD_NAME.RANGE_OPERATOR, {
      is: RANGE_OPERATOR.LESS_THAN,
      otherwise: (schema) => schema.notRequired(),
      then: (schema) => schema.required("Value is required"),
    }),
  [FIELD_NAME.MIN]: number()
    .typeError("Value must be a number")
    .when(FIELD_NAME.RANGE_OPERATOR, {
      is: RANGE_OPERATOR.GREATER_THAN,
      otherwise: (schema) => schema.notRequired(),
      then: (schema) => schema.required("Value is required"),
    })
    .when(FIELD_NAME.RANGE_OPERATOR, {
      is: RANGE_OPERATOR.BETWEEN,
      then: (schema) =>
        schema.test(
          "min-less-than-max",
          "Min must be less than Max",
          function (value) {
            const max = this.parent[FIELD_NAME.MAX];
            // Only validate if both min and max are numbers
            if (typeof max !== "number" || typeof value !== "number")
              return true;
            return value < max;
          }
        ),
    }),
  [FIELD_NAME.RANGE_OPERATOR]: mixed<RANGE_OPERATOR>().default(
    RANGE_OPERATOR.BETWEEN
  ),
});
