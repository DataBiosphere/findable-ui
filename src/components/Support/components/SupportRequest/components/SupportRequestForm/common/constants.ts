import { FormOption, FormState, FORM_CONTROL_NAME } from "./entities";

// Validation constraints
export const CONSTRAINTS = {
  [FORM_CONTROL_NAME.ATTACHMENT_TOKEN]: { presence: { allowEmpty: true } },
  [FORM_CONTROL_NAME.DESCRIPTION]: { presence: { allowEmpty: false } },
  [FORM_CONTROL_NAME.EMAIL]: { email: true, presence: { allowEmpty: false } },
  [FORM_CONTROL_NAME.NAME]: { presence: { allowEmpty: false } },
  [FORM_CONTROL_NAME.SUBJECT]: { presence: { allowEmpty: false } },
  [FORM_CONTROL_NAME.TYPE]: { presence: { allowEmpty: false } },
};

// Default form state.
export const DEFAULT_FORM_STATE: FormState = {
  attachmentName: "",
  attachmentRejected: false, // Upload fails on drop of file
  attachmentRejections: [], // Failure reasons
  attachmentToken: "",
  attachmentUploading: false,
  [FORM_CONTROL_NAME.DESCRIPTION]: "",
  [FORM_CONTROL_NAME.EMAIL]: "",
  [FORM_CONTROL_NAME.NAME]: "",
  [FORM_CONTROL_NAME.SUBJECT]: "",
  [FORM_CONTROL_NAME.TYPE]: "",
  submitError: false,
  submitted: false,
  submitting: false,
  touched: {},
};

// Active drag styles.
export const DRAGGING_STYLE = {
  cursor: "copy",
};

// Max file attachment
export const MAX_ATTACHMENT_SIZE = 20 * 1024 * 1024;

// Set up "Message topic" select options, selected value and styles.
export const OPTIONS: FormOption[] = [
  { label: "Question", value: "question" },
  { label: "Bug", value: "bug" },
  { label: "Feature Request", value: "feature_request" },
];
