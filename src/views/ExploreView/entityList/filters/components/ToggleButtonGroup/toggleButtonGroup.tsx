import { ToggleButton } from "@mui/material";
import Link from "next/link";
import { JSX } from "react";
import { Beta } from "../../../../../../components/common/Chip/components/Beta/beta";
import { useAiRoutes } from "../../../../../../hooks/ai/useAiRoutes/hook";
import { StyledBox, StyledToggleButtonGroup } from "./toggleButtonGroup.styles";

/**
 * ToggleButtonGroup component for navigating between ExploreView and ResearchView.
 * @returns ToggleButtonGroup JSX element, or null if routes are not configured.
 */
export const ToggleButtonGroup = (): JSX.Element | null => {
  const { routes } = useAiRoutes() || {};

  if (!routes) return null;

  return (
    <StyledBox>
      <StyledToggleButtonGroup exclusive>
        {/* These are links between views, so the current one is marked with
        aria-current; aria-pressed, which ToggleButton sets, is not allowed on
        a link. */}
        <ToggleButton
          aria-current="page"
          aria-pressed={undefined}
          component={Link}
          href={routes.search}
          selected
          value="search"
        >
          Search
        </ToggleButton>
        <ToggleButton
          aria-pressed={undefined}
          component={Link}
          href={routes.research}
          value="research"
        >
          Research <Beta />
        </ToggleButton>
      </StyledToggleButtonGroup>
    </StyledBox>
  );
};
