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

export interface ExportSpeciesFormProps {
  error: boolean;
  onClearError: OnClearError;
  onFilter: OnFilterFn;
  speciesFacet: FormFileFacet;
}

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
