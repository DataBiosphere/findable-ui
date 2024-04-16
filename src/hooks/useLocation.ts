import { isSSR } from "../utils/ssr";

interface Result {
  href: string;
  pathname: string;
  search: URLSearchParams;
}

/**
 * Hook used to get the url properties from the location object
 * Most of the time you can get the same result with useRouter(). This hook has a single use case:
 *  - When you need to get the url properties ready on the first render, before ReactDOM.hydrate
 * @returns an object containing url's pathname and search params
 */
export const useLocation = (): Result | null => {
  if (isSSR()) {
    return null;
  }
  const { href, pathname, search } = window.location;
  return {
    href,
    pathname,
    search: new URLSearchParams(search),
  };
};
