/**
 * @jest-environment-options {"customExportConditions": ["browser", "development"]}
 */
// Emotion only checks for SSR-unsafe selectors in its development build, which
// jsdom doesn't resolve by default; the "development" export condition loads it.
import styled from "@emotion/styled";
import { jest } from "@jest/globals";
import { ThemeProvider } from "@mui/material";
import { render } from "@testing-library/react";
import { ElementType } from "react";
import { GridPaper } from "../src/components/common/Paper/paper.styles";
import { StyledMarkdownRenderer as StyledDescription } from "../src/components/DataDictionary/components/Description/description.styles";
import { Layout as FiltersLayout } from "../src/components/DataDictionary/components/Layout/components/FiltersLayout/filtersLayout.styles";
import { MarkdownRenderer } from "../src/components/MarkdownRenderer/markdownRenderer";
import { StyledMarkdownRenderer as StyledMarkdownCell } from "../src/components/Table/components/TableCell/components/MarkdownCell/markdownCell.styles";
import { createAppTheme } from "../src/theme/theme";
import { StyledMarkdownRenderer as StyledAssistantMessage } from "../src/views/ResearchView/assistant/components/Messages/components/AssistantMessage/assistantMessage.styles";

const UNSAFE_SELECTOR_WARNING = "potentially unsafe";

// Wrappers with top-level declarations, which Emotion composes after the wrapped
// component's own rules.
const StyledGridPaper = styled(GridPaper)`
  grid-template-columns: 1fr;
`;

const StyledMarkdownRenderer = styled(MarkdownRenderer)`
  font: inherit;
`;

const UnsuppressedFirstChild = styled.div`
  > *:first-child {
    margin: 0;
  }
`;

const WRAPPERS: [string, ElementType][] = [
  ["styled(GridPaper)", StyledGridPaper],
  ["styled(MarkdownRenderer)", StyledMarkdownRenderer],
  ["AssistantMessage markdown", StyledAssistantMessage],
  ["DataDictionary description markdown", StyledDescription],
  ["DataDictionary filters layout", FiltersLayout],
  ["MarkdownCell markdown", StyledMarkdownCell],
];

/**
 * Renders the given component and returns the number of Emotion unsafe selector warnings logged.
 * @param Component - Component to render.
 * @returns Number of unsafe selector warnings.
 */
function countUnsafeSelectorWarnings(Component: ElementType): number {
  const consoleErrorSpy = jest
    .spyOn(console, "error")
    .mockImplementation(() => undefined);
  render(
    <ThemeProvider theme={createAppTheme()}>
      <Component value="Text">
        <div />
      </Component>
    </ThemeProvider>,
  );
  const count = consoleErrorSpy.mock.calls.filter(([message]) =>
    String(message).includes(UNSAFE_SELECTOR_WARNING),
  ).length;
  consoleErrorSpy.mockRestore();
  return count;
}

describe("Emotion unsafe selector warning", () => {
  it("should warn for an unsuppressed :first-child selector", () => {
    expect(countUnsafeSelectorWarnings(UnsuppressedFirstChild)).toBeGreaterThan(
      0,
    );
  });

  it.each(WRAPPERS)("should not warn for %s", (_, Component) => {
    expect(countUnsafeSelectorWarnings(Component)).toBe(0);
  });
});
