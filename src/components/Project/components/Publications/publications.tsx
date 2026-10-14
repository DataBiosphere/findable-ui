import { Typography } from "@mui/material";
import { JSX } from "react";
import { CollapsableSection } from "../../../common/Section/components/CollapsableSection/collapsableSection";
import { SectionDetailsEmpty } from "../../../common/Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { ANCHOR_TARGET } from "../../../Links/common/entities";
import { Link } from "../../../Links/components/Link/link";
import { Publication } from "../../common/entities";

/**
 * Props for the Publications component.
 */
export interface PublicationsProps {
  publications?: Publication[];
}

/**
 * Publications section of a project page.
 * @param props - Component props.
 * @param props.publications - Publications.
 * @returns The publications section, or an empty state when not given or empty.
 */
export const Publications = ({
  publications,
}: PublicationsProps): JSX.Element => {
  return (
    <CollapsableSection collapsable title="Publications">
      {publications?.length ? (
        <div>
          {publications.map(
            (
              { officialHcaPublication, publicationTitle, publicationUrl },
              p,
            ) => (
              <Typography key={`${publicationTitle}${p}`}>
                <Link
                  label={publicationTitle}
                  target={ANCHOR_TARGET.BLANK}
                  url={publicationUrl}
                />
                {officialHcaPublication && (
                  <span> (Official HCA Publication)</span>
                )}
              </Typography>
            ),
          )}
        </div>
      ) : (
        <SectionDetailsEmpty />
      )}
    </CollapsableSection>
  );
};
