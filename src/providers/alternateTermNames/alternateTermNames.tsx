import React, { createContext, ReactNode, useEffect, useState } from "react";

/**
 * Alternate term names map structure: { facetName: { termName: alternateName } }
 */
export type AlternateTermNamesMap = Record<string, Record<string, string>>;

/**
 * Context props for alternate term names.
 */
export type AlternateTermNamesContextProps = {
  alternateTermNames: AlternateTermNamesMap | null;
};

/**
 * Provider props for alternate term names.
 */
export interface AlternateTermNamesProps {
  children: ReactNode | ReactNode[];
}

/**
 * Context for alternate term names.
 */
export const AlternateTermNamesContext =
  createContext<AlternateTermNamesContextProps>({
    alternateTermNames: null,
  });

/**
 * Provider for loading alternate term names from /fe-api/alternateTermNames.json.
 * Loads the file once on mount and caches it in memory for the session.
 * If the file is missing or fails to load, falls back to an empty map.
 * @param props - Provider props.
 * @param props.children - Child components.
 * @returns JSX element.
 */
export function AlternateTermNamesProvider({
  children,
}: AlternateTermNamesProps): JSX.Element {
  const [alternateTermNames, setAlternateTermNames] =
    useState<AlternateTermNamesMap | null>(null);

  useEffect(() => {
    // Load alternate term names once on mount
    fetch("/fe-api/alternateTermNames.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        // If file doesn't exist or isn't ok, return empty object
        return {};
      })
      .then((data: AlternateTermNamesMap) => {
        setAlternateTermNames(data);
      })
      .catch(() => {
        // On any error, use empty map (file missing, parse error, etc.)
        setAlternateTermNames({});
      });
  }, []);

  return (
    <AlternateTermNamesContext.Provider value={{ alternateTermNames }}>
      {children}
    </AlternateTermNamesContext.Provider>
  );
}
