import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import {
  Key,
  KeyValuePairs,
  KeyValues,
} from "../../../common/KeyValuePairs/keyValuePairs";
import { CollapsableSection } from "../../../common/Section/components/CollapsableSection/collapsableSection";
import { SectionDetailsEmpty } from "../../../common/Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { Stack } from "../../../common/Stack/stack";

export interface DetailsProps {
  keyValuePairs?: KeyValues;
  title: string;
}

/**
 * Wrapper element around the key.
 * @param props - Set of values accepted by this component as props.
 * @param props.children - Key component children.
 * @returns typography component with color "ink.light".
 */
function renderKey(props: { children: Key }): JSX.Element {
  return <Typography color="ink.light">{props.children}</Typography>;
}

export const Details = ({
  keyValuePairs,
  title,
}: DetailsProps): JSX.Element => {
  return (
    <CollapsableSection collapsable title={title}>
      {keyValuePairs ? (
        <KeyValuePairs
          KeyElType={renderKey}
          keyValuePairs={keyValuePairs}
          KeyValuesElType={Fragment}
          KeyValueElType={Stack}
        />
      ) : (
        <SectionDetailsEmpty />
      )}
    </CollapsableSection>
  );
};
