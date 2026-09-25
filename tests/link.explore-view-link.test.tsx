import { jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { JSX, ReactNode } from "react";

jest.unstable_mockModule(
  "../src/components/Links/components/Link/components/ExploreViewLink/exploreViewLink",
  () => ({
    ExploreViewLink: ({
      className,
      label,
    }: {
      className?: string;
      label: ReactNode;
    }): JSX.Element => (
      <span className={className} data-testid="explore-view-link">
        {label}
      </span>
    ),
  }),
);

const { Link } = await import("../src/components/Links/components/Link/link");

describe("Link explore-view url object", () => {
  it("should forward only the top-level className to ExploreViewLink", () => {
    render(
      <Link
        TypographyProps={{ className: "tp" }}
        className="caller"
        label="Explore Link"
        url={{
          href: "/explore/samples",
          query: encodeURIComponent(JSON.stringify({ filter: [] })),
        }}
      />,
    );

    expect(screen.getByTestId("explore-view-link")).toHaveClass("caller");
    expect(screen.getByTestId("explore-view-link")).not.toHaveClass("tp");
  });
});
