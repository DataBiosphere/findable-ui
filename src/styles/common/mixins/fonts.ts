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

export const textBodyLarge500 = typographyToCSS("body-large-500");
export const textBodySmall400 = typographyToCSS("body-small-400");
export const textBodySmall4002Lines = typographyToCSS("body-small-400-2lines");
export const textBodySmall500 = typographyToCSS("body-small-500");
export const textHeadingSmall = typographyToCSS("heading-small");
export const textUppercase500 = typographyToCSS("uppercase-500");
