import React from "react";
import { AzulEntityStaticResponse } from "../../apis/azul/common/entities";
import { ComponentCreator } from "../../components/ComponentCreator/ComponentCreator";
import { BackPageView } from "../../components/Layout/components/BackPage/backPageView";
import { useExportConfig } from "../../hooks/useExportConfig";

export type ExportViewProps = AzulEntityStaticResponse;

export const ExportView = (props: ExportViewProps): JSX.Element => {
  const exportConfig = useExportConfig();
  const currentTab = exportConfig.tabs[0];
  const mainColumn = currentTab.mainColumn;
  const sideColumn = currentTab.sideColumn;
  const top = exportConfig.top;

  return (
    <BackPageView
      mainColumn={<ComponentCreator components={mainColumn} response={props} />}
      sideColumn={
        sideColumn ? (
          <ComponentCreator components={sideColumn} response={props} />
        ) : undefined
      }
      top={<ComponentCreator components={top} response={props} />}
    />
  );
};
