import { ToggleButton } from "@mui/material";
import { JSX } from "react";
import { StyledBox, StyledToggleButtonGroup } from "./toggleButtonGroup.styles";
import Link from "next/link";
import { useAiRoutes } from "../../../../../hooks/ai/useAiRoutes/hook";
import { Beta } from "../../../../../components/common/Chip/components/Beta/beta";

/**
 * ToggleButtonGroup component for navigating to ExploreView.
 * Only navigates to ExploreView when the "Search" button is clicked, otherwise remains on ResearchView.
 * @returns ToggleButtonGroup JSX element.
 */
export const ToggleButtonGroup = (): JSX.Element | null => {
  const { routes } = useAiRoutes() || {};

  if (!routes) return null;

  return (
    <StyledBox>
      <StyledToggleButtonGroup exclusive>
        <ToggleButton selected value="research">
          Research <Beta />
        </ToggleButton>
        <ToggleButton component={Link} href={routes.search} value="search">
          Search
        </ToggleButton>
      </StyledToggleButtonGroup>
    </StyledBox>
  );
};
