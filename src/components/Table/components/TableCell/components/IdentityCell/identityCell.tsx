import { Typography } from "@mui/material";
import { type JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { Link } from "../../../../../Links/components/Link/link";
import { Chips } from "./components/Chips/chips";
import { StyledStack } from "./identityCell.styles";
import type { IdentityCellProps } from "./types";

/**
 * Renders a consolidated identity cell: the title (a link when a url is given,
 * otherwise plain text), a wrapping row of chips, then the subtitle. Chips are
 * expected pre-filtered by the view builder, so a chip renders only for a value
 * that is present.
 * @param props - Component props.
 * @param props.chips - Chips rendered under the title.
 * @param props.className - Optional class name for the root stack element.
 * @param props.subtitle - Subtitle link props; the consumer builds its label.
 * @param props.title - Optional title link props.
 * @returns The identity cell.
 */
export const IdentityCell = ({
  chips,
  className,
  subtitle,
  title,
}: IdentityCellProps): JSX.Element => {
  return (
    <StyledStack className={className} spacing={2} useFlexGap>
      {/* Link clicks stop at the cell so they don't also toggle row expansion. */}
      {title && (
        <Link
          {...title}
          onClick={(e): void => {
            e.stopPropagation();
            title.onClick?.(e);
          }}
        />
      )}
      <Chips chips={chips} />
      {subtitle && (
        <Typography
          color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
          variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}
        >
          {/* Inherits the light ink colour; a consumer color overrides it. */}
          <Link
            color={TYPOGRAPHY_PROPS.COLOR.INHERIT}
            {...subtitle}
            onClick={(e): void => {
              e.stopPropagation();
              subtitle.onClick?.(e);
            }}
          />
        </Typography>
      )}
    </StyledStack>
  );
};
