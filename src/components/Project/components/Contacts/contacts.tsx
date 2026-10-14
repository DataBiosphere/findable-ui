import { Link, Typography } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../styles/common/mui/typography";
import { CollapsableSection } from "../../../common/Section/components/CollapsableSection/collapsableSection";
import { SectionDetailsEmpty } from "../../../common/Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { SectionContentListItem } from "../../../common/Section/section.styles";
import { Contact } from "../../common/entities";

/**
 * Props for the Contacts component.
 */
export interface ContactsProps {
  contacts?: Contact[];
}

/**
 * Contacts section of a project page.
 * @param props - Component props.
 * @param props.contacts - Contacts.
 * @returns The contacts section, or an empty state when not given or empty.
 */
export const Contacts = ({ contacts }: ContactsProps): JSX.Element => {
  return (
    <CollapsableSection collapsable title="Contact">
      {contacts?.length ? (
        contacts.map(({ email, institution, name }, c) => (
          <SectionContentListItem key={`${name}${c}`}>
            <Typography
              fontWeight={500}
              variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400_2_LINES}
            >
              {name}
            </Typography>
            {institution && <span>{institution}</span>}
            {email && <Link href={`mailto:${email}`}>{email}</Link>}
          </SectionContentListItem>
        ))
      ) : (
        <SectionDetailsEmpty />
      )}
    </CollapsableSection>
  );
};
