import type { BaseComponentProps } from "../../components/types";

/**
 * Props of the explore view, generic over the entity type: the explore page's entity list type and its statically loaded
 * entities, if any. Nothing Azul-specific: Azul is only a server-side fetching concern.
 */
export interface ExploreViewProps<T = unknown> extends BaseComponentProps {
  data?: T[];
  entityListType: string;
}
