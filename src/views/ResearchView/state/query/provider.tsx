import { JSX, ReactNode } from "react";
import { useConfig } from "../../../../hooks/useConfig";
import { QueryContext } from "./context";
import { useSubmit } from "./hooks/UseSubmit/hook";
import { getQueryUrl } from "./utils";

/**
 * Provider that owns the fetch lifecycle for query submission.
 * Persists across page navigation so in-flight requests are not aborted.
 * @param props - Props.
 * @param props.children - Children.
 * @returns A context provider wrapping the given children.
 */
export function QueryProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { config } = useConfig();

  const url = getQueryUrl(config);

  const { onSubmit } = useSubmit(url);

  return (
    <QueryContext.Provider value={{ onSubmit }}>
      {children}
    </QueryContext.Provider>
  );
}
