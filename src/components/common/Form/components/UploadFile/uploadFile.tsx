import { CloseRounded } from "@mui/icons-material";
import { FormHelperText, Typography } from "@mui/material";
import { JSX } from "react";
import { DropzoneState } from "react-dropzone";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";
import { Loading, LOADING_PANEL_STYLE } from "../../../../Loading/loading";
import { FormState } from "../../../../Support/components/SupportRequest/components/SupportRequestForm/common/entities";
import { ErrorIcon } from "../../../CustomIcon/components/ErrorIcon/errorIcon";
import { InputFormControl } from "../Input/input.styles";
import { Button, Underline } from "./uploadFile.styles";

/**
 * Props for the UploadFile component.
 */
export interface UploadFileProps {
  attachmentName: FormState["attachmentName"];
  attachmentRejected: FormState["attachmentRejected"];
  attachmentRejections: FormState["attachmentRejections"];
  attachmentToken: FormState["attachmentToken"];
  attachmentUploading: FormState["attachmentUploading"];
  className?: string;
  isDragActive: boolean;
  label: string;
  onAttachmentDeleted: () => void;
  open: DropzoneState["open"];
}

/**
 * Renders a file attachment control. Clicking it opens the file picker, or removes the attachment once one is attached.
 * Shows a loading indicator while uploading and an error message when the file is rejected.
 * @param props - Component props.
 * @param props.attachmentName - Name of the attached file.
 * @param props.attachmentRejected - Whether the file was rejected.
 * @param props.attachmentRejections - Reasons the file was rejected.
 * @param props.attachmentToken - Token of the uploaded attachment; the file counts as attached when set.
 * @param props.attachmentUploading - Whether the file is uploading.
 * @param props.className - Class name applied to the form control.
 * @param props.isDragActive - Whether a file is being dragged over the drop zone.
 * @param props.label - Label shown above the control.
 * @param props.onAttachmentDeleted - Function invoked to remove the attachment.
 * @param props.open - Function invoked to open the file picker.
 * @returns The file attachment control.
 */
export const UploadFile = ({
  attachmentName,
  attachmentRejected,
  attachmentRejections,
  attachmentToken,
  attachmentUploading,
  className,
  isDragActive,
  label,
  onAttachmentDeleted,
  open,
}: UploadFileProps): JSX.Element => {
  const error = attachmentRejected;
  const isAttached = Boolean(attachmentToken);
  return (
    <InputFormControl className={className} error={error}>
      {label && (
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>
          {label}
        </Typography>
      )}
      <Button
        isAttached={isAttached}
        isDragActive={isDragActive}
        isError={error}
        onClick={attachmentToken ? onAttachmentDeleted : open}
      >
        <Loading
          iconSize="small"
          loading={attachmentUploading}
          panelStyle={LOADING_PANEL_STYLE.INHERIT}
        />
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>
          {isAttached ? (
            attachmentName
          ) : (
            <>
              Drag or <Underline>Click</Underline> to attach file
            </>
          )}
        </Typography>
        {isAttached && <CloseRounded fontSize="small" />}
      </Button>
      {error && (
        <FormHelperText>
          <ErrorIcon fontSize="xxsmall" />
          {getErrorMessage(attachmentRejections)}
        </FormHelperText>
      )}
    </InputFormControl>
  );
};

/**
 * Returns the error message for the attachment.
 * @param attachmentRejections - Attachment rejections.
 * @returns error message.
 */
function getErrorMessage(
  attachmentRejections: FormState["attachmentRejections"],
): string {
  const fileSizeError = attachmentRejections.find(
    (rejection) => rejection.code === "file-too-large",
  );
  return fileSizeError
    ? "File must be less than 20 MB."
    : "Unable to upload file.";
}
