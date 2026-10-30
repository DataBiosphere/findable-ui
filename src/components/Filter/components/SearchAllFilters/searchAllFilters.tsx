import { ListProps as MListProps } from "@mui/material";
import { forwardRef, JSX, useCallback, useRef, useState } from "react";
import { isSelectCategoryView } from "../../../../common/categories/views/select/typeGuards";
import { SELECTOR } from "../../../../common/selectors";
import { TEST_IDS } from "../../../../tests/testIds";
import {
  StyledPopper,
  StyledPopperDrawer,
} from "../surfaces/popper/Popper/popper.styles";
import { SURFACE_TYPE } from "../surfaces/types";
import {
  POPPER_DRAWER_SLOT_PROPS,
  POPPER_MENU_SLOT_PROPS,
} from "./common/constants";
import { OVERFLOW_STYLE } from "./common/entities";
import { setElementsOverflowStyle } from "./common/utils";
import { OutlinedInput } from "./components/OutlinedInput/outlinedInput";
import { VariableSizeList } from "./components/VariableSizeList/VariableSizeList";
import { AutocompleteContext } from "./context/context";
import { useAutocomplete } from "./context/hook";
import { StyledAutocomplete } from "./searchAllFilters.styles";
import { SearchAllFiltersProps } from "./types";

const Listbox = forwardRef<HTMLUListElement, MListProps>(
  function Listbox(props, ref): JSX.Element {
    props = Object.assign({}, props, {
      children: undefined, // Content is controlled by VariableSizeList
    });
    const { onFilter, searchTerm, selectCategoryViews, surfaceType } =
      useAutocomplete();
    return (
      <VariableSizeList
        autocompleteListProps={props}
        onFilter={onFilter}
        ref={ref}
        searchTerm={searchTerm}
        selectCategoryViews={selectCategoryViews}
        surfaceType={surfaceType}
      />
    );
  },
);

/**
 * Search all filters: an autocomplete searching the values of all select categories, listing the matches in a virtualized list grouped by category.
 * Opening it in the popper menu stops the sidebar scrolling, so the input stays in view; the page still scrolls. Closing it clears the search term, restores the sidebar scrolling, and blurs the input. Clearing the search also closes it in the popper drawer.
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
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectCategoryViews = categoryViews.filter(isSelectCategoryView);

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

  const onClose = useCallback((): void => {
    setSearchTerm("");
    setOpen(false);
    handleBackgroundScroll(OVERFLOW_STYLE.NONE);
    setTimeout(() => {
      autocompleteRef.current?.querySelector("input")?.blur();
    }, 100);
  }, [handleBackgroundScroll]);

  const onOpen = useCallback((): void => {
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
        onClear,
        onFilter,
        open,
        searchTerm,
        selectCategoryViews,
        surfaceType,
      }}
    >
      <StyledAutocomplete
        className={className}
        data-testid={TEST_IDS.SEARCH_ALL_FILTERS}
        filterOptions={(options): string[] => options}
        freeSolo
        onClose={onClose}
        onInputChange={(_, v = "") => setSearchTerm(v)}
        onOpen={onOpen}
        open={open}
        options={[""]} // Placeholder options, since item rendering is fully controlled by VariableSizeList
        ref={autocompleteRef}
        renderInput={OutlinedInput}
        slotProps={
          surfaceType === SURFACE_TYPE.POPPER_MENU
            ? POPPER_MENU_SLOT_PROPS
            : POPPER_DRAWER_SLOT_PROPS
        }
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
