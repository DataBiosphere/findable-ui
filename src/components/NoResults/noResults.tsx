import { Typography } from "@mui/material";
import { Fragment, JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../styles/common/mui/typography";
import { SearchOffIcon } from "../common/CustomIcon/components/SearchOffIcon/searchOffIcon";
import { SectionTitle } from "../common/Section/components/SectionTitle/sectionTitle";
import { SectionActions } from "../common/Section/section.styles";
import { PRIORITY, StatusIcon } from "../common/StatusIcon/statusIcon";
import { StyledSection, StyledSectionContent } from "./noResults.styles";
import { NoResultsProps } from "./types";

export const NoResults = ({
  actions,
  description,
  Paper,
  title,
}: NoResultsProps): JSX.Element => {
  const StyledPaper = Paper ?? Fragment;
  return (
    <StyledPaper>
      <StyledSection>
        <StatusIcon priority={PRIORITY.LOW} StatusIcon={SearchOffIcon} />
        <StyledSectionContent>
          <SectionTitle title={title} />
          {description && (
            <Typography
              color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
              variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400_2_LINES}
            >
              {description}
            </Typography>
          )}
        </StyledSectionContent>
        {actions && <SectionActions>{actions}</SectionActions>}
      </StyledSection>
    </StyledPaper>
  );
};
