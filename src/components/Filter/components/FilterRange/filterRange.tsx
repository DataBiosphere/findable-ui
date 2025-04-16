import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { Fragment } from "react";
import { TEST_IDS } from "../../../../tests/testIds";
import {
  BUTTON_PROPS,
  DIVIDER_PROPS,
  INPUT_LABEL_PROPS,
  INPUT_PROPS,
  RANGE_OPERATOR_DISPLAY,
  TOGGLE_BUTTON_GROUP_PROPS,
} from "./constants";
import { StyledForm } from "./filterRange.styles";
import { useFilterRange } from "./hooks/UseFilterRange/hook";
import { FilterRangeProps, RANGE_OPERATOR } from "./types";

export const FilterRange = ({ className }: FilterRangeProps): JSX.Element => {
  const { onChange, onSubmit, value } = useFilterRange();
  return (
    <StyledForm
      className={className}
      data-testid={TEST_IDS.FILTER_RANGE}
      onSubmit={onSubmit}
    >
      <ToggleButtonGroup
        {...TOGGLE_BUTTON_GROUP_PROPS}
        onChange={onChange}
        value={value}
      >
        <ToggleButton value={RANGE_OPERATOR.BETWEEN}>Between</ToggleButton>
        <ToggleButton value={RANGE_OPERATOR.LESS_THAN}>Less Than</ToggleButton>
        <Divider {...DIVIDER_PROPS} />
        <ToggleButton value={RANGE_OPERATOR.GREATER_THAN}>
          Greater Than
        </ToggleButton>
      </ToggleButtonGroup>
      <Grid>
        <FormControl>
          <InputLabel {...INPUT_LABEL_PROPS} htmlFor={value}>
            {RANGE_OPERATOR_DISPLAY[value]}
          </InputLabel>
          <OutlinedInput {...INPUT_PROPS} name={value} placeholder="eg. 1" />
        </FormControl>
        {value === RANGE_OPERATOR.BETWEEN && (
          <Fragment>
            <Divider />
            <FormControl>
              <InputLabel {...INPUT_LABEL_PROPS} htmlFor="between-to">
                To
              </InputLabel>
              <OutlinedInput
                {...INPUT_PROPS}
                name="between-to"
                placeholder="eg. 2"
              />
            </FormControl>
          </Fragment>
        )}
      </Grid>
      <Button {...BUTTON_PROPS}>Filter</Button>
    </StyledForm>
  );
};
