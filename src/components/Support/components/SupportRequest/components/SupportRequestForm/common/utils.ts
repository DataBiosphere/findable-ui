import { RequestValue, REQUEST_FIELD_ID, UploadResponse } from "./entities";

/**
 * Create support request.
 * @param url - Request URL.
 * @param requestValue - Request values.
 * @param FIELD_ID - Request field IDs.
 * @returns support request response.
 */
export async function createSupportRequest(
  url: string,
  requestValue: RequestValue,
  FIELD_ID: Record<REQUEST_FIELD_ID, number>
): Promise<Response> {
  return await fetchWithErrorRejection(
    url,
    getSupportRequestOptions(requestValue, FIELD_ID)
  );
}

/**
 * Returns support request options.
 * @param requestValue - Request values.
 * @param FIELD_ID - Request field IDs.
 * @returns request options.
 */
export function getSupportRequestOptions(
  requestValue: RequestValue,
  FIELD_ID: Record<REQUEST_FIELD_ID, number>
): RequestInit {
  const { attachmentToken, description, email, name, subject, type } =
    requestValue;
  const requestedFromUrl = window.location.href;
  return {
    body: JSON.stringify({
      request: {
        comment: {
          body: `${description}\n\n------------------\nSubmitted from: ${requestedFromUrl}`,
          uploads: [attachmentToken],
        },
        custom_fields: [
          { id: FIELD_ID.EMAIL, value: email },
          { id: FIELD_ID.DESCRIPTION, value: description },
          { id: FIELD_ID.SUBJECT, value: subject },
          { id: FIELD_ID.TYPE, value: type },
        ],
        requester: {
          email,
          name,
        },
        subject,
        ticket_form_id: FIELD_ID.TICKET_FORM_ID,
      },
    }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  };
}

/**
 * Upload file to add as attachment to request.
 * @param url - Upload URL.
 * @param file - File.
 * @returns upload response.
 */
export async function uploadAttachment<T extends File>(
  url: string,
  file: T
): Promise<UploadResponse> {
  const res = await fetchWithErrorRejection(`${url}?filename=${file.name}`, {
    body: file,
    headers: {
      "Content-Type": "application/binary",
    },
    method: "POST",
  });
  const json = await res.json();
  return json.upload;
}

/**
 * Execute fetch, throwing error on non-200 response.
 * @param input - Request URL.
 * @param options - Request options.
 * @returns response.
 */
async function fetchWithErrorRejection(
  input: string,
  options?: RequestInit
): Promise<Response> {
  const res = await fetch(input, options);
  if (res.ok) {
    return res;
  }
  throw res;
}
