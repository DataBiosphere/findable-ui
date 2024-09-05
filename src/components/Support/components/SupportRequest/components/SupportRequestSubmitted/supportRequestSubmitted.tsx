import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import {
  TEXT_BODY_400,
  TEXT_HEADING_SMALL,
} from "../../../../../../theme/common/typography";
import { EmailReadIcon } from "../../../../../common/CustomIcon/components/EmailReadIcon/emailReadIcon";
import {
  ICON_BADGE_COLOR,
  IconBadge,
} from "../../../../../common/IconBadge/iconBadge";
import {
  Section,
  SectionContent,
} from "../../../../../common/Section/section.styles";

export interface SupportRequestSubmittedProps {
  description?: ReactNode;
  title?: ReactNode;
}

export const SupportRequestSubmitted = ({
  description = "Your request has been submitted.",
  title = "Thank You!",
}: SupportRequestSubmittedProps): JSX.Element => {
  return (
    <Section>
      <SectionContent>
        <IconBadge color={ICON_BADGE_COLOR.SUCCESS} Icon={EmailReadIcon} />
        <Typography variant={TEXT_HEADING_SMALL}>{title}</Typography>
        <Typography color="ink.light" variant={TEXT_BODY_400}>
          {description}
        </Typography>
      </SectionContent>
    </Section>
  );
};
