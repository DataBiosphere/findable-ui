import { JSX } from "react";
import { ANCHOR_TARGET } from "../../../../Links/common/entities";
import { Link } from "../../../../Links/components/Link/link";

/**
 * Props for the CardAction component.
 */
export interface CardActionProps {
  label: string;
  target?: ANCHOR_TARGET;
  url: string;
}

/**
 * Card action, rendering a link.
 * @param props - Component props.
 * @param props.label - Link label.
 * @param props.target - Link target.
 * @param props.url - Link url.
 * @returns The card action link.
 */
export const CardAction = ({
  label,
  target,
  url,
}: CardActionProps): JSX.Element => {
  return <Link label={label} target={target} url={url} />;
};
