import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";
import React from "react";
import { EntityDetailViewProps } from "views/EntityDetailView/entityDetailView";
import { PARAMS_INDEX_EXPORT_METHOD } from "../../common/constants";
import { ComponentCreator } from "../../components/ComponentCreator/ComponentCreator";
import { BackPageView } from "../../components/Layout/components/BackPage/backPageView";
import { ExportMethodConfig } from "../../config/entities";
import { useEntityExportConfig } from "../../hooks/useEntityExportConfig";
import { useFetchEntity } from "../../hooks/useFetchEntity";
import { useUpdateURLCatalogParams } from "../../hooks/useUpdateURLCatalogParam";

export const EntityExportMethodView = (
  props: EntityDetailViewProps,
): JSX.Element => {
  // Update the catalog param if necessary.
  useUpdateURLCatalogParams();

  // Grab the entity to be exported.
  const { response } = useFetchEntity(props);

  // Get the column definitions for the entity export.
  const { query } = useRouter();
  const { exportMethods, tabs } = useEntityExportConfig();
  const { sideColumn } = tabs[0];
  const { mainColumn, top } = getExportMethodConfig(exportMethods, query) || {};

  // Wait for the entity to be fetched.
  if (!response) {
    return <span></span>;
  }

  return (
    <BackPageView
      mainColumn={
        <ComponentCreator components={mainColumn || []} response={response} />
      }
      sideColumn={
        sideColumn ? (
          <ComponentCreator components={sideColumn} response={response} />
        ) : undefined
      }
      top={<ComponentCreator components={top || []} response={response} />}
    />
  );
};

/**
 * Returns the export method configuration for the given pathname.
 * @param exportMethods - Export methods config.
 * @param query - Router query object.
 * @returns export method configuration.
 */
function getExportMethodConfig(
  exportMethods: ExportMethodConfig[],
  query: ParsedUrlQuery,
): ExportMethodConfig | undefined {
  // Determine the selected export method from the URL.
  const exportMethodRoute = query.params?.[PARAMS_INDEX_EXPORT_METHOD];
  if (!exportMethodRoute) {
    return;
  }
  // Find the config for the selected export method.
  return exportMethods.find(({ route }) => {
    return route.includes(exportMethodRoute);
  });
}
