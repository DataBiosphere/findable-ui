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
import { clearInput } from "./utils";

/**
 * Renders the header search form.
 * The input is uncontrolled, so both clearing and submitting read the element
 * through the same ref rather than going through form state.
 * @param props - Component props.
 * @param props.onSubmit - Submits the search term.
 * @returns The header search form.
 */
export default function Form({ onSubmit }: FormProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <StyledForm
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        onSubmit(e, inputRef.current?.value.trim() ?? "")
      }
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
