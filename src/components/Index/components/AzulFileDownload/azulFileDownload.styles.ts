import styled from "@emotion/styled";
import { IconButton as DXIconButton } from "../../../common/IconButton/iconButton";

export const StyledIconButton = styled(DXIconButton)`
  /* The button is disabled to keep it out of the tab order while a download is
   * preparing, so restore the enabled opacity: the theme dims disabled primary
   * icon buttons to 0.5, which compounds with the loading icon's own animated
   * fill-opacity and leaves the spinner close to invisible. */
  &.Mui-disabled {
    opacity: 1;
  }
`;
