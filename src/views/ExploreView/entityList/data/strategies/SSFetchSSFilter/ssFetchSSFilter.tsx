import { useAdapter } from "./adapter/useAdapter";
import type { SSFetchSSFilterProps } from "./types";

/**
 * Server-side fetch and server-side filter strategy: fetches the entity list into explore state, with findable-ui's own
 * query client. Rendered, and loaded (see ./lazy), only in that explore mode, so apps that never filter on the server
 * don't download it or TanStack Query. Renders nothing.
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
