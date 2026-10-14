import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { JSX } from "react";
import { OnFilterFn } from "../../../../../../hooks/useCategoryFilter";
import { CheckedIcon } from "../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { ErrorIcon } from "../../../../../common/CustomIcon/components/ErrorIcon/errorIcon";
import { UncheckedErrorIcon } from "../../../../../common/CustomIcon/components/UncheckedErrorIcon/uncheckedErrorIcon";
import { UncheckedIcon } from "../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { FormFileFacet } from "../../../../common/entities";
import { ERROR, OnClearError } from "../../exportForm";
import { FormControl } from "../../exportForm.styles";

/**
 * Props for the ExportSpeciesForm component.
 */
export interface ExportSpeciesFormProps {
  error: boolean;
  onClearError: OnClearError;
  onFilter: OnFilterFn;
  speciesFacet: FormFileFacet;
}

/**
 * Species selection for the export form. Changing a selection clears the error.
 * @param props - Component props.
 * @param props.error - Whether no species is selected on submit; shows the error message.
 * @param props.onClearError - Clears the species error.
 * @param props.onFilter - Toggles a species.
 * @param props.speciesFacet - Species facet; its form label falls back to "Species".
 * @returns The species form.
 */
export const ExportSpeciesForm = ({
  error,
  onClearError,
  onFilter,
  speciesFacet,
}: ExportSpeciesFormProps): JSX.Element => {
  return (
    <FormControl error={error}>
      <FormLabel>{speciesFacet.formLabel || "Species"}</FormLabel>
      {error && (
        <FormHelperText>
          <ErrorIcon fontSize="xxsmall" />
          <span>
            Please select at least one {speciesFacet.formLabel || "Species"} to
            continue
          </span>
        </FormHelperText>
      )}
      <FormGroup>
        {speciesFacet.terms.map(({ name, selected }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={selected}
                checkedIcon={<CheckedIcon />}
                icon={error ? <UncheckedErrorIcon /> : <UncheckedIcon />}
                onChange={(): void => {
                  onClearError(error, ERROR.SPECIES_ERROR);
                  onFilter(speciesFacet.name, name, selected);
                }}
              />
            }
            key={name}
            label={name}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};
