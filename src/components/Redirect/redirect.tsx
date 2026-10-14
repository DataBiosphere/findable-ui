import { useRouter } from "next/router";
import { JSX, useEffect } from "react";

/**
 * Props for the Redirect component.
 */
export interface RedirectProps {
  destination: string;
  replace?: boolean;
}

/**
 * Navigates to the destination.
 * @param props - Component props.
 * @param props.destination - Destination URL.
 * @param props.replace - Whether to replace the current history entry instead of pushing a new one.
 * @returns An empty fragment.
 */
export const Redirect = ({
  destination,
  replace,
}: RedirectProps): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    if (replace) {
      router.replace(destination);
    } else {
      router.push(destination);
    }
  }, [destination, replace, router]);

  return <></>;
};
