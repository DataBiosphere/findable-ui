import { ListProps as MListProps } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
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
import { OVERFLOW_STYLE } from "./common/entites";
import { setElementsOverflowStyle } from "./common/utils";
import { OutlinedInput } from "./components/OutlinedInput/outlinedInput";
import { VariableSizeList } from "./components/VariableSizeList/VariableSizeList";
import { AutocompleteContext } from "./context/context";
import { useAutocomplete } from "./context/hook";
import { StyledAutocomplete } from "./searchAllFilters.styles";
import { SearchAllFiltersProps } from "./types";

const Listbox = React.forwardRef<HTMLUListElement, MListProps>(function Listbox(
  props,
  ref
): JSX.Element {
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
});

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

  // Handles background scroll action.
  const handleBackgroundScroll = useCallback(
    (overflowStyle: OVERFLOW_STYLE): void => {
      if (surfaceType === SURFACE_TYPE.POPPER_MENU) {
        setElementsOverflowStyle(
          [
            document.querySelector(SELECTOR.BODY),
            document.getElementById(SELECTOR.SIDEBAR_POSITIONER),
          ],
          overflowStyle
        );
      }
    },
    [surfaceType]
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
