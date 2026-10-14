import { Typography } from "@mui/material";
import { JSX } from "react";
import { CollapsableSection } from "../../../common/Section/components/CollapsableSection/collapsableSection";
import { SectionDetailsEmpty } from "../../../common/Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { ANCHOR_TARGET } from "../../../Links/common/entities";
import { Link } from "../../../Links/components/Link/link";
import { CitationLink, SectionContent } from "./citation.styles";

/**
 * Props for the Citation component.
 */
export interface CitationProps {
  projectPath?: string;
  url?: string;
}

/**
 * Citation section of a project page: a copyable link to the project.
 * @param props - Component props.
 * @param props.projectPath - Project path, appended to the URL.
 * @param props.url - Base URL.
 * @returns The citation section, or an empty state unless both a project path and URL are given.
 */
export const Citation = ({ projectPath, url }: CitationProps): JSX.Element => {
  return (
    <CollapsableSection collapsable title="Citation">
      {projectPath && url ? (
        <SectionContent>
          <Typography>
            To reference this project, please use the following link:
          </Typography>
          <CitationLink>
            <Link
              copyable
              label={`${url}${projectPath}`}
              noWrap
              target={ANCHOR_TARGET.BLANK}
              url={`${url}${projectPath}`}
            />
          </CitationLink>
        </SectionContent>
      ) : (
        <SectionDetailsEmpty />
      )}
    </CollapsableSection>
  );
};
