import { ADORNMENT_TYPE } from "./constants";

/**
 * Returns the end adornment type of the input i.e. "default", "submittable", "submitting".
 * @param isDirty - Form is dirty.
 * @param isSubmiting - Form is submitting.
 * @returns End adornment type.
 */
export function getEndAdornmentType(
  isDirty: boolean,
  isSubmiting: boolean
): (typeof ADORNMENT_TYPE)[keyof typeof ADORNMENT_TYPE] {
  if (isSubmiting) return ADORNMENT_TYPE.SUBMITTING;
  if (isDirty) return ADORNMENT_TYPE.SUBMITTABLE;
  return ADORNMENT_TYPE.DEFAULT;
}
