import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { JSX } from "react";
import { formatCountSize } from "../../../../../../utils/formatCountSize";
import { formatFileSize } from "../../../../../../utils/formatFileSize";
import { CheckedIcon } from "../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { ErrorIcon } from "../../../../../common/CustomIcon/components/ErrorIcon/errorIcon";
import { UncheckedErrorIcon } from "../../../../../common/CustomIcon/components/UncheckedErrorIcon/uncheckedErrorIcon";
import { UncheckedIcon } from "../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { GridTable } from "../../../../../Table/common/gridTable.styles";
import { FileSummaryFacet } from "../../../../common/entities";
import { OnFilterFn, OnUpdateFilterFacet } from "../../common/entities";
import { ERROR, OnClearError } from "../../exportForm";
import {
  TableFormControl as FormControl,
  GridPaper,
} from "../../exportForm.styles";

/**
 * Props for the ExportFileSummaryForm component.
 */
export interface ExportFileSummaryFormProps {
  error: boolean;
  fileSummaryFacet: FileSummaryFacet;
  onClearError: OnClearError;
  onFilter: OnFilterFn;
  onUpdateFilterFacet: OnUpdateFilterFacet;
}

/**
 * File type selection for the export form: a table of file types with their
 * file counts, and file sizes when any file type has a size. The header
 * checkbox selects or clears all file types. Changing a selection clears the
 * error.
 * @param props - Component props.
 * @param props.error - Whether no file type is selected on submit; shows the error message.
 * @param props.fileSummaryFacet - File type facet; its form label falls back to "File Type".
 * @param props.onClearError - Clears the file type error.
 * @param props.onFilter - Toggles a file type.
 * @param props.onUpdateFilterFacet - Selects or clears all file types.
 * @returns The file type form.
 */
export const ExportFileSummaryForm = ({
  error,
  fileSummaryFacet,
  onClearError,
  onFilter,
  onUpdateFilterFacet,
}: ExportFileSummaryFormProps): JSX.Element => {
  const hasFileSize = isFileSummaryFacet(fileSummaryFacet);
  const gridTemplateColumns = hasFileSize ? "1fr auto auto" : "1fr auto";
  return (
    <FormControl error={error}>
      <FormLabel>{fileSummaryFacet.formLabel || "File Type"}</FormLabel>
      {error && (
        <FormHelperText>
          <ErrorIcon fontSize="xxsmall" />
          <span>
            Please select at least one{" "}
            {fileSummaryFacet.formLabel || "File Type"} to continue
          </span>
        </FormHelperText>
      )}
      <GridPaper>
        <GridTable gridTemplateColumns={gridTemplateColumns}>
          <TableHead>
            <TableRow>
              <TableCell>
                <FormControlLabel
                  label="Name"
                  control={
                    <Checkbox
                      checked={
                        fileSummaryFacet.selectedTermCount ===
                        fileSummaryFacet.termCount
                      }
                      checkedIcon={<CheckedIcon />}
                      icon={error ? <UncheckedErrorIcon /> : <UncheckedIcon />}
                      onChange={(): void => {
                        onClearError(error, ERROR.FILE_SUMMARY_ERROR);
                        onUpdateFilterFacet(fileSummaryFacet.name);
                      }}
                    />
                  }
                />
              </TableCell>
              <TableCell>File Count</TableCell>
              {hasFileSize && <TableCell>File Size</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {fileSummaryFacet.terms.map(
              ({ count, name, selected, size = 0 }) => (
                <TableRow key={name}>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selected}
                          checkedIcon={<CheckedIcon />}
                          icon={
                            error ? <UncheckedErrorIcon /> : <UncheckedIcon />
                          }
                          onChange={(): void => {
                            onClearError(error, ERROR.FILE_SUMMARY_ERROR);
                            onFilter(fileSummaryFacet.name, name, selected);
                          }}
                        />
                      }
                      key={name}
                      label={name}
                    />
                  </TableCell>
                  <TableCell>{formatCountSize(count)}</TableCell>
                  {hasFileSize && <TableCell>{formatFileSize(size)}</TableCell>}
                </TableRow>
              ),
            )}
          </TableBody>
        </GridTable>
      </GridPaper>
    </FormControl>
  );
};

/**
 * Returns true if the file summary facet has file size.
 * @param fileSummaryFacet - File summary facet.
 * @returns true if the file summary facet has file size.
 */
function isFileSummaryFacet(fileSummaryFacet: FileSummaryFacet): boolean {
  return fileSummaryFacet.terms.some(({ size }) => size !== undefined);
}
