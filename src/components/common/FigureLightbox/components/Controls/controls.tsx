import { Button, IconButton, Link, Typography } from "@mui/material";
import { JSX } from "react";
import {
  stopNavigationEventsPropagation,
  useController,
  useLightboxState,
  useLoseFocus,
} from "yet-another-react-lightbox";
import { BUTTON_PROPS } from "../../../../../styles/common/mui/button";
import { ICON_BUTTON_PROPS } from "../../../../../styles/common/mui/iconButton";
import { LINK_PROPS } from "../../../../../styles/common/mui/link";
import { SVG_ICON_PROPS } from "../../../../../styles/common/mui/svgIcon";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";
import { BackArrowIcon } from "../../../CustomIcon/components/BackArrowIcon/backArrowIcon";
import { CloseIcon } from "../../../CustomIcon/components/CloseIcon/closeIcon";
import { ForwardArrowIcon } from "../../../CustomIcon/components/ForwardArrowIcon/forwardArrowIcon";
import { LABEL } from "../../constants";
import { getCounterLabel } from "../../utils";
import { MoreMenu } from "../MoreMenu/moreMenu";
import { ZoomControl } from "../ZoomControl/zoomControl";
import {
  StyledActions,
  StyledCaptionBar,
  StyledNavButton,
  StyledTopBar,
  StyledZoomActions,
} from "./controls.styles";
import { ControlsProps } from "./types";

/**
 * Lightbox controls, rendered over the figure: a top bar (figure counter, zoom control, Fit, more actions and close), previous and next buttons, and a caption bar with "Show in context".
 * Pointer and wheel events on the bars are stopped so they don't drag or zoom the figure; key events still reach the lightbox, so Esc and the arrow keys work from any control.
 * @param props - Component props.
 * @param props.figures - Figures in the lightbox.
 * @param props.onFit - Resets the zoom to fit the figure to the screen.
 * @param props.onShowInContext - Records the figure to show on the page once the lightbox has closed.
 * @param props.onZoomIn - Steps the zoom in.
 * @param props.onZoomOut - Steps the zoom out.
 * @param props.smDown - Whether the viewport is below the sm breakpoint, where the zoom group is hidden and the menu offers zoom.
 * @param props.zoom - Current zoom level.
 * @returns The lightbox controls.
 */
export const Controls = ({
  figures,
  onFit,
  onShowInContext,
  onZoomIn,
  onZoomOut,
  smDown,
  zoom,
}: ControlsProps): JSX.Element | null => {
  const { currentIndex } = useLightboxState();
  const { close, focus, next, prev } = useController();
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === figures.length - 1;
  // Moves focus to the lightbox when a focused button is disabled at the first
  // or last figure, so Esc and the arrow keys keep working.
  const previousFocusProps = useLoseFocus(focus, isFirst);
  const nextFocusProps = useLoseFocus(focus, isLast);
  const figure = figures[currentIndex];
  if (!figure) return null;
  const isGroup = figures.length > 1;
  const { onPointerDown, onWheel } = stopNavigationEventsPropagation();
  return (
    <>
      <StyledTopBar onPointerDown={onPointerDown} onWheel={onWheel}>
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>
          {isGroup && getCounterLabel(currentIndex, figures.length)}
        </Typography>
        <StyledActions>
          <StyledZoomActions>
            <ZoomControl
              onZoomIn={onZoomIn}
              onZoomOut={onZoomOut}
              zoom={zoom}
            />
            <Button
              aria-label={LABEL.FIT_ARIA}
              color={BUTTON_PROPS.COLOR.SECONDARY}
              onClick={onFit}
              size={BUTTON_PROPS.SIZE.SMALL}
              variant={BUTTON_PROPS.VARIANT.CONTAINED}
            >
              {LABEL.FIT}
            </Button>
          </StyledZoomActions>
          <MoreMenu
            onFit={onFit}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            originalSrc={figure.originalSrc}
            // Phones hide the zoom group, so the menu offers zoom instead.
            showZoomActions={smDown}
            zoom={zoom}
          />
          <IconButton
            aria-label={LABEL.CLOSE}
            color={ICON_BUTTON_PROPS.COLOR.SECONDARY}
            onClick={close}
            size={ICON_BUTTON_PROPS.SIZE.MEDIUM}
          >
            <CloseIcon fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL} />
          </IconButton>
        </StyledActions>
      </StyledTopBar>
      {isGroup && (
        <>
          <StyledNavButton
            aria-label={LABEL.PREVIOUS}
            className="prev"
            color={ICON_BUTTON_PROPS.COLOR.SECONDARY}
            disabled={isFirst}
            onClick={(): void => prev()}
            onPointerDown={onPointerDown}
            {...previousFocusProps}
            size={ICON_BUTTON_PROPS.SIZE.MEDIUM}
          >
            <BackArrowIcon fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL} />
          </StyledNavButton>
          <StyledNavButton
            aria-label={LABEL.NEXT}
            className="next"
            color={ICON_BUTTON_PROPS.COLOR.SECONDARY}
            disabled={isLast}
            onClick={(): void => next()}
            onPointerDown={onPointerDown}
            {...nextFocusProps}
            size={ICON_BUTTON_PROPS.SIZE.MEDIUM}
          >
            <ForwardArrowIcon fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL} />
          </StyledNavButton>
        </>
      )}
      <StyledCaptionBar onPointerDown={onPointerDown} onWheel={onWheel}>
        {/* A div, not a p: the caption can hold block content, e.g. paragraphs. */}
        <Typography
          component="div"
          variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_400}
        >
          {figure.caption}{" "}
          <Link
            component="button"
            onClick={(): void => {
              // Closed through the lightbox's own close action, which calls
              // on.exited once closed, where the figure is shown.
              onShowInContext(figure);
              close();
            }}
            underline={LINK_PROPS.UNDERLINE.ALWAYS}
          >
            {LABEL.SHOW_IN_CONTEXT}
          </Link>
        </Typography>
      </StyledCaptionBar>
    </>
  );
};
