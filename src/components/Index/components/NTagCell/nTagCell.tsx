import {
  Chip as MChip,
  ChipProps as MChipProps,
  Typography,
} from "@mui/material";
import React, { forwardRef } from "react";
import { TEXT_BODY_SMALL_400 } from "../../../../theme/common/typography";
import { TypographyProps } from "../../../common/Typography/common/entities";
import { NTag } from "../NTag/nTag";

// Template constants
const MAX_DISPLAYABLE_VALUES = 1;

export type MetadataValue = string;

export interface NTagCellProps {
  label: string;
  TypographyProps?: TypographyProps;
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

/**
 * @deprecated - use NTagCell from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/NTagCell/nTagCell"
 */

export const NTagCell = ({
  label,
  TypographyProps,
  values,
}: NTagCellProps): JSX.Element => {
  const metadataCount = values.length;
  const showNTag = metadataCount > MAX_DISPLAYABLE_VALUES;
  return (
    <>
      {showNTag ? (
        <NTag
          Tag={<Tag label={`${metadataCount} ${label}`} variant="ntag" />}
          TooltipTitle={
            <Typography display="block" variant={TEXT_BODY_SMALL_400}>
              {stringifyMetadataValues(values)}
            </Typography>
          }
        />
      ) : (
        values.map((value, v) => (
          <Typography
            key={`${value}${v}`}
            variant="inherit"
            {...TypographyProps}
          >
            {value}
          </Typography>
        ))
      )}
    </>
  );
};
