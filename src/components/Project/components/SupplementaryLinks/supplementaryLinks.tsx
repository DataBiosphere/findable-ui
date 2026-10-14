import { Typography } from "@mui/material";
import { Fragment, JSX } from "react";
import { CollapsableSection } from "../../../common/Section/components/CollapsableSection/collapsableSection";
import { SectionDetailsEmpty } from "../../../common/Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { Stack } from "../../../common/Stack/stack";
import { ANCHOR_TARGET } from "../../../Links/common/entities";
import { Link } from "../../../Links/components/Link/link";
import { SupplementaryLink } from "../../common/entities";
import {
  SupplementaryLink as EllipsisLink,
  Marker,
  SupplementaryList,
} from "./supplementaryLinks.styles";

/**
 * Props for the SupplementaryLinks component.
 */
export interface SupplementaryLinksProps {
  supplementaryLinks?: SupplementaryLink[];
}

/**
 * Supplementary links section of a project page.
 * @param props - Component props.
 * @param props.supplementaryLinks - Supplementary link URLs.
 * @returns The supplementary links section, or an empty state when not given or empty.
 */
export const SupplementaryLinks = ({
  supplementaryLinks,
}: SupplementaryLinksProps): JSX.Element => {
  return (
    <CollapsableSection collapsable title="Supplementary Links">
      {supplementaryLinks?.length ? (
        <Stack gap={2}>
          <Typography>
            Supplementary links are provided by contributors and represent items
            such as additional data which can’t be hosted here; code that was
            used to analyze this data; or tools and visualizations associated
            with this specific dataset.
          </Typography>
          <SupplementaryList>
            {supplementaryLinks.map((link, marker) => (
              <Fragment key={link}>
                <Marker>{marker + 1}.</Marker>
                <EllipsisLink>
                  <Link
                    copyable
                    label={link}
                    noWrap
                    target={ANCHOR_TARGET.BLANK}
                    url={link}
                  />
                </EllipsisLink>
              </Fragment>
            ))}
          </SupplementaryList>
        </Stack>
      ) : (
        <SectionDetailsEmpty />
      )}
    </CollapsableSection>
  );
};
