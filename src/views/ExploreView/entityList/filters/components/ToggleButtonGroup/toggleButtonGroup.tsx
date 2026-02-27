import { ToggleButton, Chip } from "@mui/material";
import { JSX } from "react";
import { StyledBox } from "./toggleButtonGroup.styles";
import Link from "next/link";
import { useAiRoutes } from "../../../../../../hooks/ai/useAiRoutes/hook";
import { StyledToggleButtonGroup } from "../../../../../ResearchView/assistant/components/ToggleButtonGroup/toggleButtonGroup.styles";
import { CHIP_PROPS } from "../../../../../../styles/common/mui/chip";

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
          Research <Chip label="Beta" size={CHIP_PROPS.SIZE.SMALL} />
        </ToggleButton>
        <ToggleButton selected value="search">
          Search
        </ToggleButton>
      </StyledToggleButtonGroup>
    </StyledBox>
  );
};
