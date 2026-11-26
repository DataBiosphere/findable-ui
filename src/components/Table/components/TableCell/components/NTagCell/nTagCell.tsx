import { Typography } from "@mui/material";
import type { JSX } from "react";
import { NTagChip } from "../../../../../../contracts/cc/NTagChip/nTagChip";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { TypographyProps } from "../../../../../common/Typography/common/entities";
import { NTag } from "./components/NTag/nTag";

// Template constants
const MAX_DISPLAYABLE_VALUES = 1;

export type MetadataValue = string;

/**
 * Props for the NTagCell component.
 */
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
 * NTag cell, rendering a single value as text, or more than one value as an "N label" tag with a tooltip listing the values.
 * @param props - Component props.
 * @param props.label - Label following the value count in the tag, e.g. "species".
 * @param props.TypographyProps - Mui Typography props applied to each value's text, overriding the inherited variant; not applied to the tag.
 * @param props.values - Metadata values.
 * @returns The value text, the tag, or nothing when there are no values.
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
          Tag={<NTagChip label={`${metadataCount} ${label}`} />}
          TooltipTitle={
            <Typography
              display="block"
              variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}
            >
              {stringifyMetadataValues(values)}
            </Typography>
          }
        />
      ) : (
        values.map((value, v) => (
          <Typography
            key={`${value}${v}`}
            variant={TYPOGRAPHY_PROPS.VARIANT.INHERIT}
            {...TypographyProps}
          >
            {value}
          </Typography>
        ))
      )}
    </>
  );
};
