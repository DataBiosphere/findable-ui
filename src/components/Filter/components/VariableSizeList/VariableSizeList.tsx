import { JSX, useCallback, useEffect, useRef, useState } from "react";
import {
  VariableSizeList as List,
  ListChildComponentProps,
  VariableSizeListProps as ListProps,
} from "react-window";
import { CategoryKey } from "../../../../common/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { useWindowResize } from "../../../../hooks/useWindowResize";
import {
  LIST_ITEM_HEIGHT,
  LIST_MARGIN,
  MAX_DISPLAYABLE_LIST_ITEMS,
  MAX_LIST_HEIGHT_PX,
} from "../../common/constants";
import { FilterMenuSearchMatch } from "../../common/entities";
import { StyledList } from "../FilterList/filterList.styles";
import VariableSizeListItem from "../VariableSizeListItem/variableSizeListItem";
import { SURFACE_TYPE } from "../surfaces/types";

export type ItemSizeByItemKey = Map<unknown, number>;

export interface VariableSizeListProps {
  categoryKey: CategoryKey;
  categorySection?: string;
  height?: number; // Height of list; vertical list must be a number.
  itemSize?: number; // Default item size.
  matchedItems: FilterMenuSearchMatch[];
  onFilter: OnFilterFn;
  overscanCount?: ListProps["overscanCount"];
  surfaceType: SURFACE_TYPE;
  width?: ListProps["width"]; // Width of list; default to 100% width of parent element.
}

/**
 * Build variable list item element.
 * @param props - Variable size list child component props i.e. list index, style.
 * @returns variable list item element.
 */
function renderListItem(props: ListChildComponentProps): JSX.Element {
  const { data, index, style } = props;
  const {
    categoryKey,
    categorySection,
    matchedItems,
    onFilter,
    onUpdateItemSizeByItemKey,
  } = data;
  return (
    <VariableSizeListItem
      categorySection={categorySection}
      categoryKey={categoryKey}
      matchedItem={matchedItems[index]}
      onFilter={onFilter}
      onUpdateItemSizeByItemKey={onUpdateItemSizeByItemKey}
      style={style}
    />
  );
}

export const VariableSizeList = ({
  categoryKey,
  categorySection,
  height: initHeight = MAX_LIST_HEIGHT_PX,
  itemSize = LIST_ITEM_HEIGHT,
  matchedItems,
  onFilter,
  overscanCount = MAX_DISPLAYABLE_LIST_ITEMS * 2,
  surfaceType,
  width = "100%",
}: VariableSizeListProps): JSX.Element => {
  const { height: windowHeight } = useWindowResize();
  const [height, setHeight] = useState<number>(initHeight);
  const itemSizeByItemKeyRef = useRef<ItemSizeByItemKey>(new Map());
  const listRef = useRef<List>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const { current: itemSizeByItemKey } = itemSizeByItemKeyRef;
  const onUpdateItemSizeByItemKey = useCallback(
    (key: string, size: number): void =>
      updateItemSizeByItemKey(itemSizeByItemKeyRef.current, key, size),
    [],
  );

  // Sets height of list.
  useEffect(() => {
    setHeight(
      calculateListHeight(
        initHeight,
        matchedItems,
        itemSizeByItemKeyRef.current,
        surfaceType,
        windowHeight,
        outerRef.current,
      ),
    );
  }, [initHeight, matchedItems, surfaceType, windowHeight]);

  // Clears VariableSizeList cache (offsets and measurements) when values are updated (filtered).
  // Facilitates correct positioning of list items when list is updated.
  useEffect(() => {
    listRef.current?.resetAfterIndex(0);
  }, [matchedItems]);

  return (
    <List
      height={height}
      outerRef={outerRef}
      innerElementType={StyledList}
      itemCount={matchedItems.length}
      itemData={{
        categoryKey,
        categorySection,
        matchedItems,
        onFilter,
        onUpdateItemSizeByItemKey,
      }}
      itemSize={(index): number =>
        itemSizeByItemKey.get(matchedItems[index].value.key) || itemSize
      }
      onItemsRendered={(): void => listRef.current?.resetAfterIndex(0)} // Facilitates correct positioning of list items when list scrolls.
      overscanCount={overscanCount}
      ref={listRef}
      width={width}
    >
      {renderListItem}
    </List>
  );
};

/**
 * Returns given height of list if number of items is greater than max displayable list items, otherwise the minimum
 * height of either the sum of the heights of the filtered list items or the given height of the list.
 * @param height - Specified height of list.
 * @param matchedItems - Set of search results for category value view models in the given category.
 * @param itemSizeByItemKey - Map of item size by item key.
 * @param surfaceType - Surface type is "Drawer" or "Menu".
 * @param windowHeight - Window height.
 * @param outerListElem - Outer list element to reference list position from.
 * @returns calculated height.
 */
function calculateListHeight(
  height: number,
  matchedItems: FilterMenuSearchMatch[],
  itemSizeByItemKey: ItemSizeByItemKey,
  surfaceType: SURFACE_TYPE,
  windowHeight: number,
  outerListElem: HTMLDivElement | null,
): number {
  if (surfaceType === SURFACE_TYPE.DRAWER && outerListElem) {
    return windowHeight - outerListElem.getBoundingClientRect().top;
  }
  if (matchedItems.length > MAX_DISPLAYABLE_LIST_ITEMS) {
    return height;
  }
  return Math.min(
    matchedItems.reduce((acc, { value: { key } }) => {
      acc += itemSizeByItemKey.get(key) || LIST_ITEM_HEIGHT;
      return acc;
    }, LIST_MARGIN * 2),
    height,
  );
}

/**
 * Updates map of item size by item key.
 * @param itemSizeByItemKey - Map of item size by item key.
 * @param key - Key.
 * @param size - Item size.
 */
function updateItemSizeByItemKey(
  itemSizeByItemKey: ItemSizeByItemKey,
  key: string,
  size: number,
): void {
  if (itemSizeByItemKey.has(key)) {
    return;
  }
  itemSizeByItemKey.set(key, size);
}
