import {
  Checkbox,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { OnFilterFn } from "../../../../../../hooks/useCategoryFilter";
import { TEST_IDS } from "../../../../../../tests/testIds";
import { TEXT_BODY_SMALL_400 } from "../../../../../../theme/common/typography";
import { CheckedIcon } from "../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { FilterNoResultsFound } from "../../../FilterNoResultsFound/filterNoResultsFound";
import { HighlightedLabel } from "../../../HighlightedLabel/highlightedLabel";
import { ITEM_TYPE, SearchAllFiltersDynamicItem } from "../../common/entites";

interface Props {
  item: SearchAllFiltersDynamicItem;
  onFilter: OnFilterFn;
  onUpdateItemSizeByItemKey: (key: string, size: number) => void;
  searchTerm?: string;
  style: React.CSSProperties;
}

export default function VariableSizeListItem({
  item,
  onFilter,
  onUpdateItemSizeByItemKey,
  searchTerm,
  style,
}: Props): JSX.Element {
  const { key } = item;
  const listItemRef = useRef<HTMLElement>();

  const setRef = (e: HTMLElement | null): void => {
    listItemRef.current = e || undefined;
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
          onFilter(categoryKey, valueKey, !selected, undefined, searchTerm)
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
              color="ink.light"
              data-testid={TEST_IDS.FILTER_COUNT}
              variant={TEXT_BODY_SMALL_400}
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
