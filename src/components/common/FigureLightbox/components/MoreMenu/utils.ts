import { LABEL } from "../../constants";
import type { MenuAction, MoreMenuProps } from "./types";

/**
 * Returns the zoom actions the menu offers when the zoom group is hidden: zoom in, zoom out (disabled at fit) and fit to screen.
 * @param props - Menu props.
 * @param props.onFit - Resets the zoom to fit the figure to the screen.
 * @param props.onZoomIn - Steps the zoom in.
 * @param props.onZoomOut - Steps the zoom out.
 * @param props.zoom - Current zoom level.
 * @returns The zoom actions.
 */
export function getZoomActions({
  onFit,
  onZoomIn,
  onZoomOut,
  zoom,
}: Pick<
  MoreMenuProps,
  "onFit" | "onZoomIn" | "onZoomOut" | "zoom"
>): MenuAction[] {
  return [
    { key: "zoom-in", label: LABEL.ZOOM_IN, onClick: onZoomIn },
    {
      disabled: zoom <= 1,
      key: "zoom-out",
      label: LABEL.ZOOM_OUT,
      onClick: onZoomOut,
    },
    { key: "fit", label: LABEL.FIT_ARIA, onClick: onFit },
  ];
}
