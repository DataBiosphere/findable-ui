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
import { isSelectCategoryView } from "../../../../common/categories/views/select/typeGuards";
import { CategoryView } from "../../../../common/categories/views/types";
import { SelectCategoryView } from "../../../../common/entities";
import { SELECTOR } from "../../../../common/selectors";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { TEST_IDS } from "../../../../tests/testIds";
import { useDrawer } from "../../../common/Drawer/provider/hook";
import { SearchCloseButton } from "../SearchAllFiltersSearch/components/SearchCloseButton/searchCloseButton";
import { SearchAllFiltersSearch } from "../SearchAllFiltersSearch/searchAllFiltersSearch";
import { DEFAULT_SLOT_PROPS, DRAWER_SLOT_PROPS } from "./common/constants";
import { OVERFLOW_STYLE } from "./common/entites";
import { setElementsOverflowStyle } from "./common/utils";
import { AutocompletePopper } from "./components/AutocompletePopper/autocompletePopper.styles";
import { VariableSizeList } from "./components/VariableSizeList/VariableSizeList";
import { Autocomplete } from "./searchAllFilters.styles";

export interface SearchAllFiltersProps {
  categoryViews: CategoryView[];
  onFilter: OnFilterFn;
}

interface ListboxContextValue {
  onClearSearch: () => void;
  onCloseSearch: () => void;
  onFilter: OnFilterFn;
  open: boolean;
  searchTerm: string;
  selectCategoryViews: SelectCategoryView[];
}

const renderInput = (params: AutocompleteRenderInputParams): JSX.Element => (
  <SearchAllFiltersSearch {...params} />
);

export const ListboxContext = createContext<ListboxContextValue>({
  onClearSearch: (): void => undefined,
  onCloseSearch: (): void => undefined,
  onFilter: (): void => undefined,
  open: false,
  searchTerm: "",
  selectCategoryViews: [],
});

const Listbox = React.forwardRef<HTMLUListElement, MListProps>(function Listbox(
  props,
  ref
): JSX.Element {
  props = Object.assign({}, props, {
    children: undefined, // Content is controlled by VariableSizeList
  });
  const { onFilter, searchTerm, selectCategoryViews } =
    useContext(ListboxContext);
  return (
    <VariableSizeList
      autocompleteListProps={props}
      onFilter={onFilter}
      ref={ref}
      searchTerm={searchTerm}
      selectCategoryViews={selectCategoryViews}
    />
  );
});

export const SearchAllFilters = ({
  categoryViews,
  onFilter,
}: SearchAllFiltersProps): JSX.Element => {
  const { open: isDrawerOpen } = useDrawer();
  const bpUpMd = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, "md");
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectCategoryViews = categoryViews.filter((view) =>
    isSelectCategoryView(view)
  );

  // Handles background scroll action ("md" and up).
  const handleBackgroundScroll = (overflowStyle: OVERFLOW_STYLE): void => {
    if (bpUpMd) {
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
    if (!isDrawerOpen) {
      setSearchTerm("");
      setOpen(false);
    }
  }, [isDrawerOpen]);

  return (
    <ListboxContext.Provider
      value={{
        onClearSearch,
        onCloseSearch,
        onFilter,
        open,
        searchTerm,
        selectCategoryViews,
      }}
    >
      <Autocomplete
        clearOnBlur={bpUpMd}
        data-testid={TEST_IDS.SEARCH_ALL_FILTERS}
        filterOptions={(options): string[] => options}
        freeSolo
        ListboxComponent={Listbox}
        onBlur={bpUpMd ? onCloseSearch : undefined}
        onClose={bpUpMd ? onCloseSearch : undefined}
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
        slotProps={bpUpMd ? DEFAULT_SLOT_PROPS : DRAWER_SLOT_PROPS}
      />
    </ListboxContext.Provider>
  );
};
