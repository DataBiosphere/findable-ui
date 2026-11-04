import { useAdapter } from "./adapter/useAdapter";
import type { SSFetchCSFilterProps } from "./types";

/**
 * Server-side fetch and client-side filter strategy: fetches every entity in the entity list into explore state, with
 * findable-ui's own query client, for filtering on the client. Rendered, and loaded (see ./lazy), only in that explore
 * mode, so apps that don't fetch from the server don't download it or TanStack Query. Renders nothing.
 * @param props - Props.
 * @param props.entityListType - Entity list type of the explore page.
 * @returns Nothing.
 */
export const SSFetchCSFilter = ({
  entityListType,
}: SSFetchCSFilterProps): null => {
  useAdapter(entityListType);
  return null;
};
