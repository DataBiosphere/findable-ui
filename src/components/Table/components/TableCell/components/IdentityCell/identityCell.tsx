import { Typography } from "@mui/material";
import { type JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { Link } from "../../../../../Links/components/Link/link";
import { ClampedContent } from "../ClampedContent/clampedContent";
import { Chips } from "./components/Chips/chips";
import { StyledStack } from "./identityCell.styles";
import type { IdentityCellProps } from "./types";

/**
 * Renders the title, chips and subtitle of an identity cell.
 * @param props - Component props.
 * @param props.chips - Chips rendered under the title.
 * @param props.className - Class name for the root stack element.
 * @param props.maxLines - Maximum number of lines for the title and subtitle.
 * @param props.subtitle - Subtitle link props.
 * @param props.title - Title link props.
 * @returns The identity cell.
 */
export const IdentityCell = ({
  chips,
  className,
  maxLines,
  subtitle,
  title,
}: IdentityCellProps): JSX.Element => {
  return (
    <StyledStack
      className={className}
      spacing={chips?.length ? 2 : 1}
      useFlexGap
    >
      {/* Link clicks stop at the cell so they don't also toggle row expansion.
       * The consumer onClick still runs, falling back to the TypographyProps
       * onClick as Link does. */}
      {title && (
        <ClampedContent maxLines={maxLines}>
          <Link
            {...title}
            onClick={(e): void => {
              e.stopPropagation();
              (title.onClick ?? title.TypographyProps?.onClick)?.(e);
            }}
          />
        </ClampedContent>
      )}
      <Chips chips={chips} />
      {subtitle && (
        <ClampedContent maxLines={maxLines}>
          <Typography
            color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
            variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}
          >
            <Link
              color={TYPOGRAPHY_PROPS.COLOR.INHERIT}
              {...subtitle}
              onClick={(e): void => {
                e.stopPropagation();
                (subtitle.onClick ?? subtitle.TypographyProps?.onClick)?.(e);
              }}
            />
          </Typography>
        </ClampedContent>
      )}
    </StyledStack>
  );
};
