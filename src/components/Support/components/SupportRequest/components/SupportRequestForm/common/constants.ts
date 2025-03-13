import * as yup from "yup";
import { FORM_CONTROL_NAME, FormOption, FormState } from "./entities";

// Validation schema
export const VALIDATION_SCHEMA = yup.object({
  [FORM_CONTROL_NAME.ATTACHMENT_TOKEN]: yup
    .string()
    .defined("Attachment token must be specified"),
  [FORM_CONTROL_NAME.DESCRIPTION]: yup
    .string()
    .required("Description is required"),
  [FORM_CONTROL_NAME.EMAIL]: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  [FORM_CONTROL_NAME.NAME]: yup.string().required("Name is required"),
  [FORM_CONTROL_NAME.SUBJECT]: yup.string().required("Subject is required"),
  [FORM_CONTROL_NAME.TYPE]: yup.string().required("Type is required"),
});

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
