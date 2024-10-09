import { ProfileHandler } from "./types";

export function fetchProfile<R, E>(
  endpoint: string,
  options?: RequestInit,
  handler?: ProfileHandler<R, E>
): void {
  fetch(endpoint, options)
    .then((response) => response.json())
    .then((r: R) => {
      handler?.onSuccess(r);
    })
    .catch((e: E) => {
      handler?.onError(e);
    });
}
