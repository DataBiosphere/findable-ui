import { MutableRefObject, useCallback, useEffect, useRef } from "react";
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
type RejectFn = (reason: Error | FileLocation) => void;
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
 * A failed request (network error, or a response that is not JSON) rejects the promise, rather than leaving it
 * pending indefinitely.
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
          );
        } else if (result.status === FILE_LOCATION_SUCCESSFULLY) {
          resolve(result);
        } else {
          reject(result);
        }
      },
      reject,
    );
  }, retryAfter * 1000);
};

/**
 * Hook to get a file location using a retry-after approach
 * @param url - to be used on the get request
 * @param method - Method to be used by the request
 * @returns data object with the file location. `run` reads the latest token when each request is sent, and changes identity when the token changes.
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

  useEffect(() => {
    active.current = true;
    return (): void => {
      active.current = false;
    };
  }, []);

  // Keep the latest token in a ref, so a `run` held across sign-in (e.g. by the
  // login guard) and in-flight retries send the current credentials. Synced
  // after commit: child effects run before the login guard's parent effect.
  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  const run = useCallback(() => {
    if (url) {
      runAsync(
        new Promise<FileLocation>((resolve, reject) => {
          scheduleFileLocation(
            url,
            () => tokenRef.current,
            resolve,
            reject,
            active,
            0,
            method,
          );
        }),
        // useAsync records the error and throws it on the next render; the
        // returned rejection has no other handler, so don't leave it unhandled.
      ).catch(() => undefined);
    }
    // `token` is read through `tokenRef`, but stays a dependency so `run` keeps
    // changing identity with the token (as before), and effects that depend on
    // `run` (e.g. useFileManifestSpreadsheet) re-request with the new token.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- see above.
  }, [method, runAsync, token, url]);

  return { data, isIdle, isLoading, isSuccess, run };
};
