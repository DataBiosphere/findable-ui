import { ArrowDropDownRounded } from "@mui/icons-material";
import { JSX, MouseEvent } from "react";
import { DataDictionaryAnnotation } from "../../../../common/entities";
import { Tooltip } from "../../../DataDictionary/components/Tooltip/tooltip";
import { SURFACE_TYPE } from "../surfaces/types";
import { StyledButton } from "./filterLabel.styles";

export interface FilterLabelProps {
  annotation?: DataDictionaryAnnotation;
  count?: number;
  disabled?: boolean;
  isOpen: boolean;
  label: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  surfaceType: SURFACE_TYPE;
}

export const FilterLabel = ({
  annotation,
  count,
  disabled = false,
  isOpen,
  label,
  onClick,
  surfaceType,
}: FilterLabelProps): JSX.Element => {
  const filterLabel = count ? `${label}\xa0(${count})` : label; // When the count is present, a non-breaking space is used to prevent it from being on its own line
  return (
    <Tooltip description={annotation?.description} title={annotation?.label}>
      <StyledButton
        color="inherit"
        disabled={disabled}
        endIcon={<ArrowDropDownRounded fontSize="small" />}
        fullWidth
        isOpen={isOpen}
        onClick={onClick}
        surfaceType={surfaceType}
      >
        {filterLabel}
      </StyledButton>
    </Tooltip>
  );
};
