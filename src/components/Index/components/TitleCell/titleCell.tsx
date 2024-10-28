import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { TEXT_BODY_400 } from "../../../../theme/common/typography";
import { Link, LinkProps } from "../../../Links/components/Link/link";
import { TitleCell as Cell } from "./titleCell.styles";

export interface TitleCellProps extends Omit<LinkProps, "title"> {
  title: ReactNode;
}

export const TitleCell = ({ title, ...props }: TitleCellProps): JSX.Element => {
  return (
    <Cell gridSx={{ gap: 1 }}>
      {typeof title === "string" ? (
        <Typography variant={TEXT_BODY_400}>{title}</Typography>
      ) : (
        title
      )}
      <Link {...props} />
    </Cell>
  );
};
