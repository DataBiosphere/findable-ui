import { JSX } from "react";
import { CollapsableSection } from "../../../common/Section/components/CollapsableSection/collapsableSection";
import { SectionDetailsEmpty } from "../../../common/Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { DataCurator } from "../../common/entities";

export interface DataCuratorsProps {
  dataCurators?: DataCurator[];
}

export const DataCurators = ({
  dataCurators,
}: DataCuratorsProps): JSX.Element => {
  return (
    <CollapsableSection collapsable title="Data Curators">
      {dataCurators ? (
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
