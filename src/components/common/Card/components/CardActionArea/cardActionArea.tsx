import { CardActionArea as MCardActionArea } from "@mui/material";
import { useRouter } from "next/router";
import { JSX, ReactNode } from "react";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "../../../../Links/common/entities";
import { isClientSideNavigation } from "../../../../Links/common/utils";

/**
 * Props for the CardActionArea component.
 */
export interface CardActionAreaProps {
  cardUrl?: string;
  children: ReactNode;
}

/**
 * Card action area that navigates to the card url when clicked.
 * Internal urls use client-side navigation; external urls open in a new tab.
 * @param props - Component props.
 * @param props.cardUrl - Url to navigate to when clicked.
 * @param props.children - Card content.
 * @returns The card action area.
 */
export const CardActionArea = ({
  cardUrl,
  children,
}: CardActionAreaProps): JSX.Element => {
  const { push } = useRouter();

  // Callback fired when the card action area is clicked.
  // Determines url type (internal or external) and routes accordingly.
  const handleClick = (url?: string): void => {
    if (url) {
      if (isClientSideNavigation(url)) {
        push(url);
      } else {
        window.open(
          url,
          ANCHOR_TARGET.BLANK,
          REL_ATTRIBUTE.NO_OPENER_NO_REFERRER,
        );
      }
    }
  };

  return (
    <MCardActionArea onClick={(): void => handleClick(cardUrl)}>
      {children}
    </MCardActionArea>
  );
};
