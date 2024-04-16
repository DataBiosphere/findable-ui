import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  HttpStatusCode,
} from "axios";
import { getURL } from "../../shared/utils";

let axiosInstance: AxiosInstance | null = null;

/**
 * Adding response interceptors to axios instances.
 * @param api - AxiosInstance.
 */
export const configureInterceptors = (api: AxiosInstance): void => {
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const { config, response } = error;

      if (response?.status === HttpStatusCode.ServiceUnavailable && config) {
        const retryAfterValue = response.headers["Retry-After"];
        const waitingTime = retryAfterValue ? +retryAfterValue : 0;
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
 * Returns a singleton Axios instance configured for making HTTP requests to a specified base URL.
 * @param baseURL - The base URL to use for the AxiosInstance.
 * @returns axios instance.
 */
export const api = (baseURL = getURL()): AxiosInstance => {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL,
      timeout: 20 * 1000,
    });
    configureInterceptors(axiosInstance);
  }
  return axiosInstance;
};
