import React from "react";
import { EntityDetailViewProps } from "views/EntityDetailView/entityDetailView";
import { ComponentCreator } from "../../components/ComponentCreator/ComponentCreator";
import { BackPageView } from "../../components/Layout/components/BackPage/backPageView";
import { useEntityExportConfig } from "../../hooks/useEntityExportConfig";
import { useFetchEntity } from "../../hooks/useFetchEntity";
import { useUpdateURLCatalogParams } from "../../hooks/useUpdateURLCatalogParam";

export const EntityExportView = (props: EntityDetailViewProps): JSX.Element => {
  // Update the catalog param if necessary.
  useUpdateURLCatalogParams();

  // Grab the entity to be exported.
  const { response } = useFetchEntity(props);

  // Get the column definitions for the entity export.
  const { tabs, top } = useEntityExportConfig();
  const currentTab = tabs[0];
  const { mainColumn, sideColumn } = currentTab;

  // Wait for the entity to be fetched.
  if (!response) {
    return <span></span>;
  }

  return (
    <BackPageView
      mainColumn={
        <ComponentCreator components={mainColumn} response={response} />
      }
      sideColumn={
        sideColumn ? (
          <ComponentCreator components={sideColumn} response={response} />
        ) : undefined
      }
      top={<ComponentCreator components={top} response={response} />}
    />
  );
};
