import { useRouter } from "next/router";
import React from "react";
import { ComponentCreator } from "../../components/ComponentCreator/ComponentCreator";
import { BackPageView } from "../../components/Layout/components/BackPage/backPageView";
import { ExportMethodConfig } from "../../config/entities";
import { useExportConfig } from "../../hooks/useExportConfig";
import { useUpdateURLSearchParams } from "../../hooks/useUpdateURLSearchParams";

export const ExportMethodView = (): JSX.Element => {
  useUpdateURLSearchParams();
  const { pathname } = useRouter();
  const { exportMethods, tabs } = useExportConfig();
  const { sideColumn } = tabs[0];
  const { mainColumn, top } =
    getExportMethodConfig(exportMethods, pathname) || {};
  return (
    <BackPageView
      mainColumn={
        <ComponentCreator components={mainColumn || []} response={{}} />
      }
      sideColumn={
        sideColumn ? (
          <ComponentCreator components={sideColumn} response={{}} />
        ) : undefined
      }
      top={<ComponentCreator components={top || []} response={{}} />}
    />
  );
};

/**
 * Returns the export method configuration for the given pathname.
 * @param exportMethods - Export methods config.
 * @param pathname - Pathname.
 * @returns export method configuration.
 */
function getExportMethodConfig(
  exportMethods: ExportMethodConfig[],
  pathname: string,
): ExportMethodConfig | undefined {
  return exportMethods.find(({ route }) => route === pathname);
}
