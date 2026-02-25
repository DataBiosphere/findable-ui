import { JSX } from "react";
import { ChipsProps } from "./types";
import { Chip } from "@mui/material";
import { CHIP_PROPS } from "../../../../../../../../../styles/common/mui/chip";
import { StyledStack } from "./chips.styles";

export const Chips = ({ message }: ChipsProps): JSX.Element | null => {
  const suggestions = message.suggestions;

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
