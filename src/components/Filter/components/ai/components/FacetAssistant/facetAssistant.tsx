import React, { FormEvent, useCallback, useState } from "react";
import { useExploreState } from "../../../../../../hooks/useExploreState";
import { ExploreActionKind } from "../../../../../../providers/exploreState";
import { getFormValue } from "../../../../../../utils/form";
import { EndAdornment } from "./components/EndAdornment/endAdornment";
import { getEndAdornmentType } from "./components/EndAdornment/utils";
import { OUTLINED_INPUT_PROPS } from "./constants";
import { StyledForm, StyledOutlinedInput } from "./facetAssistant.styles";
import { mapResponse } from "./utils";

/**
 * AI-powered facet assistant component.
 * Converts a user query into facet filters (PoC implementation).
 */

export const FacetAssistant = (): JSX.Element => {
  const { exploreDispatch } = useExploreState();
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();

      // Get the form value.
      const formValue = getFormValue(e, "query-to-facets");
      if (!formValue) return;

      setIsSubmitting(true);
      setIsError(false);

      try {
        const res = await fetch(
          "http://localhost:8000/api/v0/facets?mode=llm",
          {
            body: JSON.stringify({ query: formValue }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          }
        );

        if (!res.ok) {
          setIsError(true);
          return;
        }

        const data = await res.json();

        console.log("API Response:", data);

        // Map the response data to facet filters.
        const filters = mapResponse(data);

        // Dispatch the update entity filters action.
        exploreDispatch({
          payload: { filters },
          type: ExploreActionKind.UpdateEntityFilters,
        });

        // Reset the form.
        setIsDirty(false);
        (e.target as HTMLFormElement).reset();
      } catch (err) {
        console.error(err);
        setIsError(true);
      } finally {
        setIsSubmitting(false);
      }
    },
    [exploreDispatch]
  );

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledOutlinedInput
        {...OUTLINED_INPUT_PROPS}
        endAdornment={
          <EndAdornment
            adornmentType={getEndAdornmentType(isDirty, isSubmitting)}
          />
        }
        error={isError}
        onChange={(): void => setIsDirty(true)}
      />
    </StyledForm>
  );
};
