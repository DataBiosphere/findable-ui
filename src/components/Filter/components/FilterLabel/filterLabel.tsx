import { ArrowDropDownRounded } from "@mui/icons-material";
import { JSX, MouseEvent } from "react";
import { DataDictionaryAnnotation } from "../../../../common/entities";
import { getPopupAriaProps } from "../../../../utils/ariaPopup";
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
  /**
   * Id of the filter panel this label controls, owned by `Filter`. Optional so
   * the component stays usable standalone; without it the label announces
   * expanded state but names no controlled region.
   */
  panelId?: string;
  surfaceType: SURFACE_TYPE;
}

export const FilterLabel = ({
  annotation,
  count,
  disabled = false,
  isOpen,
  label,
  onClick,
  panelId,
  surfaceType,
}: FilterLabelProps): JSX.Element => {
  const filterLabel = count ? `${label}\xa0(${count})` : label; // When the count is present, a non-breaking space is used to prevent it from being on its own line
  return (
    <Tooltip
      description={annotation?.description}
      enterDelay={300}
      placement="right"
      title={annotation?.label}
    >
      <StyledButton
        {...getPopupAriaProps({ id: panelId, open: isOpen })}
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
