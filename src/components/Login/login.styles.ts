import styled from "@emotion/styled";
import {
  textBody400,
  textBodySmall400,
} from "../../styles/common/mixins/fonts";
import { TABLET } from "../../theme/common/breakpoints";
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

  ${({ theme }) => theme.breakpoints.up(TABLET)} {
    padding: 32px;
  }
`;

export const LoginAgreement = styled.div`
  align-items: center;
  align-self: flex-start;
  display: flex;
  gap: 12px;
`;

export const LoginSectionActions = styled(SectionActions)`
  flex-direction: column;
  gap: 16px 0;
`;

export const LoginText = styled.div`
  ${textBody400};
`;

export const TermsOfService = styled.div`
  ${textBody400};

  a {
    color: inherit;
    text-decoration: underline;
  }
`;

export const LoginWarning = styled.div`
  ${textBodySmall400};
  color: ${({ theme }) => theme.palette.ink.light};
`;
