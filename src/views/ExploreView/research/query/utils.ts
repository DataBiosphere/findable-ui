/**
 * Extracts and trims form values from a form element.
 * @param form -  Form element.
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
