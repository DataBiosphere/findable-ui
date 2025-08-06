import { css, SerializedStyles } from "@emotion/react";
import {
  TEXT_BODY_LARGE_500,
  TEXT_BODY_SMALL_400,
  TEXT_BODY_SMALL_400_2_LINES,
  TEXT_BODY_SMALL_500,
  TEXT_HEADING,
  TEXT_HEADING_LARGE,
  TEXT_HEADING_SMALL,
  TEXT_HEADING_XLARGE,
  TEXT_UPPERCASE_500,
} from "../../../theme/common/typography";

/**
 * Returns typography style for the specified typography variant.
 * @param TYPOGRAPHY - Typography variant name.
 * @returns typography styles for the variant.
 */
function typographyToCSS(TYPOGRAPHY: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO revisit any.
  return (props: any): SerializedStyles => {
    return css`
      ${props.theme.typography[TYPOGRAPHY]}
    `;
  };
}

export const textBody400 = typographyToCSS("text-body-400");
export const textBody4002Lines = typographyToCSS("text-body-400-2lines");
export const textBody500 = typographyToCSS("text-body-500");
export const textBodyLarge400 = typographyToCSS("text-body-large-400");
export const textBodyLarge4002Lines = typographyToCSS(
  "text-body-large-400-2lines"
);
export const textBodyLarge500 = typographyToCSS(TEXT_BODY_LARGE_500);
export const textBodySmall400 = typographyToCSS(TEXT_BODY_SMALL_400);
export const textBodySmall4002Lines = typographyToCSS(
  TEXT_BODY_SMALL_400_2_LINES
);
export const textBodySmall500 = typographyToCSS(TEXT_BODY_SMALL_500);
export const textHeading = typographyToCSS(TEXT_HEADING);
export const textHeadingLarge = typographyToCSS(TEXT_HEADING_LARGE);
export const textHeadingSmall = typographyToCSS(TEXT_HEADING_SMALL);
export const textHeadingXLarge = typographyToCSS(TEXT_HEADING_XLARGE);
export const textUppercase500 = typographyToCSS(TEXT_UPPERCASE_500);
