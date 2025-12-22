import { Checkbox, Typography } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
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
      <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>
        {children}
      </Typography>
    </StyledGrid>
  );
};
