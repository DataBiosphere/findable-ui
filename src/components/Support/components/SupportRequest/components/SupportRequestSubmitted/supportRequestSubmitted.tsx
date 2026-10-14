import { Typography } from "@mui/material";
import { JSX, ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { EmailReadIcon } from "../../../../../common/CustomIcon/components/EmailReadIcon/emailReadIcon";
import {
  ICON_BADGE_COLOR,
  IconBadge,
} from "../../../../../common/IconBadge/iconBadge";
import {
  Section,
  SectionContent,
} from "../../../../../common/Section/section.styles";

/**
 * Props for the SupportRequestSubmitted component.
 */
export interface SupportRequestSubmittedProps {
  description?: ReactNode;
  title?: ReactNode;
}

/**
 * Confirmation shown once a support request is sent.
 * @param props - Component props.
 * @param props.description - Description. Defaults to "Your request has been submitted.".
 * @param props.title - Title. Defaults to "Thank You!".
 * @returns The confirmation.
 */
export const SupportRequestSubmitted = ({
  description = "Your request has been submitted.",
  title = "Thank You!",
}: SupportRequestSubmittedProps): JSX.Element => {
  return (
    <Section>
      <SectionContent>
        <IconBadge color={ICON_BADGE_COLOR.SUCCESS} Icon={EmailReadIcon} />
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_SMALL}>
          {title}
        </Typography>
        <Typography
          color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
          variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}
        >
          {description}
        </Typography>
      </SectionContent>
    </Section>
  );
};
