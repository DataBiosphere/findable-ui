import { CloseRounded } from "@mui/icons-material";
import { Button, IconButton, Input } from "@mui/material";
import { FormEvent, JSX, useRef } from "react";
import { ICON_BUTTON_PROPS } from "../../../../../../../../../../../../../../styles/common/mui/iconButton";
import { SVG_ICON_PROPS } from "../../../../../../../../../../../../../../styles/common/mui/svgIcon";
import { BUTTON_PROPS } from "../../../../../../../../../../../../../common/Button/constants";
import { SearchIcon } from "../../../../../../../../../../../../../common/CustomIcon/components/SearchIcon/searchIcon";
import { ARIA_LABEL, INPUT_PROPS } from "./constants";
import { StyledForm } from "./form.styles";
import type { FormProps } from "./types";
import { clearInput, getSearchTerm } from "./utils";

/**
 * Renders the header search form.
 * The input is uncontrolled; the search term is read from the form on submit.
 * Remaining props are spread onto the form element, which is how the handlers
 * `ClickAwayListener` injects reach it.
 * @param props - Component props.
 * @param props.onSubmit - Submits the search term.
 * @param props.ref - Forwarded to the form element.
 * @returns The header search form.
 */
export default function Form({
  onSubmit,
  ref,
  ...props
}: FormProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <StyledForm
      {...props}
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        onSubmit(e, getSearchTerm(e))
      }
      ref={ref}
      role="search"
    >
      <SearchIcon fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL} />
      <Input
        {...INPUT_PROPS}
        endAdornment={
          <IconButton
            aria-label={ARIA_LABEL.CLEAR}
            edge={ICON_BUTTON_PROPS.EDGE.END}
            onClick={() => clearInput(inputRef.current)}
            size={ICON_BUTTON_PROPS.SIZE.SMALL}
          >
            <CloseRounded
              color={SVG_ICON_PROPS.COLOR.INK_LIGHT}
              fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL}
            />
          </IconButton>
        }
        inputRef={inputRef}
      />
      <Button {...BUTTON_PROPS.PRIMARY_CONTAINED} type="submit">
        Search
      </Button>
    </StyledForm>
  );
}
