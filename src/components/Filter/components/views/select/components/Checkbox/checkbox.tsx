import { CheckboxProps, Checkbox as MCheckbox } from "@mui/material";
import React from "react";
import { CheckedIcon } from "../../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { BaseComponentProps } from "../../../../../../types";

export const Checkbox = ({
  className,
  ...props /* MuiCheckboxProps */
}: BaseComponentProps & CheckboxProps): JSX.Element => {
  return (
    <MCheckbox
      className={className}
      checkedIcon={<CheckedIcon />}
      icon={<UncheckedIcon />}
      {...props}
    />
  );
};
