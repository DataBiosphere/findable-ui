import styled from "@emotion/styled";

export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0; /* required to ellipsis any flex child */
  width: 100%; /* required to ellipsis any flex child */
`;

export const CitationLink = styled.div`
  align-items: center;
  display: flex;
  min-width: 0;

  // Copy icon button
  & button {
    bottom: 2px; /* Center aligns icon with link text without affecting overall rendered citation link height */
    margin-left: 8px;
    position: relative;
  }
`;
