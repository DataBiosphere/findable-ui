import { Typography } from "@mui/material";
import { JSX, ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../styles/common/mui/typography";

/**
 * Props for the SubTitle component.
 */
export interface SubTitleProps {
  subTitle?: ReactNode;
}

/**
 * Back page hero subtitle. A string subtitle renders as light ink text in the "body-small-400" typography variant; any other subtitle renders as given.
 * @param props - Component props.
 * @param props.subTitle - Subtitle content.
 * @returns The subtitle.
 */
export const SubTitle = ({
  subTitle,
  ...props /* Spread props to allow for Typography specific props TypographyProps e.g. "gutterBottom" or "noWrap". */
}: SubTitleProps): JSX.Element => {
  return (
    <>
      {typeof subTitle === "string" ? (
        <Typography
          color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
          variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}
          {...props}
        >
          {subTitle}
        </Typography>
      ) : (
        subTitle
      )}
    </>
  );
};
