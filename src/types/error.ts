// eslint-disable-next-line @typescript-eslint/no-explicit-any -- DataExplorerError can receive any kind of error object
type ErrorType = Error & any;

const createMessage = (error: ErrorType): string => {
  if (!error.response?.data?.Message) {
    return error.message;
  }

  return `${error.message} - ${error.response.data.Message}`;
};

export class DataExplorerError extends Error {
  statusCode?: string | number;
  requestUrlMessage?: string;

  constructor(error: ErrorType) {
    super(createMessage(error), error);
    this.statusCode = error.statusCode ?? error.response?.status;
    this.requestUrlMessage = error.request?.responseURL;
  }
}
