import { OnFilterWithTracking } from "../../../hooks/UseFilters/types";

export interface UseTracking {
  trackFilterEvent: (...args: Parameters<OnFilterWithTracking>) => void;
}
