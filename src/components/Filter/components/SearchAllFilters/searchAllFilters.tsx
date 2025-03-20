import {
  AutocompleteRenderInputParams,
  ListProps as MListProps,
} from "@mui/material";
import React, {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SelectCategoryView } from "../../../../common/entities";
import { SELECTOR } from "../../../../common/selectors";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { DESKTOP_SM } from "../../../../theme/common/breakpoints";
import { SearchCloseButton } from "../SearchAllFiltersSearch/components/SearchCloseButton/searchCloseButton";
import { SearchAllFiltersSearch } from "../SearchAllFiltersSearch/searchAllFiltersSearch";
import { DEFAULT_SLOT_PROPS, DRAWER_SLOT_PROPS } from "./common/constants";
import { OVERFLOW_STYLE } from "./common/entites";
import { setElementsOverflowStyle } from "./common/utils";
import { AutocompletePopper } from "./components/AutocompletePopper/autocompletePopper.styles";
import { VariableSizeList } from "./components/VariableSizeList/VariableSizeList";
import { Autocomplete } from "./searchAllFilters.styles";

export interface SearchAllFiltersProps {
  categoryViews: SelectCategoryView[];
  drawerOpen?: boolean;
  onFilter: OnFilterFn;
}

interface ListboxContextValue {
  categoryViews: SelectCategoryView[];
  onClearSearch: () => void;
  onCloseSearch: () => void;
  onFilter: OnFilterFn;
  open: boolean;
  searchTerm: string;
}

const renderInput = (params: AutocompleteRenderInputParams): JSX.Element => (
  <SearchAllFiltersSearch {...params} />
);

export const ListboxContext = createContext<ListboxContextValue>({
  categoryViews: [],
  onClearSearch: (): void => undefined,
  onCloseSearch: (): void => undefined,
  onFilter: (): void => undefined,
  open: false,
  searchTerm: "",
});

const Listbox = React.forwardRef<HTMLUListElement, MListProps>(function Listbox(
  props,
  ref
): JSX.Element {
  props = Object.assign({}, props, {
    children: undefined, // Content is controlled by VariableSizeList
  });
  const { categoryViews, onFilter, searchTerm } = useContext(ListboxContext);
  return (
    <VariableSizeList
      autocompleteListProps={props}
      categoryViews={categoryViews}
      onFilter={onFilter}
      ref={ref}
      searchTerm={searchTerm}
    />
  );
});

export const SearchAllFilters = ({
  categoryViews,
  drawerOpen = false,
  onFilter,
}: SearchAllFiltersProps): JSX.Element => {
  const desktopSmUp = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, DESKTOP_SM);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Handles background scroll action (desktop only).
  const handleBackgroundScroll = (overflowStyle: OVERFLOW_STYLE): void => {
    if (desktopSmUp) {
      setElementsOverflowStyle(
        [
          document.querySelector(SELECTOR.BODY),
          document.getElementById(SELECTOR.SIDEBAR_POSITIONER),
        ],
        overflowStyle
      );
    }
  };

  // Callback fired when the value is changed.
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  // Clear search
  const onClearSearch = (): void => {
    setSearchTerm("");
  };

  // Close search.
  const onCloseSearch = (): void => {
    setSearchTerm("");
    setOpen(false);
    handleBackgroundScroll(OVERFLOW_STYLE.NONE);
  };

  // Callback fired when the popup requests to be opened.
  const onOpen = (): void => {
    handleBackgroundScroll(OVERFLOW_STYLE.HIDDEN);
  };

  // Open search.
  const onOpenSearch = (): void => {
    if (open) {
      return;
    }
    setOpen(true);
  };

  useEffect(() => {
    if (!open) {
      autocompleteRef.current?.querySelector("input")?.blur();
    }
  }, [open]);

  // Close search when filter drawer is closed.
  useEffect(() => {
    if (!drawerOpen) {
      setSearchTerm("");
      setOpen(false);
    }
  }, [drawerOpen]);

  return (
    <ListboxContext.Provider
      value={{
        categoryViews,
        onClearSearch,
        onCloseSearch,
        onFilter,
        open,
        searchTerm,
      }}
    >
      <Autocomplete
        clearOnBlur={desktopSmUp}
        filterOptions={(options): string[] => options}
        freeSolo
        ListboxComponent={Listbox}
        onBlur={desktopSmUp ? onCloseSearch : undefined}
        onClose={desktopSmUp ? onCloseSearch : undefined}
        onFocus={onOpenSearch}
        onOpen={onOpen}
        open={open}
        options={[""]} // Placeholder options, since item rendering is fully controlled by VariableSizeList
        PopperComponent={AutocompletePopper}
        ref={autocompleteRef}
        renderInput={(props): JSX.Element =>
          renderInput({
            ...props,
            InputProps: {
              ...props.InputProps,
              endAdornment: <SearchCloseButton />,
            },
            inputProps: {
              ...props.inputProps,
              onChange,
            },
          })
        }
        slotProps={desktopSmUp ? DEFAULT_SLOT_PROPS : DRAWER_SLOT_PROPS}
      />
    </ListboxContext.Provider>
  );
};
