import { CardActionArea as MCardActionArea } from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "../../../../Links/common/entities";
import { isClientSideNavigation } from "../../../../Links/common/utils";

export interface CardActionAreaProps {
  cardUrl?: string;
  children: ReactNode;
}

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
          REL_ATTRIBUTE.NO_OPENER_NO_REFERRER
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
