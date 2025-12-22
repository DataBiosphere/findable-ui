import { JSX, ReactNode } from "react";
import { Link, LinkProps } from "./components/Link/link";

export interface LinksProps {
  divider?: ReactNode;
  links: LinkProps[];
}

export const Links = ({ divider, links }: LinksProps): JSX.Element => {
  const lastLinkIndex = links.length - 1;
  return (
    <>
      {links.map(({ copyable, label, noWrap, target, url }, i) => {
        const showDivider = i < lastLinkIndex && divider;
        return (
          <span key={`${url}${i}`}>
            <Link
              copyable={copyable}
              label={label}
              noWrap={noWrap}
              target={target}
              url={url}
            />
            {showDivider && divider}
          </span>
        );
      })}
    </>
  );
};
