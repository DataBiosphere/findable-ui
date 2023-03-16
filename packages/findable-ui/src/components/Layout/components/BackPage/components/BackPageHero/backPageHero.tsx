import React, { Fragment } from "react";
import {
  Breadcrumb,
  Breadcrumbs,
} from "../../../../../common/Breadcrumbs/breadcrumbs";
import { CallToAction } from "../../../../../common/Button/components/CallToActionButton/callToActionButton";
import { Stack } from "../../../../../common/Stack/stack";
import {
  Status,
  StatusBadge,
} from "../../../../../common/StatusBadge/statusBadge";
import { HeroTitle, Title } from "../../../../../common/Title/title";
import {
  BackPageHeroHeadline,
  CallToActionButton,
  HeroHeader,
} from "./backPageHero.styles";

/**
 * Back page hero component comprising breadcrumbs, title, status and tabs.
 */

export interface BackPageHeroProps {
  breadcrumbs?: Breadcrumb[];
  callToAction?: CallToAction;
  status?: Status;
  title?: HeroTitle;
}

export const BackPageHero = ({
  breadcrumbs,
  callToAction,
  status,
  title,
}: BackPageHeroProps): JSX.Element => {
  const HeroHeadline = callToAction ? BackPageHeroHeadline : Fragment;
  return (
    <>
      {(breadcrumbs || title) && (
        <HeroHeadline>
          <HeroHeader gap={1}>
            {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
            {title && <Title title={title} />}
          </HeroHeader>
          {callToAction && (
            <CallToActionButton
              callToAction={callToAction}
              row={status ? 3 : 2}
            />
          )}
        </HeroHeadline>
      )}
      {status && (
        <Stack direction="row" gap={4}>
          <StatusBadge status={status} />
        </Stack>
      )}
    </>
  );
};
