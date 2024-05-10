import styled from "@emotion/styled";

export const TableCreator = styled.div`
  position: relative; // Required; when the table mounts, the loading element should not transition in and therefore to position the loading element correctly, the parent container must be styled with position relative.
`;
