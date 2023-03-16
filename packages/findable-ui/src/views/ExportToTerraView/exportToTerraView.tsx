import React from "react";
import { AzulEntityStaticResponse } from "../../apis/azul/common/entities";
import { ComponentCreator } from "../../components/ComponentCreator/ComponentCreator";
import { BackPageView } from "../../components/Layout/components/BackPage/backPageView";
import { useExportConfig } from "../../hooks/useExportConfig";
import { MainColumn } from "./mainColumn";
import { SideColumn } from "./sideColumn";

export type ExportToTerraViewProps = AzulEntityStaticResponse;

export const ExportToTerraView = (
  props: ExportToTerraViewProps
): JSX.Element => {
  const exportConfig = useExportConfig();
  const top = exportConfig.top;

  return (
    <BackPageView
      mainColumn={<MainColumn />}
      sideColumn={<SideColumn />}
      top={<ComponentCreator components={top} response={props} />}
    />
  );
};
