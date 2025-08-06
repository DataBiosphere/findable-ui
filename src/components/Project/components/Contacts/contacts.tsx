import { Link as EmailLink, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../styles/common/mui/typography";
import { CollapsableSection } from "../../../common/Section/components/CollapsableSection/collapsableSection";
import { SectionDetailsEmpty } from "../../../common/Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { SectionContentListItem } from "../../../common/Section/section.styles";
import { Contact } from "../../common/entities";

export interface ContactsProps {
  contacts?: Contact[];
}

export const Contacts = ({ contacts }: ContactsProps): JSX.Element => {
  return (
    <CollapsableSection collapsable title="Contact">
      {contacts ? (
        contacts.map(({ email, institution, name }, c) => (
          <SectionContentListItem key={`${name}${c}`}>
            <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_500_2_LINES}>
              {name}
            </Typography>
            {institution && <span>{institution}</span>}
            {email && (
              <Link href={`mailto:${email}`} legacyBehavior passHref>
                <EmailLink>{email}</EmailLink>
              </Link>
            )}
          </SectionContentListItem>
        ))
      ) : (
        <SectionDetailsEmpty />
      )}
    </CollapsableSection>
  );
};
