import { JSX } from "react";
import { SuggestionsProps } from "./types";
import { Chip } from "@mui/material";
import { getPromptSuggestions } from "./utils";
import { CHIP_PROPS } from "../../../../../../styles/common/mui/chip";
import { StyledStack } from "./suggestions.styles";

export const Suggestions = ({
  state,
}: SuggestionsProps): JSX.Element | null => {
  const suggestions = getPromptSuggestions(state);

  if (!suggestions || suggestions.length === 0) return null;

  return (
    <StyledStack gap={2} useFlexGap>
      {suggestions.map((suggestion) => (
        <Chip
          key={`${suggestion.label}-${suggestion.query}`}
          clickable
          color={CHIP_PROPS.COLOR.SECONDARY}
          component="button"
          data-query={suggestion.query}
          label={suggestion.label}
          type="submit"
          variant={CHIP_PROPS.VARIANT.OUTLINED}
        />
      ))}
    </StyledStack>
  );
};
