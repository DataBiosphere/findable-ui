import React from "react";
import {
  FluidPaper,
  GridPaper,
} from "../../components/common/Paper/paper.styles";
import { DataReleasePolicy } from "../../components/Project/components/DataReleasePolicy/dataReleasePolicy";

export const SideColumn = (): JSX.Element => {
  return (
    <FluidPaper>
      <GridPaper>
        <DataReleasePolicy />
      </GridPaper>
    </FluidPaper>
  );
};
