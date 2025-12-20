import React, { ElementType, Fragment, ReactNode, useState } from "react";
import { CategoryKey, CategoryValueKey } from "../../../../common/entities";
import { useFileManifestState } from "../../../../hooks/useFileManifestState";
import { FileManifestActionKind } from "../../../../providers/fileManifestState";
import { PAPER_PANEL_STYLE } from "../../../common/Paper/paper";
import { Loading } from "../../../Loading/loading";
import {
  FileSummaryFacet,
  FormFacet,
  FormFileFacet,
} from "../../common/entities";
import { SectionActions, SectionForm } from "../../export.styles";
import { ExportFileSummaryForm } from "./components/ExportFileSummaryForm/exportFileSummaryForm";
import { ExportSpeciesForm } from "./components/ExportSpeciesForm/exportSpeciesForm";

const DEFAULT_ERROR_STATE = {
  fileSummaryError: false,
  speciesError: false,
};

export enum ERROR {
  FILE_SUMMARY_ERROR = "fileSummaryError",
  SPECIES_ERROR = "speciesError",
}

export type ErrorState = Record<ERROR, boolean>;

export type OnClearError = (isError: boolean, error: ERROR) => void;

export type OnRequestManifestFn = () => void;

export interface ExportFormProps {
  Button: ElementType;
  children?: ReactNode | ReactNode[];
  formFacet: FormFacet;
  isLoading: boolean;
  onRequestManifest: OnRequestManifestFn;
}

export const ExportForm = ({
  Button,
  children,
  formFacet,
  isLoading,
  onRequestManifest,
}: ExportFormProps): JSX.Element => {
  const [errorState, setErrorState] = useState<ErrorState>(DEFAULT_ERROR_STATE);
  const { fileManifestDispatch } = useFileManifestState();
  const { fileSummaryFacet, speciesFacet } = formFacet;

  // Clears error state.
  const onClearError = (isError: boolean, error: ERROR): void => {
    if (!isError) {
      return;
    }
    setErrorState((state) => ({ ...state, [error]: false }));
  };

  // Updates file manifest filter state.
  const onFilter = (
    categoryKey: CategoryKey,
    selectedCategoryValue: CategoryValueKey,
    selected: boolean,
  ): void => {
    fileManifestDispatch({
      payload: {
        categoryKey,
        selected: !selected,
        selectedValue: selectedCategoryValue,
      },
      type: FileManifestActionKind.UpdateFilter,
    });
  };

  // Submits file manifest request.
  const onSubmit = (): void => {
    const fileSummaryError = !isFacetSelected(fileSummaryFacet);
    const speciesError = !isFacetSelected(speciesFacet);
    // If any errors, set error state and return.
    if (fileSummaryError || speciesError) {
      setErrorState({ fileSummaryError, speciesError });
      return;
    }
    // Otherwise, request manifest.
    onRequestManifest();
  };

  // Updates file manifest filter state by selected category key.
  const onUpdateFilterFacet = (categoryKey: CategoryKey): void => {
    fileManifestDispatch({
      payload: categoryKey,
      type: FileManifestActionKind.UpdateFiltersCategory,
    });
  };

  return (
    <Fragment>
      <SectionForm>
        <Loading loading={isLoading} panelStyle={PAPER_PANEL_STYLE.NONE} />
        {/* Render form when all facets are available. */}
        {speciesFacet && fileSummaryFacet && (
          <>
            <ExportSpeciesForm
              error={errorState.speciesError}
              onClearError={onClearError}
              onFilter={onFilter}
              speciesFacet={speciesFacet}
            />
            <ExportFileSummaryForm
              error={errorState.fileSummaryError}
              fileSummaryFacet={fileSummaryFacet}
              onClearError={onClearError}
              onFilter={onFilter}
              onUpdateFilterFacet={onUpdateFilterFacet}
            />
            {children}
          </>
        )}
      </SectionForm>
      <SectionActions>
        <Button onClick={onSubmit} />
      </SectionActions>
    </Fragment>
  );
};

/**
 * Returns true if the facet has selected terms.
 * @param facet - Facet.
 * @returns true if the facet has selected terms.
 */
function isFacetSelected(
  facet: FormFileFacet | FileSummaryFacet | undefined,
): boolean {
  if (!facet) {
    return false;
  }
  return facet.selectedTermCount > 0;
}
