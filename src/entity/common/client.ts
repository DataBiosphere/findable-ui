import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  HttpStatusCode,
} from "axios";
import { getURL } from "../../shared/utils";

const MAX_RETRIES = 3;
const INITIAL_RETRY = 1000;
const RETRY_BACKOFF = 3;

/**
 * Adding response interceptors to axios instances.
 * @param api - AxiosInstance.
 */
export const configureInterceptors = (api: AxiosInstance): void => {
  let nextRetryInterval = INITIAL_RETRY;
  let retryCount = 0;
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const { config, response } = error;

      if (
        response?.status === HttpStatusCode.ServiceUnavailable &&
        config &&
        retryCount < MAX_RETRIES
      ) {
        const retryAfterValue = response.headers["Retry-After"];
        let waitingTime = Number(retryAfterValue);
        if (isNaN(waitingTime) || waitingTime <= 0) {
          waitingTime = nextRetryInterval;
          nextRetryInterval *= RETRY_BACKOFF;
        }
        retryCount++;
        return new Promise((resolve) => {
          setTimeout(() => resolve(api(config)), waitingTime);
        });
      } else {
        return Promise.reject(error);
      }
    }
  );
};

/**
 * Returns an Axios instance configured for making HTTP requests to a specified base URL.
 * @param baseURL - The base URL to use for the AxiosInstance.
 * @returns axios instance.
 */
export const api = (baseURL = getURL()): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL,
    timeout: 20 * 1000,
  });
  configureInterceptors(axiosInstance);
  return axiosInstance;
};
