import { Typography, TypographyProps } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../../styles/common/mui/typography";
import { BaseComponentProps, TestIdProps } from "../../../../../../../../types";

/**
 * Select list item count text.
 * The given Mui Typography props override the defaults.
 * @param props - Component props.
 * @param props.className - Class name applied to the text.
 * @param props.testId - Test id, set as the text's data-testid attribute.
 * @returns The count.
 */
export const Count = ({
  className,
  testId,
  ...props /* MuiTypographyProps */
}: BaseComponentProps & TestIdProps & TypographyProps): JSX.Element => {
  return (
    <Typography
      className={className}
      color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
      data-testid={testId}
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}
      {...props}
    />
  );
};
