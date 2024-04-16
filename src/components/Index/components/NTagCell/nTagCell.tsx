import {
  Chip as MChip,
  ChipProps as MChipProps,
  Typography,
} from "@mui/material";
import React, { forwardRef } from "react";
import { NTag } from "../NTag/nTag";

// Template constants
const MAX_DISPLAYABLE_VALUES = 1;

export type MetadataValue = string;

export interface NTagCellProps {
  label: string;
  values: MetadataValue[];
}

/**
 * String-concatenates the specified list of metadata values to a string value, joined by a comma ",".
 * @param metadataValues - List of metadata values.
 * @returns the metadata values in a string, each value joined by a comma.
 */
function stringifyMetadataValues(metadataValues: MetadataValue[]): string {
  return metadataValues.join(", ");
}

/**
 * Renders tag for NTag component.
 * Tooltip children require forward ref.
 */
const Tag = forwardRef<HTMLDivElement, MChipProps>(function Tag(props, ref) {
  return <MChip ref={ref} {...props} />;
});

export const NTagCell = ({ label, values }: NTagCellProps): JSX.Element => {
  const metadataCount = values.length;
  const showNTag = metadataCount > MAX_DISPLAYABLE_VALUES;
  return (
    <>
      {showNTag ? (
        <NTag
          Tag={<Tag label={`${metadataCount} ${label}`} variant="ntag" />}
          TooltipTitle={
            <Typography display="block" variant="text-body-small-400">
              {stringifyMetadataValues(values)}
            </Typography>
          }
        />
      ) : (
        values.map((value, v) => <div key={`${value}${v}`}>{value}</div>)
      )}
    </>
  );
};
