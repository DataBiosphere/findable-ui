import { HTTPError } from "ky";
import { JSX } from "react";
import { ErrorBox } from "./components/errorBox";

interface TempErrorProps {
  error: Error | HTTPError;
}

/**
 * Error details: the status code and request URL for an HTTP error, and the message.
 * @param props - Component props.
 * @param props.error - Error.
 * @returns The error details.
 */
export const TempError = ({ error }: TempErrorProps): JSX.Element => {
  const { code, request } =
    error instanceof HTTPError
      ? {
          ...error,
          code: error.response.status,
          request: error.response.url,
        }
      : { ...error, code: null, request: null };

  return (
    <div>
      {code && <ErrorBox title="Error Code" message={`${code}`} />}
      {request && <ErrorBox title="Request URL" message={request} />}
      <ErrorBox title="Error Message" message={error.message} />
    </div>
  );
};
