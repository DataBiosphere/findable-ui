import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { ARIA_LABEL } from "../src/components/common/Drawer/components/DrawerTitle/constants";
import { DrawerTitle } from "../src/components/common/Drawer/components/DrawerTitle/drawerTitle";

const CLOSE_LABEL = "Close filters";
const TITLE = "Filters";

describe("DrawerTitle", () => {
  it("should name the close button 'Close' by default", () => {
    render(<DrawerTitle onClose={jest.fn()} title={TITLE} />);
    expect(
      screen.getByRole("button", { name: ARIA_LABEL.CLOSE }),
    ).not.toBeNull();
  });

  it("should name the close button with the given closeLabel", () => {
    render(
      <DrawerTitle
        closeLabel={CLOSE_LABEL}
        onClose={jest.fn()}
        title={TITLE}
      />,
    );
    expect(screen.getByRole("button", { name: CLOSE_LABEL })).not.toBeNull();
  });

  it.each([
    ["empty", ""],
    ["whitespace-only", "   "],
  ])(
    "should fall back to 'Close' when closeLabel is %s",
    (_, closeLabel: string) => {
      render(
        <DrawerTitle
          closeLabel={closeLabel}
          onClose={jest.fn()}
          title={TITLE}
        />,
      );
      expect(
        screen.getByRole("button", { name: ARIA_LABEL.CLOSE }),
      ).not.toBeNull();
    },
  );

  it("should not render a close button when onClose is not given", () => {
    render(<DrawerTitle title={TITLE} />);
    expect(screen.queryByRole("button", { name: ARIA_LABEL.CLOSE })).toBeNull();
  });
});
