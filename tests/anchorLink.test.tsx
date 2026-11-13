import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";

jest.unstable_mockModule("next/router", () => ({
  ...jest.requireActual<typeof import("next/router")>("next/router"),
  useRouter: jest.fn(() => ({ query: {} })),
}));

const { AnchorLink } =
  await import("../src/components/common/AnchorLink/anchorLink");

describe("AnchorLink", () => {
  it("names the link after the section title it is given", () => {
    render(
      <AnchorLink anchorLink="data-access-policy" label="Data Access Policy" />,
    );
    expect(
      screen.getByRole("link", { name: "Link to Data Access Policy" }),
    ).toBeTruthy();
  });

  it.each([
    ["no label", undefined],
    ["an empty label", ""],
    ["a blank label", "  "],
  ])("names the link generically with %s", (_, label) => {
    render(<AnchorLink anchorLink="data-access-policy" label={label} />);
    expect(
      screen.getByRole("link", { name: "Link to this section" }),
    ).toBeTruthy();
  });

  it("links to the anchor", () => {
    render(<AnchorLink anchorLink="data-access-policy" />);
    expect(screen.getByRole("link").getAttribute("href")).toBe(
      "#data-access-policy",
    );
  });
});
