import {
  CSSProperties,
  FocusEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { StyledContent, StyledPopper } from "./clampedContent.styles";
import { observeResize } from "./clampedObserver";
import {
  CLAMPED_CONTENT_CLASS_NAME,
  MAX_LINES_VAR,
  OVERLAY_PADDING,
} from "./constants";

const COLLAPSE_DELAY_MS = 100;
const EXPAND_DELAY_MS = 300;
const FOCUSABLE_SELECTOR =
  "a[href], button, input, select, textarea, [tabindex]";

const POPPER_MODIFIERS = [
  {
    name: "offset",
    options: {
      offset: ({
        reference,
      }: {
        reference: { height: number };
      }): [number, number] => [
        -OVERLAY_PADDING.X,
        -reference.height - OVERLAY_PADDING.Y,
      ],
    },
  },
  { name: "flip", options: { fallbackPlacements: ["top-start"] } },
];

/** Props for the ClampedContent component. */
export interface ClampedContentProps {
  children: ReactNode;
  maxLines?: number;
}

interface Overlay {
  anchorEl: HTMLElement;
  style: CSSProperties;
}

/**
 * Clamps the content to the given number of lines; expands on hover or focus.
 * @param props - Component props.
 * @param props.children - Cell content.
 * @param props.maxLines - Maximum number of lines.
 * @returns The clamped cell content.
 */
export const ClampedContent = ({
  children,
  maxLines,
}: ClampedContentProps): ReactNode => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isOverlayHoveredRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [isFocusable, setIsFocusable] = useState(false);
  const [overlay, setOverlay] = useState<Overlay>();

  useEffect(() => (): void => clearTimeout(timeoutRef.current), []);

  useEffect(() => {
    const element = contentRef.current;
    if (!maxLines || !element || typeof ResizeObserver === "undefined") return;
    return observeResize(element, () =>
      setIsFocusable(
        isClamped(element) && !element.querySelector(FOCUSABLE_SELECTOR),
      ),
    );
  }, [maxLines]);

  if (!maxLines) return children;

  const collapse = (delay = COLLAPSE_DELAY_MS): void => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isOverlayHoveredRef.current = false;
      setOverlay(undefined);
    }, delay);
  };

  const expand = (element: HTMLElement): void => {
    clearTimeout(timeoutRef.current);
    if (isClamped(element)) setOverlay(getOverlay(element));
  };

  return (
    <>
      <StyledContent
        className={CLAMPED_CONTENT_CLASS_NAME}
        onBlur={({ currentTarget, relatedTarget }: FocusEvent<HTMLElement>) => {
          if (currentTarget.contains(relatedTarget)) return;
          if (!isOverlayHoveredRef.current) collapse(0);
        }}
        onFocus={({ currentTarget }) => expand(currentTarget)}
        onKeyDown={({ key }) => {
          if (key === "Escape") collapse(0);
        }}
        onPointerEnter={({ currentTarget, pointerType }) => {
          clearTimeout(timeoutRef.current);
          if (overlay || pointerType !== "mouse") return;
          timeoutRef.current = setTimeout(
            () => expand(currentTarget),
            EXPAND_DELAY_MS,
          );
        }}
        onPointerLeave={() => collapse()}
        ref={contentRef}
        style={{ [MAX_LINES_VAR]: maxLines } as CSSProperties}
        tabIndex={isFocusable ? 0 : undefined}
      >
        {children}
      </StyledContent>
      {overlay && (
        <StyledPopper
          anchorEl={overlay.anchorEl}
          modifiers={POPPER_MODIFIERS}
          // Clicks stop at the overlay so selecting text doesn't also toggle row expansion.
          onClick={(e) => e.stopPropagation()}
          onPointerEnter={() => {
            isOverlayHoveredRef.current = true;
            clearTimeout(timeoutRef.current);
          }}
          onPointerLeave={() => {
            isOverlayHoveredRef.current = false;
            collapse();
          }}
          open
          placement="bottom-start"
        >
          <div className="clamped-content-expanded" style={overlay.style}>
            {children}
          </div>
        </StyledPopper>
      )}
    </>
  );
};

function getOverlay(anchorEl: HTMLElement): Overlay {
  const { color, font } = getComputedStyle(anchorEl);
  return {
    anchorEl,
    style: {
      color,
      font,
      minHeight: anchorEl.offsetHeight + 2 * OVERLAY_PADDING.Y,
      minWidth: anchorEl.offsetWidth + 2 * OVERLAY_PADDING.X,
    },
  };
}

function isClamped(element: HTMLElement): boolean {
  return element.scrollHeight > element.clientHeight;
}
