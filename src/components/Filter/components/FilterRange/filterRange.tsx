import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { Fragment } from "react";
import { TEST_IDS } from "../../../../tests/testIds";
import { SouthIcon } from "../../../common/CustomIcon/components/SouthIcon/southIcon";
import {
  FilterViewTools,
  StyledButtonBase,
} from "../FilterMenu/filterMenu.styles";
import {
  BUTTON_PROPS,
  DIVIDER_PROPS,
  INPUT_LABEL_PROPS,
  INPUT_PROPS,
  TOGGLE_BUTTON_GROUP_PROPS,
} from "./constants";
import { StyledForm } from "./filterRange.styles";
import { FIELD_NAME } from "./hooks/UseFilterRange/constants";
import { useFilterRange } from "./hooks/UseFilterRange/hook";
import { RANGE_OPERATOR } from "./hooks/UseFilterRange/types";
import { FilterRangeProps } from "./types";
import { getRangeOperator } from "./utils";

export const FilterRange = ({
  categoryKey,
  categoryLabel,
  categorySection,
  className,
  isFilterDrawer,
  max,
  min,
  onCloseFilter,
  onFilter,
  selectedMax,
  selectedMin,
  unit,
}: FilterRangeProps): JSX.Element => {
  const rangeOperator = getRangeOperator({ selectedMax, selectedMin });
  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    onChange,
    value,
  } = useFilterRange(rangeOperator);
  return (
    <Fragment>
      {isFilterDrawer && (
        <FilterViewTools>
          <StyledButtonBase onClick={onCloseFilter}>
            <SouthIcon fontSize="small" />
            {categoryLabel}
          </StyledButtonBase>
        </FilterViewTools>
      )}
      <StyledForm
        className={className}
        data-testid={TEST_IDS.FILTER_RANGE}
        onSubmit={handleSubmit(onFilter, {
          categoryKey,
          categorySection,
        })}
      >
        <ToggleButtonGroup
          {...TOGGLE_BUTTON_GROUP_PROPS}
          onChange={(e, value) => {
            clearErrors();
            onChange?.(e, value);
          }}
          value={value}
        >
          <ToggleButton value={RANGE_OPERATOR.BETWEEN}>Between</ToggleButton>
          <ToggleButton value={RANGE_OPERATOR.LESS_THAN}>
            Less Than
          </ToggleButton>
          <Divider {...DIVIDER_PROPS} />
          <ToggleButton value={RANGE_OPERATOR.GREATER_THAN}>
            Greater Than
          </ToggleButton>
        </ToggleButtonGroup>
        <Grid>
          {value !== RANGE_OPERATOR.LESS_THAN && (
            <FormControl error={!!errors[FIELD_NAME.MIN]}>
              <InputLabel {...INPUT_LABEL_PROPS} htmlFor={FIELD_NAME.MIN}>
                {value === RANGE_OPERATOR.BETWEEN ? "Min" : "Greater Than"}
                {unit && ` (${unit})`}
              </InputLabel>
              <OutlinedInput
                {...INPUT_PROPS}
                defaultValue={selectedMin}
                name={FIELD_NAME.MIN}
                onFocus={clearErrors}
                placeholder="eg. 1"
              />
              <FormHelperText>
                {errors[FIELD_NAME.MIN]
                  ? errors[FIELD_NAME.MIN]
                  : value === RANGE_OPERATOR.BETWEEN
                  ? `Min allowed: ${min}`
                  : `Allowed values: \u2265 ${min} and \u2264 ${max}`}
              </FormHelperText>
            </FormControl>
          )}
          {value === RANGE_OPERATOR.BETWEEN && <Divider />}
          {value !== RANGE_OPERATOR.GREATER_THAN && (
            <FormControl error={!!errors[FIELD_NAME.MAX]}>
              <InputLabel {...INPUT_LABEL_PROPS} htmlFor={FIELD_NAME.MAX}>
                {value === RANGE_OPERATOR.BETWEEN ? "Max" : "Less Than"}
                {unit && ` (${unit})`}
              </InputLabel>
              <OutlinedInput
                {...INPUT_PROPS}
                defaultValue={selectedMax}
                name={FIELD_NAME.MAX}
                onFocus={clearErrors}
                placeholder="eg. 20"
              />
              <FormHelperText color="inkLight">
                {errors[FIELD_NAME.MAX]
                  ? errors[FIELD_NAME.MAX]
                  : value === RANGE_OPERATOR.BETWEEN
                  ? `Max allowed: ${max}`
                  : `Allowed values: \u2265 ${min} and \u2264 ${max}`}
              </FormHelperText>
            </FormControl>
          )}
        </Grid>
        <Button {...BUTTON_PROPS}>Filter</Button>
      </StyledForm>
    </Fragment>
  );
};
