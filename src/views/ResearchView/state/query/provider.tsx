import { JSX, ReactNode } from "react";
import { QueryContext } from "./context";
import { useSubmit } from "./hooks/UseSubmit/hook";

/**
 * Provider that owns the fetch lifecycle for query submission.
 * Persists across page navigation so in-flight requests are not aborted.
 * @param props - Props.
 * @param props.children - Children.
 * @param props.url - URL for the query endpoint.
 * @returns A context provider wrapping the given children.
 */
export function QueryProvider({
  children,
  url,
}: {
  children: ReactNode;
  url: string;
}): JSX.Element {
  const { onSubmit } = useSubmit(url);

  return (
    <QueryContext.Provider value={{ onSubmit }}>
      {children}
    </QueryContext.Provider>
  );
}
