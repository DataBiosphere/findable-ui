import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { Contact } from "../src/components/Project/common/entities";
import { Contacts } from "../src/components/Project/components/Contacts/contacts";
import { createAppTheme } from "../src/theme/theme";

const EMPTY_STATE = "None";

/**
 * Renders the Contacts section within the app theme.
 * @param contacts - Contacts to render.
 */
function renderContacts(contacts?: Contact[]): void {
  render(
    <ThemeProvider theme={createAppTheme()}>
      <Contacts contacts={contacts} />
    </ThemeProvider>,
  );
}

describe("Contacts", () => {
  // An empty array used to render an empty list instead of the empty state.
  // The other Project sections share the same `?.length` guard.
  it("should show the empty state when given an empty array", () => {
    renderContacts([]);
    expect(screen.getByText(EMPTY_STATE)).not.toBeNull();
  });

  it("should show the empty state when not given contacts", () => {
    renderContacts();
    expect(screen.getByText(EMPTY_STATE)).not.toBeNull();
  });

  it("should list contacts instead of the empty state", () => {
    renderContacts([
      {
        email: "jane@example.com",
        institution: "Example University",
        name: "Jane Doe",
      },
    ]);
    expect(screen.getByText("Jane Doe")).not.toBeNull();
    expect(screen.queryByText(EMPTY_STATE)).toBeNull();
  });
});
