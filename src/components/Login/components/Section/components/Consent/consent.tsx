import { Checkbox, Typography } from "@mui/material";
import React from "react";
import { TEXT_BODY_400 } from "../../../../../../theme/common/typography";
import { CheckedIcon } from "../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedErrorIcon } from "../../../../../common/CustomIcon/components/UncheckedErrorIcon/uncheckedErrorIcon";
import { UncheckedIcon } from "../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { BaseComponentProps } from "../../../../../types";
import { StyledGrid } from "./consent.styles";
import { ConsentProps } from "./types";

export const Consent = ({
  children,
  className,
  handleConsent,
  isDisabled,
  isError,
  ...props /* Mui GridProps */
}: BaseComponentProps & ConsentProps): JSX.Element | null => {
  if (isDisabled) return null;
  return (
    <StyledGrid className={className} {...props}>
      <Checkbox
        checkedIcon={<CheckedIcon />}
        icon={isError ? <UncheckedErrorIcon /> : <UncheckedIcon />}
        onChange={handleConsent}
      />
      <Typography variant={TEXT_BODY_400}>{children}</Typography>
    </StyledGrid>
  );
};
