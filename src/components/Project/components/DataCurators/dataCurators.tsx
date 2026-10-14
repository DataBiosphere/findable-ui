import { JSX } from "react";
import { CollapsableSection } from "../../../common/Section/components/CollapsableSection/collapsableSection";
import { SectionDetailsEmpty } from "../../../common/Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { DataCurator } from "../../common/entities";

/**
 * Props for the DataCurators component.
 */
export interface DataCuratorsProps {
  dataCurators?: DataCurator[];
}

/**
 * Data curators section of a project page.
 * @param props - Component props.
 * @param props.dataCurators - Data curator names.
 * @returns The data curators section, or an empty state when not given or empty.
 */
export const DataCurators = ({
  dataCurators,
}: DataCuratorsProps): JSX.Element => {
  return (
    <CollapsableSection collapsable title="Data Curators">
      {dataCurators?.length ? (
        <div>
          {dataCurators.map((name, n) => (
            <div key={`${name}${n}`}>{name}</div>
          ))}
        </div>
      ) : (
        <SectionDetailsEmpty />
      )}
    </CollapsableSection>
  );
};
