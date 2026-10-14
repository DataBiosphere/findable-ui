import { JSX } from "react";
import { CollapsableSection } from "../../../common/Section/components/CollapsableSection/collapsableSection";
import { SectionDetailsEmpty } from "../../../common/Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { CollaboratingOrganization } from "../../common/entities";
import { Sup } from "../Sup/sup.styles";

/**
 * Props for the CollaboratingOrganizations component.
 */
export interface CollaboratingOrganizationsProps {
  collaboratingOrganizations?: CollaboratingOrganization[];
}

/**
 * Collaborating organizations section of a project page.
 * @param props - Component props.
 * @param props.collaboratingOrganizations - Collaborating organizations.
 * @returns The collaborating organizations section, or an empty state when not given or empty.
 */
export const CollaboratingOrganizations = ({
  collaboratingOrganizations,
}: CollaboratingOrganizationsProps): JSX.Element => {
  return (
    <CollapsableSection collapsable title="Collaborating Organizations">
      {collaboratingOrganizations?.length ? (
        <div>
          {collaboratingOrganizations.map(({ citation, name }, c) => (
            <div key={`${name}${c}`}>
              <Sup>{citation}</Sup>
              <span>{name}</span>
            </div>
          ))}
        </div>
      ) : (
        <SectionDetailsEmpty />
      )}
    </CollapsableSection>
  );
};
