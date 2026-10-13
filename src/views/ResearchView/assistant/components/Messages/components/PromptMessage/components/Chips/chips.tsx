import { Chip } from "@mui/material";
import { JSX } from "react";
import { CHIP_PROPS } from "../../../../../../../../../styles/common/mui/chip";
import { StyledStack } from "./chips.styles";
import { ChipsProps } from "./types";

/**
 * Renders a prompt message's suggestions as chips that submit their query.
 * @param props - Component props.
 * @param props.className - Class name applied to the chip stack.
 * @param props.message - Prompt message containing the suggestions.
 * @returns The suggestion chips, or null if there are no suggestions.
 */
export const Chips = ({
  className,
  message,
}: ChipsProps): JSX.Element | null => {
  const suggestions = message.suggestions;

  if (!suggestions || suggestions.length === 0) return null;

  return (
    <StyledStack className={className} gap={2} useFlexGap>
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
