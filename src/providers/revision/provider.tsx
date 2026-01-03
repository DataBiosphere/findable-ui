import { JSX, ReactNode, useMemo } from "react";
import { RevisionContext } from "./context";

/**
 * Provides a revision identifier representing the current dataset lifecycle.
 *
 * A revision changes when the supplied `revisionKey` changes and is used to
 * invalidate derived state (such as pagination) that must not persist across
 * dataset boundaries.
 *
 * Consumers can use the revision to guard against stale state and ensure
 * synchronous resets before dependent effects (e.g. data fetching) run.
 *
 * @param props - Props.
 * @param props.children - Children.
 * @param props.revisionKey - Revision identifier.
 * @returns Revision provider.
 */
export function RevisionProvider({
  children,
  revisionKey,
}: {
  children: ReactNode | ReactNode[];
  revisionKey: string;
}): JSX.Element {
  const revision = useMemo(() => `${revisionKey}-${Date.now()}`, [revisionKey]);
  return (
    <RevisionContext.Provider value={{ revision }}>
      {children}
    </RevisionContext.Provider>
  );
}
