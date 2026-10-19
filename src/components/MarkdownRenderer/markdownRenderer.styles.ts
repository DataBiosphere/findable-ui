import styled from "@emotion/styled";

// See https://github.com/emotion-js/emotion/issues/1105.
// See https://github.com/emotion-js/emotion/releases/tag/%40emotion%2Fcache%4011.10.2.
const ignoreSsrWarning =
  "/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */";

export const StyledContainer = styled("div")`
  min-width: 0;
  width: 100%;

  /* Wrapped in "&" so the ignore comment keeps working when this component is
     wrapped with styled(): Emotion appends the wrapper's declarations after
     these rules, and a declaration after the rule hides the comment. */
  & {
    > *:first-child:not(style)${ignoreSsrWarning} {
      margin-top: 0;
    }

    > *:last-child:not(style)${ignoreSsrWarning} {
      margin-bottom: 0;
    }
  }
`;
