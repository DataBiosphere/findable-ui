import { useAdapter } from "./adapter/useAdapter";
import type { SSFetchSSFilterProps } from "./types";

/**
 * Server-side fetch and server-side filter strategy: fetches the entity list into explore state. Rendered only in
 * that explore mode, so other modes need no query client. Renders nothing.
 * @param props - Props.
 * @param props.entityListType - Entity list type of the explore page.
 * @returns Nothing.
 */
export const SSFetchSSFilter = ({
  entityListType,
}: SSFetchSSFilterProps): null => {
  useAdapter(entityListType);
  return null;
};
