import {
  ListItemButton,
  listItemButtonClasses,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { CSSProperties, JSX, useEffect, useRef } from "react";
import { OnFilterFn } from "../../../../../../hooks/useCategoryFilter";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { TEST_IDS } from "../../../../../../tests/testIds";
import { FilterNoResultsFound } from "../../../FilterNoResultsFound/filterNoResultsFound";
import { HighlightedLabel } from "../../../HighlightedLabel/highlightedLabel";
import { Checkbox } from "../../../views/select/components/Checkbox/checkbox";
import { ITEM_TYPE, SearchAllFiltersDynamicItem } from "../../common/entities";
import { toggleValue } from "../../common/utils";
import { StyledCategoryLabel } from "./variableSizeListItem.styles";

interface Props {
  highlighted: boolean;
  id: string;
  item: SearchAllFiltersDynamicItem;
  onFilter: OnFilterFn;
  onUpdateItemSizeByItemKey: (key: string, size: number) => void;
  searchTerm?: string;
  style: CSSProperties;
}

/**
 * Search all filters list item: a value option with a checkbox, highlighted label and count that toggles the value when clicked; a category header; or a no results message. Records its height for the list.
 * A value option is in the tab order, so Tab moves through the terms; it also shows the focus style while keyboard highlighted from the search input. Its accessible name includes its category, hidden on screen, as screen readers don't relate the option to the category header above it; the header is hidden from screen readers.
 * @param props - Component props.
 * @param props.highlighted - Whether the item is keyboard highlighted.
 * @param props.id - Value option id, referenced by the search input's aria-activedescendant.
 * @param props.item - List item.
 * @param props.onFilter - Function invoked with the value and search term when a value is clicked.
 * @param props.onUpdateItemSizeByItemKey - Function invoked with the item key and measured height.
 * @param props.searchTerm - Search term.
 * @param props.style - Virtualized list item style.
 * @returns The list item.
 */
export default function VariableSizeListItem({
  highlighted,
  id,
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
      categoryLabel,
      matchRanges,
      value: { count, label, selected },
    } = item;
    return (
      <ListItemButton
        aria-selected={selected}
        className={highlighted ? listItemButtonClasses.focusVisible : undefined}
        data-testid={TEST_IDS.FILTER_ITEM}
        id={id}
        ref={setRef}
        key={key}
        onClick={(): void => toggleValue(item, onFilter, searchTerm)}
        role="option"
        selected={selected}
        style={style}
      >
        <Checkbox checked={selected} />
        <ListItemText
          disableTypography
          primary={
            <>
              <HighlightedLabel
                label={label}
                ranges={matchRanges}
                testId={TEST_IDS.FILTER_TERM}
              />
              <StyledCategoryLabel>, {categoryLabel}</StyledCategoryLabel>
            </>
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
      <ListSubheader aria-hidden key={key} ref={setRef} style={style}>
        {item.categoryLabel}
      </ListSubheader>
    );
  } else {
    return <FilterNoResultsFound ref={setRef} />;
  }
}
