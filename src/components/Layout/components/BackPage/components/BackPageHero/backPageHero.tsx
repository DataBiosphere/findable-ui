import { Fragment, JSX, ReactNode } from "react";
import {
  Breadcrumb,
  Breadcrumbs,
} from "../../../../../common/Breadcrumbs/breadcrumbs";
import { isBreadcrumbArray } from "../../../../../common/Breadcrumbs/typeGuard";
import { CallToAction } from "../../../../../common/Button/components/CallToActionButton/callToActionButton";
import { Title } from "../../../../../common/Title/title";
import {
  BackPageHeroHeadline,
  CallToActionButton,
  HeroHeader,
} from "./backPageHero.styles";
import { SubTitle } from "./components/SubTitle/subTitle";

/**
 * Props for the BackPageHero component.
 */
export interface BackPageHeroProps {
  actions?: ReactNode;
  breadcrumbs?: Breadcrumb[] | ReactNode;
  callToAction?: CallToAction;
  children?: ReactNode;
  subTitle?: ReactNode;
  title?: ReactNode;
}

/**
 * Back page hero, rendering the breadcrumbs, title and subtitle, followed by any actions and call to action button, then the children.
 * @param props - Component props.
 * @param props.actions - Actions rendered after the title and subtitle.
 * @param props.breadcrumbs - Breadcrumbs, rendered with the Breadcrumbs component when an array, otherwise rendered as given.
 * @param props.callToAction - Call to action, rendered as a call to action button when given.
 * @param props.children - Content rendered below the hero headline.
 * @param props.subTitle - Subtitle.
 * @param props.title - Title.
 * @returns The back page hero.
 */
export const BackPageHero = ({
  actions,
  breadcrumbs,
  callToAction,
  children,
  subTitle,
  title,
}: BackPageHeroProps): JSX.Element => {
  const HeroHeadline =
    actions || callToAction ? BackPageHeroHeadline : Fragment;
  return (
    <Fragment>
      <HeroHeadline>
        <HeroHeader gap={1}>
          {breadcrumbs ? (
            isBreadcrumbArray(breadcrumbs) ? (
              <Breadcrumbs breadcrumbs={breadcrumbs} />
            ) : (
              breadcrumbs
            )
          ) : null}
          <Title>{title}</Title>
          <SubTitle subTitle={subTitle} />
        </HeroHeader>
        {actions}
        {callToAction && <CallToActionButton callToAction={callToAction} />}
      </HeroHeadline>
      {children}
    </Fragment>
  );
};
