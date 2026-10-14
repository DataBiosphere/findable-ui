import { JSX } from "react";
import { CollapsableSection } from "../../../common/Section/components/CollapsableSection/collapsableSection";
import { SectionDetailsEmpty } from "../../../common/Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { Contributor } from "../../common/entities";
import { Sup } from "../Sup/sup.styles";

/**
 * Props for the Contributors component.
 */
export interface ContributorsProps {
  contributors?: Contributor[];
}

/**
 * Contributors section of a project page.
 * @param props - Component props.
 * @param props.contributors - Contributors.
 * @returns The contributors section, or an empty state when not given or empty.
 */
export const Contributors = ({
  contributors,
}: ContributorsProps): JSX.Element => {
  return (
    <CollapsableSection collapsable title="Contributors">
      {contributors?.length ? (
        <div>
          {contributors.map(({ citation, name, role }, c) => (
            <div key={`${name}${c}`}>
              <span>{name}</span>
              {role && <span> ({role})</span>}
              {citation && <Sup>{citation}</Sup>}
            </div>
          ))}
        </div>
      ) : (
        <SectionDetailsEmpty />
      )}
    </CollapsableSection>
  );
};
