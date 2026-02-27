import { FormEvent } from "react";
import { FIELD_NAME } from "./constants";
import { OnSubmitPayload } from "../../../query/types";

/**
 * Extracts and trims form values from a form element.
 * @param form - Form element.
 * @returns An object mapping form field names to their trimmed string values.
 */
export const getFormValues = (
  form: HTMLFormElement,
): Record<string, string> => {
  const formData = new FormData(form);

  const values: Record<string, string> = {};
  formData.forEach((value, key) => {
    values[key] = value.toString().trim();
  });

  return values;
};

/**
 * Returns the payload for the query form submission.
 * @param e - Form event.
 * @returns The payload object containing the query value.
 */
export const getPayload = (e: FormEvent<HTMLFormElement>): OnSubmitPayload => {
  const formValues = getFormValues(e.currentTarget);
  return { query: formValues[FIELD_NAME.AI_PROMPT] || "" };
};
