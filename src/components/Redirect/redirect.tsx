import { useRouter } from "next/router";
import { JSX, useEffect } from "react";

export interface RedirectProps {
  destination: string;
  replace?: boolean;
}

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
