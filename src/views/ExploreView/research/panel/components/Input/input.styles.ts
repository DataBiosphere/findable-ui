import styled from "@emotion/styled";
import { RoundedPaper } from "../../../../../../components/common/Paper/components/RoundedPaper/roundedPaper";

export const StyledPaper = styled(RoundedPaper)`
  display: flex;
  flex-direction: column;
  margin: 16px;

  .MuiInputBase-root {
    padding: 16px;
  }

  .MuiStack-root {
    justify-content: flex-end;
    padding: 8px;
  }
`;
