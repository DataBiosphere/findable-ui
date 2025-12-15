import { FormEvent } from "react";

/**
 * Function to get the form value.
 * @param e - Form event.
 * @param fieldName - Field name.
 * @returns Form value.
 */
export function getFormValue(
  e: FormEvent<HTMLFormElement>,
  fieldName: string
): string | undefined {
  const formData = new FormData(e.target as HTMLFormElement);
  const formValue = formData.get(fieldName);
  // Expect the form value to be a string.
  if (!formValue || typeof formValue !== "string") return;
  // Expect the form value to not be empty.
  if (formValue.trim() === "") return;
  return formValue;
}
