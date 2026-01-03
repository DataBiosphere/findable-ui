import { useCallback, useMemo, useRef } from "react";
import { Cursor, UseCursor } from "./types";
import { DEFAULT_CURSOR } from "./constants";
import { buildCursor, getCursor } from "./utils";
import { AzulEntitiesResponse } from "../../../../../../../apis/azul/common/entities";

/**
 * Manages cursor-based pagination state.
 *
 * - Tracks pagination direction using page index
 * - Provides cursor params for the next request
 * - Persists cursors returned from the API
 *
 * @param pageIndex - Page index.
 * @returns Cursor and update function.
 */
export const useCursor = <T = unknown>(pageIndex: number): UseCursor<T> => {
  const cursorRef = useRef<Cursor>(DEFAULT_CURSOR);
  const pageIndexRef = useRef<number>(pageIndex);

  const cursor = useMemo(() => {
    const nextCursor = getCursor(
      pageIndexRef.current,
      pageIndex,
      cursorRef.current,
    );
    pageIndexRef.current = pageIndex;
    return nextCursor;
  }, [pageIndex]);

  const onUpdateCursor = useCallback((data?: AzulEntitiesResponse<T>) => {
    cursorRef.current = buildCursor(data);
  }, []);

  return { cursor, onUpdateCursor };
};
