import { Link, Tooltip } from "@mui/material";
import { JSX, useRef } from "react";
import { LINK_PROPS } from "../../../../../../../styles/common/mui/link";
import { TYPOGRAPHY_PROPS } from "../../../../../../../styles/common/mui/typography";
import { LABEL } from "../../../../constants";
import { StyledCaptionText } from "./caption.styles";
import { useIsTruncated } from "./hooks/UseIsTruncated/hook";
import { CaptionProps } from "./types";

/**
 * Lightbox caption: the caption, clamped to a few lines, and "Show in context".
 * A caption cut off by the clamp shows in full in a tooltip on hover or keyboard focus, and only then is focusable. Screen readers read the full caption either way, as the clamp is visual; the tooltip labels the caption with the same text (not describeChild, which would announce it twice).
 * "Show in context" sits below the caption rather than at its end, so the clamp can't cut it off.
 * @param props - Component props.
 * @param props.caption - Caption content.
 * @param props.onShowInContext - Closes the lightbox and shows the figure on the page.
 * @returns The caption.
 */
export const Caption = ({
  caption,
  onShowInContext,
}: CaptionProps): JSX.Element => {
  const textRef = useRef<HTMLDivElement>(null);
  const isTruncated = useIsTruncated(textRef, caption);
  return (
    <>
      {caption && (
        <Tooltip placement="top" title={isTruncated ? caption : ""}>
          {/* A div, not a p: the caption can hold block content, e.g. paragraphs. */}
          <StyledCaptionText
            component="div"
            ref={textRef}
            tabIndex={isTruncated ? 0 : undefined}
            variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_400}
          >
            {caption}
          </StyledCaptionText>
        </Tooltip>
      )}
      <Link
        component="button"
        onClick={onShowInContext}
        underline={LINK_PROPS.UNDERLINE.ALWAYS}
        variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_400}
      >
        {LABEL.SHOW_IN_CONTEXT}
      </Link>
    </>
  );
};
