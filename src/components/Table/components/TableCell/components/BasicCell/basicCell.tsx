import { Typography } from "@mui/material";
import React, { Fragment, ReactNode } from "react";
import { LABEL } from "../../../../../../apis/azul/common/entities";
import { TypographyProps } from "../../../../../common/Typography/common/entities";

export interface BasicCellProps {
  TypographyProps?: TypographyProps;
  value?: ReactNode;
}

export const BasicCell = ({
  TypographyProps,
  value = LABEL.UNSPECIFIED,
}: BasicCellProps): JSX.Element | null => {
  if (isValueNumberOrString(value)) {
    return (
      <Typography variant="inherit" {...TypographyProps}>
        {value}
      </Typography>
    );
  }
  if (isValueArray(value)) {
    return (
      <Fragment>
        {value.map((v: number | string) => (
          <Typography key={v} variant="inherit" {...TypographyProps}>
            {v}
          </Typography>
        ))}
      </Fragment>
    );
  }
  return null;
};

/**
 * Returns true if value is an array of strings.
 * @param value - Value.
 * @returns value is an array of strings.
 */
function isValueArray(value: ReactNode): value is (number | string)[] {
  return Array.isArray(value) && value.every(isValueNumberOrString);
}

/**
 * Returns true if value is a number or a string.
 * @param value - Value.
 * @returns true if value is a number or a string.
 */
function isValueNumberOrString(value: ReactNode): value is number | string {
  return typeof value === "number" || typeof value === "string";
}
