import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { SearchOffIcon } from "../common/CustomIcon/components/SearchOffIcon/searchOffIcon";
import { RoundedPaper } from "../common/Paper/paper.styles";
import { SectionTitle } from "../common/Section/components/SectionTitle/sectionTitle";
import { SectionActions } from "../common/Section/section.styles";
import { PRIORITY, StatusIcon } from "../common/StatusIcon/statusIcon";
import { NoResultsSection, NoResultsSectionContent } from "./noResults.styles";

export interface NoResultsProps {
  actions?: ReactNode;
  description?: string;
  title: string;
}

export const NoResults = ({
  actions,
  description,
  title,
}: NoResultsProps): JSX.Element => {
  return (
    <RoundedPaper>
      <NoResultsSection>
        <StatusIcon priority={PRIORITY.LOW} StatusIcon={SearchOffIcon} />
        <NoResultsSectionContent>
          <SectionTitle title={title} />
          {description && (
            <Typography color="ink.light" variant="text-body-400-2lines">
              {description}
            </Typography>
          )}
        </NoResultsSectionContent>
        {actions && <SectionActions>{actions}</SectionActions>}
      </NoResultsSection>
    </RoundedPaper>
  );
};
