import { useAdapter } from "./adapter/useAdapter";
import type { CSFetchCSFilterProps } from "./types";

/**
 * Client-side fetch and client-side filter strategy: sends the explore page's statically loaded entities, e.g. from a
 * TSV file at build time, into explore state, for filtering on the client. Makes no request: the data is already
 * loaded. Rendered only in that explore mode. Renders nothing.
 * @typeParam T - Entity type.
 * @param props - Props.
 * @param props.data - Statically loaded entities of the explore page, if any.
 * @param props.entityListType - Entity list type of the explore page.
 * @returns Nothing.
 */
export const CSFetchCSFilter = <T = unknown,>({
  data,
  entityListType,
}: CSFetchCSFilterProps<T>): null => {
  useAdapter(data, entityListType);
  return null;
};
