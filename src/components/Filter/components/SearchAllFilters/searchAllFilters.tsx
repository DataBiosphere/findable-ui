import type {
  AutocompleteCloseReason,
  ListProps as MListProps,
} from "@mui/material";
import {
  forwardRef,
  JSX,
  type SyntheticEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { isSelectCategoryView } from "../../../../common/categories/views/select/typeGuards";
import { SELECTOR } from "../../../../common/selectors";
import { TEST_IDS } from "../../../../tests/testIds";
import { getModalContainer } from "../../common/focus";
import {
  StyledPopper,
  StyledPopperDrawer,
} from "../surfaces/popper/Popper/popper.styles";
import { SURFACE_TYPE } from "../surfaces/types";
import { CLOSE_REASON, PLACEHOLDER_OPTIONS } from "./common/constants";
import { OVERFLOW_STYLE } from "./common/entities";
import {
  applyMenuFilter,
  getInput,
  getSlotProps,
  isFocusMovingIntoList,
  setElementsOverflowStyle,
} from "./common/utils";
import { OutlinedInput } from "./components/OutlinedInput/outlinedInput";
import { VariableSizeList } from "./components/VariableSizeList/VariableSizeList";
import { AutocompleteContext } from "./context/context";
import { useAutocomplete } from "./context/hook";
import { useHighlight } from "./hooks/UseHighlight/hook";
import { useListFocus } from "./hooks/UseListFocus/hook";
import { StyledAutocomplete } from "./searchAllFilters.styles";
import { SearchAllFiltersProps } from "./types";

const Listbox = forwardRef<HTMLUListElement, MListProps>(
  function Listbox(props, ref): JSX.Element {
    props = Object.assign({}, props, {
      "aria-multiselectable": true,
      children: undefined, // Content is controlled by VariableSizeList
    });
    const {
      filteredItems,
      highlightedIndex,
      onFilter,
      optionIdPrefix,
      searchTerm,
      surfaceType,
    } = useAutocomplete();
    return (
      <VariableSizeList
        autocompleteListProps={props}
        filteredItems={filteredItems}
        highlightedIndex={highlightedIndex}
        onFilter={onFilter}
        optionIdPrefix={optionIdPrefix}
        ref={ref}
        searchTerm={searchTerm}
        surfaceType={surfaceType}
      />
    );
  },
);

/**
 * Search all filters: an autocomplete searching the values of all select categories, listing the matches in a virtualized list grouped by category.
 * The list opens when the input takes focus. In the input, ArrowDown and ArrowUp move a highlight through the values, and Enter toggles the highlighted value. The terms sit in the tab order right after the input: Tab moves into the list, and on from its edges (see useListFocus).
 * Within a MUI dialog the list renders in the dialog, so the dialog's focus trap leaves focus in the list.
 * Opening it in the popper menu stops the sidebar scrolling, so the input stays in view; the page still scrolls. Closing it restores the sidebar scrolling and clears the highlight. Closing by moving focus away from the input and the list keeps the search term; closing with Escape clears it; closing any other way clears it and blurs the input. Clearing the search also closes it in the popper drawer.
 * The given Mui Autocomplete props override the defaults, including open, value, and the open, close and input change handlers.
 * @param props - Component props.
 * @param props.categoryViews - Category views; only select category views are searched.
 * @param props.className - Class name applied to the autocomplete.
 * @param props.onFilter - Function invoked when a value is toggled.
 * @param props.surfaceType - Filter surface type; defaults to the popper menu.
 * @returns The search all filters autocomplete.
 */
export const SearchAllFilters = ({
  categoryViews,
  className,
  onFilter,
  surfaceType = SURFACE_TYPE.POPPER_MENU,
  ...props /* Mui AutocompleteProps */
}: SearchAllFiltersProps): JSX.Element => {
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // Filtered once per search, not on each highlight move.
  const filteredItems = useMemo(
    () =>
      applyMenuFilter(categoryViews.filter(isSelectCategoryView), searchTerm),
    [categoryViews, searchTerm],
  );
  const { highlightedIndex, onKeyDown, optionIdPrefix, resetHighlight } =
    useHighlight({
      autocompleteRef,
      items: filteredItems,
      onFilter,
      open,
      searchTerm,
    });

  // Locks or restores the sidebar scroll; the page keeps scrolling, and the input stays in view.
  const handleBackgroundScroll = useCallback(
    (overflowStyle: OVERFLOW_STYLE): void => {
      if (surfaceType === SURFACE_TYPE.POPPER_MENU) {
        setElementsOverflowStyle(
          [document.getElementById(SELECTOR.SIDEBAR_POSITIONER)],
          overflowStyle,
        );
      }
    },
    [surfaceType],
  );

  const onClose = useCallback(
    (event?: SyntheticEvent, reason?: AutocompleteCloseReason): void => {
      if (reason === CLOSE_REASON.BLUR && isFocusMovingIntoList(event)) return;
      setOpen(false);
      resetHighlight();
      handleBackgroundScroll(OVERFLOW_STYLE.NONE);
      if (reason === CLOSE_REASON.BLUR) return; // Focus has moved on; the search is kept for when it returns.
      setSearchTerm("");
      if (reason === CLOSE_REASON.ESCAPE) return; // Focus stays in the input.
      setTimeout(() => {
        getInput(autocompleteRef.current)?.blur();
      }, 100);
    },
    [handleBackgroundScroll, resetHighlight],
  );

  const { onListBlur, onListKeyDown } = useListFocus({
    autocompleteRef,
    onClose,
  });

  const onOpen = useCallback((): void => {
    if (autocompleteRef.current)
      setContainer(getModalContainer(autocompleteRef.current));
    setOpen(true);
    handleBackgroundScroll(OVERFLOW_STYLE.HIDDEN);
  }, [handleBackgroundScroll]);

  const onClear = useCallback((): void => {
    setSearchTerm("");
    if (surfaceType === SURFACE_TYPE.POPPER_DRAWER) onClose();
  }, [onClose, surfaceType]);

  return (
    <AutocompleteContext.Provider
      value={{
        filteredItems,
        highlightedIndex,
        onClear,
        onFilter,
        open,
        optionIdPrefix,
        searchTerm,
        surfaceType,
      }}
    >
      <StyledAutocomplete
        className={className}
        data-testid={TEST_IDS.SEARCH_ALL_FILTERS}
        filterOptions={(options): string[] => options}
        freeSolo
        onClose={onClose}
        onInputChange={(_, v = "") => {
          setSearchTerm(v);
          resetHighlight();
        }}
        onKeyDown={onKeyDown}
        onOpen={onOpen}
        open={open}
        openOnFocus
        options={PLACEHOLDER_OPTIONS} // Placeholder options, since item rendering is fully controlled by VariableSizeList
        ref={autocompleteRef}
        renderInput={OutlinedInput}
        slotProps={getSlotProps(surfaceType, {
          container,
          onBlur: onListBlur,
          onKeyDown: onListKeyDown,
        })}
        slots={
          surfaceType === SURFACE_TYPE.POPPER_MENU
            ? { listbox: Listbox, popper: StyledPopper }
            : { listbox: Listbox, popper: StyledPopperDrawer }
        }
        value={searchTerm}
        {...props}
      />
    </AutocompleteContext.Provider>
  );
};
