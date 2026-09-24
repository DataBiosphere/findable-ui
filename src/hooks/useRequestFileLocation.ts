import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import {
  FILE_LOCATION_PENDING,
  FILE_LOCATION_SUCCESSFULLY,
} from "../apis/azul/common/constants";
import { FileLocationResponse } from "../apis/azul/common/entities";
import { useToken } from "./authentication/token/useToken";
import { METHOD } from "./types";
import { useAsync } from "./useAsync";

export interface FileLocation {
  commandLine?: { [key: string]: string };
  location: string;
  retryAfter?: number;
  status: number;
}

export interface UseRequestFileLocationResult {
  data: FileLocation | undefined;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  run: () => void;
}

export type Method = METHOD;

type ResolveFn = (file: FileLocation | PromiseLike<FileLocation>) => void;
type RejectFn = (reason: FileLocation) => void;
type AccessTokenGetter = () => string | undefined;

/**
 * Returns fetch request options.
 * @param accessToken - Access token.
 * @param method - Method to be used by the request
 * @returns fetch request options.
 */
function createFetchOptions(
  accessToken: string | undefined,
  method: Method,
): RequestInit {
  return {
    headers: accessToken ? { Authorization: "Bearer " + accessToken } : {},
    method,
  };
}

/**
 * Function to make a get request and map the result to camelCase
 * @param url - url for the get request
 * @param accessToken - Access token.
 * @param method - Method to be used by the request
 * @returns @see FileLocation
 */
export const getFileLocation = async (
  url: string,
  accessToken: string | undefined,
  method: Method,
): Promise<FileLocation> => {
  const options = createFetchOptions(accessToken, method);
  const res = await fetch(url, options);
  const jsonRes: FileLocationResponse = await res.json();
  return {
    commandLine: jsonRes.CommandLine,
    location: jsonRes.Location,
    retryAfter: jsonRes["Retry-After"],
    status: jsonRes.Status,
  };
};

/**
 * Function that will recursively keep making requests to get the file location until gets a 302 or an error.
 * @param url - url for the get request
 * @param getAccessToken - Access token getter.
 * @param resolve - function to resolve the running promise
 * @param reject - function to reject the running promise
 * @param active - Mutable object used to check if the page is still mounted and the requests should keep executing
 * @param retryAfter - timeout value
 * @param method - Method to be used by the request
 */
const scheduleFileLocation = (
  url: string,
  getAccessToken: AccessTokenGetter,
  resolve: ResolveFn,
  reject: RejectFn,
  active: MutableRefObject<boolean>,
  retryAfter = 0,
  method: Method = METHOD.GET,
): void => {
  setTimeout(() => {
    getFileLocation(url, getAccessToken(), method).then(
      (result: FileLocation) => {
        if (result.status === FILE_LOCATION_PENDING) {
          if (!active.current) {
            reject({
              location: "",
              status: 499, //Client Closed Request
            });
            return;
          }
          scheduleFileLocation(
            result.location,
            getAccessToken,
            resolve,
            reject,
            active,
            result.retryAfter,
            method,
          );
        } else if (result.status === FILE_LOCATION_SUCCESSFULLY) {
          resolve(result);
        } else {
          reject(result);
        }
      },
    );
  }, retryAfter * 1000);
};

/**
 * Hook to get a file location using a retry-after approach
 * @param url - to be used on the get request
 * @param method - Method to be used by the request
 * @returns data object with the file location. The returned `run` callback reads the current token at request time and changes identity when the token changes so dependent effects can retry with refreshed credentials.
 */
export const useRequestFileLocation = (
  url?: string,
  method?: Method,
): UseRequestFileLocationResult => {
  const { token } = useToken();
  const {
    data,
    isIdle,
    isLoading,
    isSuccess,
    run: runAsync,
  } = useAsync<FileLocation>();
  const active = useRef<boolean>(true);
  const tokenRef = useRef<string | undefined>(token);

  // eslint-disable-next-line react-hooks/refs -- Keep the request token synchronized during render so deferred login callbacks and same-commit effects observe the latest token immediately.
  tokenRef.current = token;

  useEffect(() => {
    active.current = true;
    return (): void => {
      active.current = false;
    };
  }, []);

  const run = useMemo(() => {
    const getAccessToken = (): string | undefined => tokenRef.current ?? token;

    return (): void => {
      if (url) {
        runAsync(
          new Promise<FileLocation>((resolve, reject) => {
            scheduleFileLocation(
              url,
              getAccessToken,
              resolve,
              reject,
              active,
              0,
              method,
            );
          }),
        );
      }
    };
  }, [method, runAsync, token, url]);

  return { data, isIdle, isLoading, isSuccess, run };
};
