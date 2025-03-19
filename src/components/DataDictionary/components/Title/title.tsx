import React from "react";
import { TitleProps } from "../../../common/Title/title";
import { StyledTitle } from "./title.styles";

export const Title = ({
  title = "Data Dictionary",
  ...props
}: TitleProps): JSX.Element => <StyledTitle title={title} {...props} />;
