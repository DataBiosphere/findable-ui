import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { Button } from "../src/components/Export/components/ExportToTerra/components/TerraSetUpForm/components/Button/button";
import { TerraSetUpUIProvider } from "../src/terra/setUpUI/provider/provider";
import { createAppTheme } from "../src/theme/theme";

describe("TerraSetUpForm Button", () => {
  it("renders Save & continue later as the white outlined secondary button", () => {
    render(
      <ThemeProvider theme={createAppTheme()}>
        <TerraSetUpUIProvider>
          <Button collapsible />
        </TerraSetUpUIProvider>
      </ThemeProvider>,
    );

    // `outlined` `secondary` is the white button; `contained` `secondary` has no theme styles.
    expect(
      screen
        .getByRole("button", { name: "Save & continue later" })
        .classList.contains("MuiButton-outlinedSecondary"),
    ).toBe(true);
  });
});
