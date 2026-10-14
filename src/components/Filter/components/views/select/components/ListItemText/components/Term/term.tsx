import { Typography, TypographyProps } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../../styles/common/mui/typography";
import { BaseComponentProps, TestIdProps } from "../../../../../../../../types";

/**
 * Select list item term text.
 * The given Mui Typography props override the defaults.
 * @param props - Component props.
 * @param props.className - Class name applied to the text.
 * @param props.testId - Test id, set as the text's data-testid attribute.
 * @returns The term.
 */
export const Term = ({
  className,
  testId,
  ...props /* MuiTypographyProps */
}: BaseComponentProps & TestIdProps & TypographyProps): JSX.Element => {
  return (
    <Typography
      className={className}
      data-testid={testId}
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}
      {...props}
    />
  );
};
