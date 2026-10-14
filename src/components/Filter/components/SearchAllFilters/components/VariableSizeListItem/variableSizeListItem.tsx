import {
  Checkbox,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { CSSProperties, JSX, useEffect, useRef } from "react";
import { VIEW_KIND } from "../../../../../../common/categories/views/types";
import { OnFilterFn } from "../../../../../../hooks/useCategoryFilter";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { TEST_IDS } from "../../../../../../tests/testIds";
import { CheckedIcon } from "../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { FilterNoResultsFound } from "../../../FilterNoResultsFound/filterNoResultsFound";
import { HighlightedLabel } from "../../../HighlightedLabel/highlightedLabel";
import { ITEM_TYPE, SearchAllFiltersDynamicItem } from "../../common/entities";

interface Props {
  item: SearchAllFiltersDynamicItem;
  onFilter: OnFilterFn;
  onUpdateItemSizeByItemKey: (key: string, size: number) => void;
  searchTerm?: string;
  style: CSSProperties;
}

/**
 * Search all filters list item: a value with a checkbox, highlighted label and count that toggles the value when clicked; a category header; or a no results message. Records its height for the list.
 * @param props - Component props.
 * @param props.item - List item.
 * @param props.onFilter - Function invoked with the value and search term when a value is clicked.
 * @param props.onUpdateItemSizeByItemKey - Function invoked with the item key and measured height.
 * @param props.searchTerm - Search term.
 * @param props.style - Virtualized list item style.
 * @returns The list item.
 */
export default function VariableSizeListItem({
  item,
  onFilter,
  onUpdateItemSizeByItemKey,
  searchTerm,
  style,
}: Props): JSX.Element {
  const { key } = item;
  const listItemRef = useRef<HTMLElement | null>(null);

  const setRef = (e: HTMLElement | null): void => {
    listItemRef.current = e;
  };

  // Sets map of list item key to its height.
  useEffect(() => {
    onUpdateItemSizeByItemKey(key, listItemRef.current?.clientHeight || 0);
  }, [key, onUpdateItemSizeByItemKey]);

  if (item.type === ITEM_TYPE.VALUE) {
    const {
      categoryKey,
      matchRanges,
      value: { count, key: valueKey, label, selected },
    } = item;
    return (
      <ListItemButton
        data-testid={TEST_IDS.FILTER_ITEM}
        ref={setRef}
        key={key}
        onClick={(): void =>
          onFilter(
            categoryKey,
            valueKey,
            !selected,
            undefined,
            VIEW_KIND.SELECT,
            searchTerm,
          )
        }
        selected={selected}
        style={style}
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
              ranges={matchRanges}
              testId={TEST_IDS.FILTER_TERM}
            />
          }
          secondary={
            <Typography
              color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
              data-testid={TEST_IDS.FILTER_COUNT}
              variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}
            >
              {count}
            </Typography>
          }
        />
      </ListItemButton>
    );
  } else if (item.type === ITEM_TYPE.CATEGORY) {
    return (
      <ListSubheader key={key} ref={setRef} style={style}>
        {item.categoryLabel}
      </ListSubheader>
    );
  } else {
    return <FilterNoResultsFound ref={setRef} />;
  }
}
