import {
  Checkbox,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { CSSProperties, JSX, useEffect, useRef } from "react";
import { VIEW_KIND } from "../../../../common/categories/views/types";
import { CategoryKey } from "../../../../common/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { SELECT_CATEGORY_KEY } from "../../../../providers/exploreState/constants";
import { TYPOGRAPHY_PROPS } from "../../../../styles/common/mui/typography";
import { TEST_IDS } from "../../../../tests/testIds";
import { CheckedIcon } from "../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { FilterMenuSearchMatch } from "../../common/entities";
import { HighlightedLabel } from "../HighlightedLabel/highlightedLabel";

interface Props {
  categoryKey: CategoryKey;
  categorySection?: string;
  matchedItem: FilterMenuSearchMatch;
  onFilter: OnFilterFn;
  onUpdateItemSizeByItemKey: (itemKey: unknown, itemSize: number) => void;
  style: CSSProperties;
}

export default function VariableSizeListItem({
  categoryKey,
  categorySection,
  matchedItem,
  onFilter,
  onUpdateItemSizeByItemKey,
  style,
}: Props): JSX.Element {
  const listItemRef = useRef<HTMLDivElement>(null);
  const {
    labelRanges,
    value: { count, key, label, selected },
  } = matchedItem;
  // Strip height so the variable-size list can drive item height via
  // onUpdateItemSizeByItemKey, without mutating the parent-owned style prop.
  const { height: _height, ...itemStyle } = style;

  // Sets map of list item key to its height.
  useEffect(() => {
    onUpdateItemSizeByItemKey(key, listItemRef.current?.clientHeight || 0);
  }, [key, onUpdateItemSizeByItemKey]);

  const handleItemClicked = (): void => {
    onFilter(categoryKey, key, !selected, categorySection, VIEW_KIND.SELECT);
  };

  return (
    <ListItemButton
      data-testid={TEST_IDS.FILTER_ITEM}
      ref={listItemRef}
      onClick={handleItemClicked}
      selected={selected}
      style={itemStyle}
    >
      <Checkbox
        checked={selected}
        checkedIcon={<CheckedIcon />}
        icon={<UncheckedIcon />}
      />
      <ListItemText
        disableTypography
        primary={
          <HighlightedLabel
            label={label}
            ranges={labelRanges}
            testId={TEST_IDS.FILTER_TERM}
          />
        }
        secondary={
          categoryKey !== SELECT_CATEGORY_KEY.SAVED_FILTERS && (
            <Typography
              color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
              data-testid={TEST_IDS.FILTER_COUNT}
              variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}
            >
              {count}
            </Typography>
          )
        }
      />
    </ListItemButton>
  );
}
