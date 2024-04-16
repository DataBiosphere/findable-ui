import { FileRejection } from "react-dropzone";

export enum REQUEST_FIELD_ID {
  DESCRIPTION = "DESCRIPTION",
  EMAIL = "EMAIL",
  SUBJECT = "SUBJECT",
  TICKET_FORM_ID = "TICKET_FORM_ID",
  TYPE = "TYPE",
}

export enum FORM_CONTROL_LABEL {
  ATTACHMENT_TOKEN = "Attachment (optional)",
  DESCRIPTION = "How can we help you?",
  EMAIL = "Your email address",
  NAME = "Your Name",
  SUBJECT = "Subject",
  TYPE = "Message topic",
}

export enum FORM_CONTROL_NAME {
  ATTACHMENT_TOKEN = "attachmentToken",
  DESCRIPTION = "description",
  EMAIL = "email",
  NAME = "name",
  SUBJECT = "subject",
  TYPE = "type",
}

export type FormControlValue = Record<FORM_CONTROL_NAME, string>;

export interface FormState extends FormControlValue {
  attachmentName: string;
  attachmentRejected: boolean;
  attachmentRejections: FileRejection["errors"];
  attachmentUploading: boolean;
  submitError: boolean;
  submitted: boolean;
  submitting: boolean;
  touched: Touched;
}

export interface FormOption {
  disabled?: boolean;
  label: string;
  value: string;
}

export type Touched = {
  [key in FORM_CONTROL_NAME]?: boolean;
};

export interface UploadAttachment {
  file_name: string;
}

export interface UploadResponse {
  attachment: UploadAttachment;
  token: string;
}

export type RequestValue = FormControlValue;

export type ValidateResponse = {
  [key in FORM_CONTROL_NAME]: string[];
};
