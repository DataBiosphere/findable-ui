import React from "react";
import { CollapsableSection } from "../../../common/Section/components/CollapsableSection/collapsableSection";
import { SectionDetailsEmpty } from "../../../common/Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { CollaboratingOrganization } from "../../common/entities";
import { Sup } from "../Sup/sup.styles";

export interface CollaboratingOrganizationsProps {
  collaboratingOrganizations?: CollaboratingOrganization[];
}

export const CollaboratingOrganizations = ({
  collaboratingOrganizations,
}: CollaboratingOrganizationsProps): JSX.Element => {
  return (
    <CollapsableSection collapsable title="Collaborating Organizations">
      {collaboratingOrganizations ? (
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
