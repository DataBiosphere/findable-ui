import { CheckboxProps, Checkbox as MCheckbox } from "@mui/material";
import { JSX } from "react";
import { CheckedIcon } from "../../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { BaseComponentProps } from "../../../../../../types";

/**
 * Checkbox with the custom checked and unchecked icons, out of the tab order: it sits inside a list item button, which is the item's one tab stop.
 * The given Mui Checkbox props override the defaults, including tabIndex: pass tabIndex={0} for a checkbox that isn't inside a list item button and needs its own tab stop.
 * @param props - Component props.
 * @param props.className - Class name applied to the checkbox.
 * @returns The checkbox.
 */
export const Checkbox = ({
  className,
  ...props /* MuiCheckboxProps */
}: BaseComponentProps & CheckboxProps): JSX.Element => {
  return (
    <MCheckbox
      className={className}
      checkedIcon={<CheckedIcon />}
      icon={<UncheckedIcon />}
      tabIndex={-1}
      {...props}
    />
  );
};
