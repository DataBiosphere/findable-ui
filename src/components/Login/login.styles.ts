import styled from "@emotion/styled";
import { FormControlLabel, Typography } from "@mui/material";
import { bpUpSm } from "../../styles/common/mixins/breakpoints";
import { Section, SectionActions } from "../common/Section/section.styles";

export const LoginWrapper = styled.div`
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  gap: 24px 0;
  margin: 0 auto;
  max-width: 400px;
  padding: 56px 16px;
`;

export const LoginSection = styled(Section)`
  gap: 24px 0;
  padding: 32px;

  ${bpUpSm} {
    padding: 32px;
  }
`;

export const LoginAgreement = styled(FormControlLabel)`
  align-items: center;
  align-self: flex-start;
  gap: 0;
  margin: 0;

  .MuiCheckbox-root {
    margin: -13px -1px -13px -13px;
    padding: 13px;
  }
`;

export const LoginSectionActions = styled(SectionActions)`
  flex-direction: column;
  gap: 16px 0;
`;

export const StyledTypography = styled(Typography)`
  a {
    color: inherit;
    text-decoration: underline;
  }
` as typeof Typography;
