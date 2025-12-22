import { Typography } from "@mui/material";
import { JSX } from "react";
import { CollapsableSection } from "../../../common/Section/components/CollapsableSection/collapsableSection";
import { SectionDetailsEmpty } from "../../../common/Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { ANCHOR_TARGET } from "../../../Links/common/entities";
import { Link } from "../../../Links/components/Link/link";
import { Publication } from "../../common/entities";

export interface PublicationsProps {
  publications?: Publication[];
}

export const Publications = ({
  publications,
}: PublicationsProps): JSX.Element => {
  return (
    <CollapsableSection collapsable title="Publications">
      {publications ? (
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
