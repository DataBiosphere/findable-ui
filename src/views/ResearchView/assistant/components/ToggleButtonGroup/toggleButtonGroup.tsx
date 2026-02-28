import { ToggleButton } from "@mui/material";
import { JSX } from "react";
import { StyledBox, StyledToggleButtonGroup } from "./toggleButtonGroup.styles";
import Link from "next/link";
import { useAiRoutes } from "../../../../../hooks/ai/useAiRoutes/hook";
import { Beta } from "../../../../../components/common/Chip/components/Beta/beta";

/**
 * ToggleButtonGroup component for navigating between ResearchView and ExploreView.
 * @returns ToggleButtonGroup JSX element, or null if routes are not configured.
 */
export const ToggleButtonGroup = (): JSX.Element | null => {
  const { routes } = useAiRoutes() || {};

  if (!routes) return null;

  return (
    <StyledBox>
      <StyledToggleButtonGroup exclusive>
        <ToggleButton
          component={Link}
          href={routes.research}
          selected
          value="research"
        >
          Research <Beta />
        </ToggleButton>
        <ToggleButton component={Link} href={routes.search} value="search">
          Search
        </ToggleButton>
      </StyledToggleButtonGroup>
    </StyledBox>
  );
};
