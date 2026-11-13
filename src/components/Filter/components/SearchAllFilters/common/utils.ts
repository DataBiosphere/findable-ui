import type { SyntheticEvent } from "react";
import { VIEW_KIND } from "../../../../../common/categories/views/types";
import { SelectCategoryView } from "../../../../../common/entities";
import { OnFilterFn } from "../../../../../hooks/useCategoryFilter";
import { getSortMatchesFn } from "../../../common/utils";
import { SURFACE_TYPE } from "../../surfaces/types";
import {
  DIVIDER_ITEM,
  NO_RESULTS_ITEM,
  POPPER_DRAWER_PAPER_PROPS,
  POPPER_DRAWER_POPPER_PROPS,
  POPPER_MENU_PAPER_PROPS,
  POPPER_MENU_POPPER_PROPS,
} from "./constants";
import {
  type AutocompleteSlotProps,
  ITEM_TYPE,
  type ListSlotProps,
  type SearchAllFiltersItem,
  type ValueItem,
} from "./entities";

/**
 * Filters categories' values by a search term and returns the list items: each enabled category's matching values under a category header, with dividers between categories, or a no results item when nothing matches.
 * @param selectCategoryViews - Select category views.
 * @param inputValue - Search term.
 * @returns The list items to render.
 */
export function applyMenuFilter(
  selectCategoryViews: SelectCategoryView[],
  inputValue: string,
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
            categoryLabel: category.label,
            key: categoryValueKeyPrefix + match.value.key,
            matchRanges: match.labelRanges,
            type: ITEM_TYPE.VALUE,
            value: match.value,
          }),
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
    [] as SearchAllFiltersItem[],
  );
  if (filteredItems.length === 0) filteredItems.push(NO_RESULTS_ITEM);
  return filteredItems;
}

/**
 * Returns the search input of the autocomplete.
 * @param root - Autocomplete root element.
 * @returns The search input, or null before the autocomplete mounts.
 */
export function getInput(root: HTMLElement | null): HTMLInputElement | null {
  return root?.querySelector("input") ?? null;
}

/**
 * Returns the list the search input controls.
 * @param input - Search input.
 * @returns The list, or null when the list is closed.
 */
export function getListbox(input: HTMLInputElement): HTMLElement | null {
  const listboxId = input.getAttribute("aria-controls");
  return listboxId ? input.ownerDocument.getElementById(listboxId) : null;
}

/**
 * Returns the id of the list item at the given index; item keys can contain whitespace, so are not used.
 * @param optionIdPrefix - Prefix unique to the search all filters instance.
 * @param index - List item index.
 * @returns The list item id.
 */
export function getOptionId(optionIdPrefix: string, index: number): string {
  return `${optionIdPrefix}-option-${index}`;
}

/**
 * Returns the autocomplete's slot props for the surface: the list's popper props with its container, and paper props with its focus handlers.
 * @param surfaceType - Filter surface type.
 * @param listSlotProps - List slot props.
 * @param listSlotProps.container - The popper's container: the dialog's paper within a MUI dialog, otherwise null, for the body.
 * @param listSlotProps.onBlur - The paper's blur handler.
 * @param listSlotProps.onKeyDown - The paper's key down handler.
 * @returns The autocomplete slot props.
 */
export function getSlotProps(
  surfaceType: SURFACE_TYPE,
  { container, onBlur, onKeyDown }: ListSlotProps,
): AutocompleteSlotProps {
  const isMenu = surfaceType === SURFACE_TYPE.POPPER_MENU;
  return {
    paper: {
      ...(isMenu ? POPPER_MENU_PAPER_PROPS : POPPER_DRAWER_PAPER_PROPS),
      onBlur,
      onKeyDown,
    },
    popper: {
      ...(isMenu ? POPPER_MENU_POPPER_PROPS : POPPER_DRAWER_POPPER_PROPS),
      container,
    },
  };
}

/**
 * Returns true if the event is the search input losing focus to a term in the list.
 * @param event - Event closing the list.
 * @returns True if focus is moving from the search input into the list.
 */
export function isFocusMovingIntoList(event?: SyntheticEvent): boolean {
  if (!(event?.nativeEvent instanceof FocusEvent)) return false;
  const { relatedTarget, target } = event.nativeEvent;
  if (!(target instanceof HTMLInputElement)) return false;
  if (!(relatedTarget instanceof Node)) return false;
  return Boolean(getListbox(target)?.contains(relatedTarget));
}

/**
 * Sets overflow style for the given list of elements.
 * @param elements - Elements.
 * @param overflowStyle - Overflow style value.
 */
export function setElementsOverflowStyle(
  elements: (HTMLElement | null)[],
  overflowStyle: string,
): void {
  for (const element of elements) {
    if (element) {
      element.style.overflow = overflowStyle;
    }
  }
}

/**
 * Toggles the given value: selects it when unselected, otherwise deselects it.
 * @param item - Value list item.
 * @param onFilter - Function invoked with the value and search term.
 * @param searchTerm - Search term.
 */
export function toggleValue(
  item: ValueItem,
  onFilter: OnFilterFn,
  searchTerm?: string,
): void {
  const {
    categoryKey,
    value: { key, selected },
  } = item;
  onFilter(
    categoryKey,
    key,
    !selected,
    undefined,
    VIEW_KIND.SELECT,
    searchTerm,
  );
}
