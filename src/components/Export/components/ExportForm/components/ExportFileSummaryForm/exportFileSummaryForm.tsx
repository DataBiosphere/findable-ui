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
import React, { Fragment } from "react";
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
  GridPaper,
  TableFormControl as FormControl,
} from "../../exportForm.styles";

export interface ExportFileSummaryFormProps {
  error: boolean;
  fileSummaryFacet: FileSummaryFacet;
  onClearError: OnClearError;
  onFilter: OnFilterFn;
  onUpdateFilterFacet: OnUpdateFilterFacet;
}

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
            <TableRow>
              {fileSummaryFacet.terms.map(
                ({ count, name, selected, size = 0 }) => (
                  <Fragment key={name}>
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
                    {hasFileSize && (
                      <TableCell>{formatFileSize(size)}</TableCell>
                    )}
                  </Fragment>
                )
              )}
            </TableRow>
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
