import {
  FormControlLabel as MFormControlLabel,
  Radio as MRadio,
  RadioGroup as MRadioGroup,
  RadioGroupProps as MRadioGroupProps,
} from "@mui/material";
import { JSX } from "react";
import { RadioCheckedIcon } from "../CustomIcon/components/RadioCheckedIcon/radioCheckedIcon";
import { RadioUncheckedIcon } from "../CustomIcon/components/RadioUncheckedIcon/radioUncheckedIcon";

export type RadioGroupValue = MRadioGroupProps["value"]; // any
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Allows for any value to be used as a radio value.
export type RadioValue = any;
export type OnRadioChangeFn = (radioValue: RadioValue) => void; // Function invoked when selected radio value changes.

/**
 * Radio option in a RadioGroup.
 */
export interface Radio {
  disabled: boolean;
  label: string;
  value: RadioValue;
}

/**
 * Props for the RadioGroup component.
 */
export interface RadioGroupProps {
  className?: string;
  onRadioChange: OnRadioChangeFn;
  radios: Radio[];
  value: RadioGroupValue;
}

/**
 * Group of radio buttons, one per given radio, using the custom radio checked and unchecked icons.
 * @param props - Component props.
 * @param props.className - Class name applied to the radio group.
 * @param props.onRadioChange - Function invoked with the selected radio value when the selection changes.
 * @param props.radios - Radio options.
 * @param props.value - Selected radio value.
 * @returns The radio group.
 */
export const RadioGroup = ({
  className,
  onRadioChange,
  radios,
  value,
}: RadioGroupProps): JSX.Element => {
  return (
    <MRadioGroup
      className={className}
      onChange={(_, radioValue: RadioValue): void => onRadioChange(radioValue)}
      value={value}
    >
      {radios.map(({ disabled, label, value: radioValue }, r) => (
        <MFormControlLabel
          key={`${label}${r}`}
          control={
            <MRadio
              checkedIcon={<RadioCheckedIcon />}
              icon={<RadioUncheckedIcon />}
              size="small"
            />
          }
          disabled={disabled}
          label={label}
          value={radioValue}
        />
      ))}
    </MRadioGroup>
  );
};
