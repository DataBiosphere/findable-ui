import { JSX } from "react";
import { ANCHOR_TARGET } from "../../../../Links/common/entities";
import { Link } from "../../../../Links/components/Link/link";

export interface CardActionProps {
  label: string;
  target?: ANCHOR_TARGET;
  url: string;
}

export const CardAction = ({
  label,
  target,
  url,
}: CardActionProps): JSX.Element => {
  return <Link label={label} target={target} url={url} />;
};
