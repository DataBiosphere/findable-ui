import { Divider, List as MList, ListProps as MListProps } from "@mui/material";
import React, {
  createContext,
  forwardRef,
  HTMLAttributes,
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
import { SelectCategoryView } from "../../../../../../common/entities";
import { OnFilterFn } from "../../../../../../hooks/useCategoryFilter";
import { useWindowResize } from "../../../../../../hooks/useWindowResize";
import {
  LIST_ITEM_HEIGHT,
  LIST_MARGIN,
  MAX_DISPLAYABLE_LIST_ITEMS,
  MAX_LIST_HEIGHT_PX,
} from "../../../../common/constants";
import { getSortMatchesFn } from "../../../../common/utils";
import { StyledList } from "../../../FilterList/filterList.styles";
import { SURFACE_TYPE } from "../../../surfaces/types";
import {
  DIVIDER_HEIGHT,
  DIVIDER_ITEM,
  NO_RESULTS_ITEM,
} from "../../common/constants";
import {
  ITEM_TYPE,
  SearchAllFiltersItem,
  ValueItem,
} from "../../common/entites";
import VariableSizeListItem from "../VariableSizeListItem/variableSizeListItem";

export type ItemSizeByItemKey = Map<string, number>;

export interface VariableSizeListProps {
  autocompleteListProps: Omit<MListProps, "children">;
  height?: number; // Height of list; vertical list must be a number.
  itemSize?: number; // Default item size.
  onFilter: OnFilterFn;
  overscanCount?: ListProps["overscanCount"];
  searchTerm: string;
  selectCategoryViews: SelectCategoryView[];
  surfaceType: SURFACE_TYPE;
  width?: ListProps["width"]; // Width of list; default to 100% width of parent element.
}

interface VariableSizeListData {
  filteredItems: SearchAllFiltersItem[];
  onFilter: OnFilterFn;
  onUpdateItemSizeByItemKey: (key: string, size: number) => void;
  searchTerm?: string;
}

interface OuterElementContextValue {
  autocompleteListProps: Omit<MListProps, "children">;
  autocompleteListRef?: React.ForwardedRef<HTMLUListElement>;
}

/**
 * Build variable list item element.
 * @param props - Variable size list child component props i.e. list index, style.
 * @returns variable list item element.
 */
function renderListItem(props: ListChildComponentProps): JSX.Element {
  const { data, index, style } = props;
  delete style.height; // Remove height style to allow variable size list to set item height.
  const { filteredItems, onFilter, onUpdateItemSizeByItemKey, searchTerm } =
    data as VariableSizeListData;
  const item = filteredItems[index];
  if (item.type === ITEM_TYPE.DIVIDER) return <Divider style={style} />;
  else
    return (
      <VariableSizeListItem
        item={item}
        onFilter={onFilter}
        onUpdateItemSizeByItemKey={onUpdateItemSizeByItemKey}
        searchTerm={searchTerm}
        style={style}
      />
    );
}

const OuterElementContext = createContext<OuterElementContextValue>({
  autocompleteListProps: {},
});

const OuterElement = forwardRef<HTMLDivElement>(function OuterElement(
  { children, ...props }: HTMLAttributes<HTMLElement>,
  ref
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

export const VariableSizeList = forwardRef<
  HTMLUListElement,
  VariableSizeListProps
>(function VariableSizeList(
  {
    autocompleteListProps,
    height: initHeight = MAX_LIST_HEIGHT_PX,
    itemSize = LIST_ITEM_HEIGHT,
    onFilter,
    overscanCount = MAX_DISPLAYABLE_LIST_ITEMS * 2,
    searchTerm,
    selectCategoryViews,
    surfaceType,
    width = "100%",
  }: VariableSizeListProps,
  autocompleteListRef
): JSX.Element {
  const filteredItems = applyMenuFilter(selectCategoryViews, searchTerm);
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
    []
  );

  // Sets height of list.
  useEffect(() => {
    if (innerRef.current && outerRef.current)
      setHeight(
        calculateListHeight(
          outerRef.current,
          innerRef.current,
          windowHeight,
          surfaceType
        )
      );
  }, [surfaceType, windowHeight]);

  // Clears VariableSizeList cache (offsets and measurements) when values are updated (filtered).
  // Facilitates correct positioning of list items when list is updated.
  useEffect(() => {
    listRef.current?.resetAfterIndex(0);
  }, [filteredItems]);

  return (
    <OuterElementContext.Provider
      value={{ autocompleteListProps, autocompleteListRef }}
    >
      <List
        height={height}
        innerElementType={StyledList}
        innerRef={innerRef}
        itemCount={filteredItems.length}
        itemData={{
          filteredItems,
          onFilter,
          onUpdateItemSizeByItemKey,
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
                  surfaceType
                )
              );
            }
            listRef.current?.resetAfterIndex(0); // Facilitates correct positioning of list items when list scrolls.
          });
        }}
        outerElementType={OuterElement}
        outerRef={outerRef}
        overscanCount={overscanCount}
        ref={listRef}
        width={width}
      >
        {renderListItem}
      </List>
    </OuterElementContext.Provider>
  );
});

/**
 * Filter categories' values by a search term and return model of list items
 * @param selectCategoryViews - Select category views
 * @param inputValue - Search term
 * @returns array of objects representing list items to be rendered
 */
function applyMenuFilter(
  selectCategoryViews: SelectCategoryView[],
  inputValue: string
): SearchAllFiltersItem[] {
  const sortMatches = getSortMatchesFn(inputValue);
  const filteredItems = selectCategoryViews.reduce(
    (filteredItems, category) => {
      if (!category.isDisabled) {
        const categoryValueKeyPrefix =
          "value_" + category.key.replaceAll(";", ";;") + ";_"; // Terminating the category key with a semicolon (and escaping preceding semicolons) ensures a unique prefix
        const filteredCategoryValues = sortMatches(category.values).map(
          (match): ValueItem => ({
            categoryKey: category.key,
            key: categoryValueKeyPrefix + match.value.key,
            matchRanges: match.labelRanges,
            type: ITEM_TYPE.VALUE,
            value: match.value,
          })
        );
        if (filteredCategoryValues.length) {
          if (filteredItems.length) filteredItems.push(DIVIDER_ITEM);
          filteredItems.push({
            categoryLabel: category.label,
            key: "category_" + category.key,
            type: ITEM_TYPE.CATEGORY,
          });
          filteredItems.push(...filteredCategoryValues);
        }
      }
      return filteredItems;
    },
    [] as SearchAllFiltersItem[]
  );
  if (filteredItems.length === 0) filteredItems.push(NO_RESULTS_ITEM);
  return filteredItems;
}

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
  surfaceType: SURFACE_TYPE
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
  size: number
): void {
  if (itemSizeByItemKey.has(key)) {
    return;
  }
  itemSizeByItemKey.set(key, size);
}
