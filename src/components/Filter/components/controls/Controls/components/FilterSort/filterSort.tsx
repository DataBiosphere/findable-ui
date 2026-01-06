import { SettingsOutlined } from "@mui/icons-material";
import { ListItem, ListItemButton, ListItemText, Radio } from "@mui/material";
import { Fragment, JSX } from "react";
import { FILTER_SORT } from "../../../../../../../common/filters/sort/config/types";
import { ICON_BUTTON_PROPS } from "../../../../../../../styles/common/mui/iconButton";
import { TEST_IDS } from "../../../../../../../tests/testIds";
import { RadioCheckedIcon } from "../../../../../../common/CustomIcon/components/RadioCheckedIcon/radioCheckedIcon";
import { RadioUncheckedIcon } from "../../../../../../common/CustomIcon/components/RadioUncheckedIcon/radioUncheckedIcon";
import { useMenu } from "../../../../../../common/Menu/hooks/useMenu";
import {
  LIST_ITEM_BUTTON_TEXT_PROPS,
  LIST_ITEM_TEXT_PROPS,
  MENU_PROPS,
  SVG_ICON_PROPS,
} from "./constants";
import { StyledIconButton, StyledMenu } from "./filterSort.styles";
import { FilterSortProps } from "./types";

export const FilterSort = ({
  enabled = false,
  filterSort = FILTER_SORT.ALPHA,
  onFilterSortChange,
}: FilterSortProps): JSX.Element | null => {
  const { anchorEl, onClose, onOpen, open } = useMenu();

  if (!enabled || !onFilterSortChange) return null;

  return (
    <Fragment>
      <StyledIconButton
        color={ICON_BUTTON_PROPS.COLOR.INK_LIGHT}
        data-testid={TEST_IDS.FILTER_SORT_BUTTON}
        onClick={onOpen}
        open={open}
      >
        <SettingsOutlined {...SVG_ICON_PROPS} />
      </StyledIconButton>
      <StyledMenu
        {...MENU_PROPS}
        anchorEl={anchorEl}
        data-testid={TEST_IDS.FILTER_SORT_MENU}
        onClose={onClose}
        open={open}
      >
        <ListItem>
          <ListItemText {...LIST_ITEM_TEXT_PROPS}>
            Sort Filter Values By
          </ListItemText>
        </ListItem>
        <ListItemButton onClick={() => onFilterSortChange(FILTER_SORT.ALPHA)}>
          <Radio
            checked={filterSort === FILTER_SORT.ALPHA}
            checkedIcon={<RadioCheckedIcon {...SVG_ICON_PROPS} />}
            icon={<RadioUncheckedIcon {...SVG_ICON_PROPS} />}
          />
          <ListItemText {...LIST_ITEM_BUTTON_TEXT_PROPS}>
            Alphabetical
          </ListItemText>
        </ListItemButton>
        <ListItemButton onClick={() => onFilterSortChange(FILTER_SORT.COUNT)}>
          <Radio
            checked={filterSort === FILTER_SORT.COUNT}
            checkedIcon={<RadioCheckedIcon {...SVG_ICON_PROPS} />}
            icon={<RadioUncheckedIcon {...SVG_ICON_PROPS} />}
          />
          <ListItemText {...LIST_ITEM_BUTTON_TEXT_PROPS}>
            By Count (Descending)
          </ListItemText>
        </ListItemButton>
      </StyledMenu>
    </Fragment>
  );
};
