import { css, SerializedStyles } from "@emotion/react";
import { TYPOGRAPHY_PROPS } from "../mui/typography";

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

export const textBody400 = typographyToCSS(TYPOGRAPHY_PROPS.VARIANT.BODY_400);
export const textBody4002Lines = typographyToCSS(
  TYPOGRAPHY_PROPS.VARIANT.BODY_400_2_LINES
);
export const textBody500 = typographyToCSS(TYPOGRAPHY_PROPS.VARIANT.BODY_500);
export const textBody5002Lines = typographyToCSS(
  TYPOGRAPHY_PROPS.VARIANT.BODY_500_2_LINES
);
export const textBodyLarge400 = typographyToCSS(
  TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_400
);
export const textBodyLarge4002Lines = typographyToCSS(
  TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_400_2_LINES
);
export const textBodyLarge500 = typographyToCSS(
  TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_500
);
export const textBodySmall400 = typographyToCSS(
  TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400
);
export const textBodySmall4002Lines = typographyToCSS(
  TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400_2_LINES
);
export const textBodySmall500 = typographyToCSS(
  TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_500
);
export const textHeading = typographyToCSS(TYPOGRAPHY_PROPS.VARIANT.HEADING);
export const textHeadingLarge = typographyToCSS(
  TYPOGRAPHY_PROPS.VARIANT.HEADING_LARGE
);
export const textHeadingSmall = typographyToCSS(
  TYPOGRAPHY_PROPS.VARIANT.HEADING_SMALL
);
export const textHeadingXLarge = typographyToCSS(
  TYPOGRAPHY_PROPS.VARIANT.HEADING_XLARGE
);
export const textUppercase500 = typographyToCSS(
  TYPOGRAPHY_PROPS.VARIANT.UPPERCASE_500
);
