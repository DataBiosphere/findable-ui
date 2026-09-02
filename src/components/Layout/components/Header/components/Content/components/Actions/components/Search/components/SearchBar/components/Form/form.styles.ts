import styled from "@emotion/styled";
import { PALETTE } from "../../../../../../../../../../../../../../styles/common/constants/palette";

export const StyledForm = styled("form")`
  align-items: center;
  display: flex;
  gap: 16px;
  margin: 0;
  padding: 12px 16px;

  .MuiInput-root {
    border-bottom: 1px solid ${PALETTE.SMOKE_MAIN};
    height: 40px;
    padding: 0;

    &&.Mui-focused ::placeholder {
      color: ${PALETTE.INK_LIGHT};
      opacity: 1;
    }
  }

  /* The input is uncontrolled, so the clear button's visibility is driven by
     :placeholder-shown rather than by conditional rendering. */
  .MuiInput-input:placeholder-shown + .MuiIconButton-root {
    display: none;
  }
`;
