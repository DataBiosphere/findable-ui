import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { CheckedIcon } from "../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedErrorIcon } from "../../../../../common/CustomIcon/components/UncheckedErrorIcon/uncheckedErrorIcon";
import { UncheckedIcon } from "../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { BaseComponentProps } from "../../../../../types";
import { StyledGrid } from "./consent.styles";
import { ConsentProps } from "./types";

/**
 * Terms of service consent checkbox; shows the error icon after a sign-in attempt without consent.
 * @param props - Component props; other props are passed to the grid.
 * @param props.children - Consent label.
 * @param props.className - Class name applied to the grid.
 * @param props.handleConsent - Invoked when the checkbox changes.
 * @param props.isDisabled - Whether consent is not required.
 * @param props.isError - Whether to show the error state.
 * @returns The consent checkbox, or null when consent is not required.
 */
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
      <FormControlLabel
        control={
          <Checkbox
            checkedIcon={<CheckedIcon />}
            icon={isError ? <UncheckedErrorIcon /> : <UncheckedIcon />}
            onChange={handleConsent}
          />
        }
        label={
          <Typography
            component="span"
            variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}
          >
            {children}
          </Typography>
        }
      />
    </StyledGrid>
  );
};
