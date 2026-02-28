import { ToggleButton } from "@mui/material";
import { JSX } from "react";
import { StyledBox } from "./toggleButtonGroup.styles";
import Link from "next/link";
import { useAiRoutes } from "../../../../../../hooks/ai/useAiRoutes/hook";
import { StyledToggleButtonGroup } from "./toggleButtonGroup.styles";
import { Beta } from "../../../../../../components/common/Chip/components/Beta/beta";

/**
 * ToggleButtonGroup component for navigating to ResearchView.
 * Only navigates to ResearchView when the "Research" button is clicked, otherwise remains on ExploreView.
 * @returns ToggleButtonGroup JSX element.
 */
export const ToggleButtonGroup = (): JSX.Element | null => {
  const { routes } = useAiRoutes() || {};

  if (!routes) return null;

  return (
    <StyledBox>
      <StyledToggleButtonGroup exclusive>
        <ToggleButton component={Link} href={routes.research} value="research">
          Research <Beta />
        </ToggleButton>
        <ToggleButton
          component={Link}
          href={routes.search}
          selected
          value="search"
        >
          Search
        </ToggleButton>
      </StyledToggleButtonGroup>
    </StyledBox>
  );
};
