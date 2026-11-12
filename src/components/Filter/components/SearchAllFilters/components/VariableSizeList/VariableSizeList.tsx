import { Divider, List as MList, ListProps as MListProps } from "@mui/material";
import React, {
  type ComponentProps,
  createContext,
  forwardRef,
  HTMLAttributes,
  JSX,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  VariableSizeList as List,
  ListChildComponentProps,
  VariableSizeListProps as ListProps,
} from "react-window";
import { OnFilterFn } from "../../../../../../hooks/useCategoryFilter";
import { useWindowResize } from "../../../../../../hooks/useWindowResize";
import {
  LIST_ITEM_HEIGHT,
  LIST_MARGIN,
  MAX_DISPLAYABLE_LIST_ITEMS,
  MAX_LIST_HEIGHT_PX,
} from "../../../../common/constants";
import { StyledList } from "../../../FilterList/filterList.styles";
import { SURFACE_TYPE } from "../../../surfaces/types";
import { DIVIDER_HEIGHT } from "../../common/constants";
import { ITEM_TYPE, SearchAllFiltersItem } from "../../common/entities";
import { getOptionId } from "../../common/utils";
import VariableSizeListItem from "../VariableSizeListItem/variableSizeListItem";

export type ItemSizeByItemKey = Map<string, number>;

/**
 * Props for the search all filters VariableSizeList component.
 */
export interface VariableSizeListProps {
  autocompleteListProps: Omit<MListProps, "children">;
  filteredItems: SearchAllFiltersItem[];
  height?: number; // Height of list; vertical list must be a number.
  highlightedIndex: number; // Index of the keyboard highlighted item; -1 when nothing is highlighted.
  itemSize?: number; // Default item size.
  onFilter: OnFilterFn;
  optionIdPrefix: string;
  overscanCount?: ListProps["overscanCount"];
  searchTerm: string;
  surfaceType: SURFACE_TYPE;
  width?: ListProps["width"]; // Width of list; default to 100% width of parent element.
}

interface VariableSizeListData {
  filteredItems: SearchAllFiltersItem[];
  highlightedIndex: number;
  onFilter: OnFilterFn;
  onUpdateItemSizeByItemKey: (key: string, size: number) => void;
  optionIdPrefix: string;
  searchTerm?: string;
}

interface OuterElementContextValue {
  autocompleteListProps: Omit<MListProps, "children">;
  autocompleteListRef?: React.ForwardedRef<HTMLUListElement>;
}

/**
 * Returns the key of the list item at the given index, so a rendered item, and keyboard focus on it, stays with its value when the list changes around it. Dividers have no key of their own, so are keyed by index.
 * @param index - List item index.
 * @param data - List data.
 * @returns The list item key.
 */
function getItemKey(index: number, data: VariableSizeListData): string {
  const item = data.filteredItems[index];
  if (item.type === ITEM_TYPE.DIVIDER) return `divider_${index}`;
  return item.key;
}

/**
 * Build variable list item element.
 * @param props - Variable size list child component props i.e. list index, style.
 * @returns variable list item element.
 */
function renderListItem(props: ListChildComponentProps): JSX.Element {
  const { data, index, style } = props;
  // Omit height so each row renders at its natural, measured height, without mutating react-window's cached style object.
  const { height: _height, ...itemStyle } = style;
  const {
    filteredItems,
    highlightedIndex,
    onFilter,
    onUpdateItemSizeByItemKey,
    optionIdPrefix,
    searchTerm,
  } = data as VariableSizeListData;
  const item = filteredItems[index];
  if (item.type === ITEM_TYPE.DIVIDER)
    return <Divider aria-hidden style={itemStyle} />;
  else
    return (
      <VariableSizeListItem
        highlighted={index === highlightedIndex}
        id={getOptionId(optionIdPrefix, index)}
        item={item}
        onFilter={onFilter}
        onUpdateItemSizeByItemKey={onUpdateItemSizeByItemKey}
        searchTerm={searchTerm}
        style={itemStyle}
      />
    );
}

const OuterElementContext = createContext<OuterElementContextValue>({
  autocompleteListProps: {},
});

const OuterElement = forwardRef<HTMLDivElement>(function OuterElement(
  { children, ...props }: HTMLAttributes<HTMLElement>,
  ref,
): JSX.Element {
  const { autocompleteListProps, autocompleteListRef } =
    useContext(OuterElementContext);
  return (
    <div ref={ref} {...props}>
      <MList
        ref={autocompleteListRef}
        style={{ maxHeight: "none", padding: 0 }}
        {...autocompleteListProps}
      >
        {children}
      </MList>
    </div>
  );
});

/**
 * Inner element of the virtualized list, holding the list items. Presentational, so the items belong to the listbox around it.
 * @param props - Component props, the list props given by the virtualized list.
 * @returns The inner list element.
 */
function InnerElement(props: ComponentProps<typeof StyledList>): JSX.Element {
  return <StyledList role="presentation" {...props} />;
}

/**
 * Virtualized search all filters list of the given items, scrolling the keyboard highlighted item into view.
 * In the popper drawer the list fills the window below it; otherwise it fits its items, up to the window below it.
 * @param props - Component props.
 * @param props.autocompleteListProps - Mui Autocomplete listbox props, applied to the list.
 * @param props.filteredItems - List items: the values matching the search term, grouped by category under category headers and separated by dividers, or a no results item.
 * @param props.height - Initial list height; defaults to the maximum list height.
 * @param props.highlightedIndex - Index of the keyboard highlighted item, or -1 when nothing is highlighted.
 * @param props.itemSize - Item height used until an item is measured; defaults to the list item height.
 * @param props.onFilter - Function invoked when a value is toggled.
 * @param props.optionIdPrefix - Prefix of the list item ids.
 * @param props.overscanCount - Number of items rendered outside the visible area; defaults to twice the maximum displayable list items.
 * @param props.searchTerm - Search term.
 * @param props.surfaceType - Filter surface type.
 * @param props.width - List width; defaults to 100%.
 * @param autocompleteListRef - Ref forwarded to the list element.
 * @returns The search all filters list.
 */
export const VariableSizeList = forwardRef<
  HTMLUListElement,
  VariableSizeListProps
>(function VariableSizeList(
  {
    autocompleteListProps,
    filteredItems,
    height: initHeight = MAX_LIST_HEIGHT_PX,
    highlightedIndex,
    itemSize = LIST_ITEM_HEIGHT,
    onFilter,
    optionIdPrefix,
    overscanCount = MAX_DISPLAYABLE_LIST_ITEMS * 2,
    searchTerm,
    surfaceType,
    width = "100%",
  }: VariableSizeListProps,
  autocompleteListRef,
): JSX.Element {
  let resizeRequired = true;
  const { height: windowHeight } = useWindowResize();
  const [height, setHeight] = useState<number>(initHeight);
  const itemSizeByItemKeyRef = useRef<ItemSizeByItemKey>(new Map());
  const listRef = useRef<List>(null);
  const innerRef = useRef<HTMLUListElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const { current: itemSizeByItemKey } = itemSizeByItemKeyRef;
  const onUpdateItemSizeByItemKey = useCallback(
    (key: string, size: number): void =>
      updateItemSizeByItemKey(itemSizeByItemKeyRef.current, key, size),
    [],
  );

  // Sets height of list.
  useEffect(() => {
    if (innerRef.current && outerRef.current)
      setHeight(
        calculateListHeight(
          outerRef.current,
          innerRef.current,
          windowHeight,
          surfaceType,
        ),
      );
  }, [surfaceType, windowHeight]);

  // Clears VariableSizeList cache (offsets and measurements) when values are updated (filtered).
  // Facilitates correct positioning of list items when list is updated.
  useEffect(() => {
    listRef.current?.resetAfterIndex(0);
  }, [filteredItems]);

  // Scrolls the keyboard highlighted item into view.
  useEffect(() => {
    if (highlightedIndex !== -1)
      listRef.current?.scrollToItem(highlightedIndex);
  }, [highlightedIndex]);

  return (
    <OuterElementContext.Provider
      value={{ autocompleteListProps, autocompleteListRef }}
    >
      <List
        height={height}
        innerElementType={InnerElement}
        innerRef={innerRef}
        itemCount={filteredItems.length}
        itemKey={getItemKey}
        itemData={{
          filteredItems,
          highlightedIndex,
          onFilter,
          onUpdateItemSizeByItemKey,
          optionIdPrefix,
          searchTerm,
        }}
        itemSize={(index): number => {
          const item = filteredItems[index];
          if (item.type === ITEM_TYPE.DIVIDER) return DIVIDER_HEIGHT;
          return itemSizeByItemKey.get(item.key) || itemSize;
        }}
        onItemsRendered={(): void => {
          requestAnimationFrame(() => {
            if (
              resizeRequired &&
              innerRef.current?.childElementCount &&
              outerRef.current
            ) {
              // Set height of list.
              resizeRequired = false;
              setHeight(
                calculateListHeight(
                  outerRef.current,
                  innerRef.current,
                  windowHeight,
                  surfaceType,
                ),
              );
            }
            listRef.current?.resetAfterIndex(0); // Facilitates correct positioning of list items when list scrolls.
          });
        }}
        outerElementType={OuterElement}
        outerRef={outerRef}
        overscanCount={overscanCount}
        ref={listRef}
        style={{ overscrollBehavior: "none" }} // The page scrolls while the list is open; the wheel at the list's end stops here.
        width={width}
      >
        {renderListItem}
      </List>
    </OuterElementContext.Provider>
  );
});

/**
 * Calculates list height, either to fit available window size, or if the list is filtered, a calculated height based on
 * first and last rendered list element position.
 * @param outerListElem - Outer list element to reference list position from.
 * @param innerListElem - Element containing list items.
 * @param windowHeight - Window height.
 * @param surfaceType - Type of surface "POPPER_MENU" or "POPPER_DRAWER".
 * @returns calculated height.
 */
function calculateListHeight(
  outerListElem: HTMLDivElement,
  innerListElem: HTMLUListElement,
  windowHeight: number,
  surfaceType: SURFACE_TYPE,
): number {
  // Calculate max possible list height, based on window height and top position of the list element.
  const maxHeight = windowHeight - outerListElem.getBoundingClientRect().top;

  // Return the maximum possible height if the list is in a popper drawer.
  if (surfaceType === SURFACE_TYPE.POPPER_DRAWER) return maxHeight;

  // Grab the first and last element in the list.
  const { firstElementChild: firstListEl, lastElementChild: lastListEl } =
    innerListElem;
  // Grab the scroll position to adjust calculated list height.
  const { scrollTop } = innerListElem;
  if (firstListEl && lastListEl) {
    const { top } = firstListEl.getBoundingClientRect();
    const { bottom } = lastListEl.getBoundingClientRect();
    const calcHeight = bottom - top - scrollTop + LIST_MARGIN * 2;
    return Math.min(calcHeight, maxHeight);
  }
  return maxHeight;
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
