import { IconButton, Typography } from "@mui/material";
import { JSX } from "react";
import { useController, useLoseFocus } from "yet-another-react-lightbox";
import { ICON_BUTTON_PROPS } from "../../../../../styles/common/mui/iconButton";
import { SVG_ICON_PROPS } from "../../../../../styles/common/mui/svgIcon";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";
import { AddIcon } from "../../../CustomIcon/components/AddIcon/addIcon";
import { RemoveIcon } from "../../../CustomIcon/components/RemoveIcon/removeIcon";
import { LABEL } from "../../constants";
import { formatZoom } from "../../utils";
import { ZoomControlProps } from "./types";
import { StyledZoomControl } from "./zoomControl.styles";

/**
 * Lightbox zoom control: zoom out, the current zoom as a percentage, and zoom in.
 * The percentage is a polite live region, so screen readers announce each zoom change.
 * @param props - Component props.
 * @param props.onZoomIn - Steps the zoom in.
 * @param props.onZoomOut - Steps the zoom out.
 * @param props.zoom - Current zoom level, where 1 fits the figure to the screen.
 * @returns The zoom control.
 */
export const ZoomControl = ({
  onZoomIn,
  onZoomOut,
  zoom,
}: ZoomControlProps): JSX.Element => {
  const { focus } = useController();
  const isFit = zoom <= 1;
  // Moves focus to the lightbox when Zoom out is disabled while focused, at fit.
  const zoomOutFocusProps = useLoseFocus(focus, isFit);
  return (
    <StyledZoomControl aria-label={LABEL.ZOOM} role="group">
      <IconButton
        aria-label={LABEL.ZOOM_OUT}
        color={ICON_BUTTON_PROPS.COLOR.INK}
        disabled={isFit}
        onClick={onZoomOut}
        size={ICON_BUTTON_PROPS.SIZE.SMALL}
        {...zoomOutFocusProps}
      >
        <RemoveIcon fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL} />
      </IconButton>
      <Typography
        aria-live="polite"
        component="span"
        variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}
      >
        {formatZoom(zoom)}
      </Typography>
      <IconButton
        aria-label={LABEL.ZOOM_IN}
        color={ICON_BUTTON_PROPS.COLOR.INK}
        onClick={onZoomIn}
        size={ICON_BUTTON_PROPS.SIZE.SMALL}
      >
        <AddIcon fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL} />
      </IconButton>
    </StyledZoomControl>
  );
};
