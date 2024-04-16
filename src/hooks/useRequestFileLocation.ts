import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import {
  FILE_LOCATION_PENDING,
  FILE_LOCATION_SUCCESSFULLY,
} from "../apis/azul/common/constants";
import { FileLocationResponse } from "../apis/azul/common/entities";
import { useAsync } from "./useAsync";
import { useAuthentication } from "./useAuthentication/useAuthentication";

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

export enum METHOD {
  GET = "GET",
  PUT = "PUT",
}

type ResolveFn = (file: FileLocation | PromiseLike<FileLocation>) => void;
type RejectFn = (reason: FileLocation) => void;

/**
 * Returns fetch request options.
 * @param accessToken - Access token.
 * @param method - Method to be used by the request
 * @returns fetch request options.
 */
function createFetchOptions(
  accessToken: string | undefined,
  method: Method
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
  method: Method
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
 * @param accessToken - Access token.
 * @param resolve - function to resolve the running promise
 * @param reject - function to reject the running promise
 * @param active - Mutable object used to check if the page is still mounted and the requests should keep executing
 * @param retryAfter - timeout value
 * @param method - Method to be used by the request
 */
const scheduleFileLocation = (
  url: string,
  accessToken: string | undefined,
  resolve: ResolveFn,
  reject: RejectFn,
  active: MutableRefObject<boolean>,
  retryAfter = 0,
  method: Method = METHOD.GET
): void => {
  setTimeout(() => {
    getFileLocation(url, accessToken, method).then((result: FileLocation) => {
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
          accessToken,
          resolve,
          reject,
          active,
          result.retryAfter
        );
      } else if (result.status === FILE_LOCATION_SUCCESSFULLY) {
        resolve(result);
      } else {
        reject(result);
      }
    });
  }, retryAfter * 1000);
};

/**
 * Hook to get a file location using a retry-after approach
 * @param url - to be used on the get request
 * @param method - Method to be used by the request
 * @returns data object with the file location
 */
export const useRequestFileLocation = (
  url?: string,
  method?: Method
): UseRequestFileLocationResult => {
  // Grab token from authentication.
  const { token } = useAuthentication();
  const {
    data,
    isIdle,
    isLoading,
    isSuccess,
    run: runAsync,
  } = useAsync<FileLocation>();
  const active = useRef<boolean>(true);

  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
    };
  }, []);

  const run = useCallback(() => {
    if (url) {
      runAsync(
        new Promise<FileLocation>((resolve, reject) => {
          scheduleFileLocation(url, token, resolve, reject, active, 0, method);
        })
      );
    }
  }, [runAsync, token, url, method]);

  return { data, isIdle, isLoading, isSuccess, run };
};
