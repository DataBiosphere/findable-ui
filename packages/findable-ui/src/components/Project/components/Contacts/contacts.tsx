import { Link as EmailLink, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
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
            <Typography variant="text-body-500-2lines">{name}</Typography>
            {institution && <span>{institution}</span>}
            {email && (
              <Link href={`mailto:${email}`} passHref>
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
