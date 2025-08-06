import { css, SerializedStyles } from "@emotion/react";

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
export const textBodyLarge500 = typographyToCSS("text-body-large-500");
export const textBodySmall400 = typographyToCSS("text-body-small-400");
export const textBodySmall4002Lines = typographyToCSS(
  "text-body-small-400-2lines"
);
export const textBodySmall500 = typographyToCSS("text-body-small-500");
export const textHeading = typographyToCSS("text-heading");
export const textHeadingLarge = typographyToCSS("text-heading-large");
export const textHeadingSmall = typographyToCSS("text-heading-small");
export const textHeadingXLarge = typographyToCSS("text-heading-xlarge");
export const textUppercase500 = typographyToCSS("text-uppercase-500");
