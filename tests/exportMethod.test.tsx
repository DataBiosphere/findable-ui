import { jest } from "@jest/globals";
import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { createAppTheme } from "../src/theme/theme";

jest.unstable_mockModule("../src/hooks/useDownloadStatus", () => ({
  useDownloadStatus: jest.fn(() => ({
    disabled: false,
    isLoading: false,
    message: null,
  })),
}));

const { ExportMethod } =
  await import("../src/components/Export/components/ExportMethod/exportMethod");

describe("ExportMethod", () => {
  it("should draw its coming soon chip as a StatusChip, not with the status variant", () => {
    render(
      <ThemeProvider theme={createAppTheme()}>
        <ExportMethod
          comingSoon
          description="Description"
          route="/export"
          title="Title"
        />
      </ThemeProvider>,
    );
    const { classList } = screen
      .getByText("Coming Soon")
      .closest(".MuiChip-root") as Element;
    expect(classList.contains("MuiChip-filled")).toBe(true);
    expect(classList.contains("MuiChip-status")).toBe(false);
  });
});
