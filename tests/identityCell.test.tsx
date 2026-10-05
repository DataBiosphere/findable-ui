import { jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { IdentityCell } from "../src/components/Table/components/TableCell/components/IdentityCell/identityCell";

const CHIP_LABEL = "Homo sapiens";
const MUI_CHIP_ROOT = ".MuiChip-root";
const SUBTITLE_LABEL = "1000 Genomes Project";
const TITLE_LABEL = "ANV5_DONOR_0001";
const TOOLTIP_TITLE = "Organism type";
const URL = "https://www.example.com";

describe("IdentityCell", () => {
  describe("title", () => {
    it("should render plain text when the url is empty", () => {
      render(<IdentityCell title={{ label: TITLE_LABEL, url: "" }} />);
      const titleEl = screen.getByText(TITLE_LABEL);
      expect(titleEl.tagName).toBe("SPAN");
      expect(titleEl).not.toHaveAttribute("href");
      expect(titleEl).not.toHaveClass("MuiLink-root");
    });
  });

  describe("link clicks", () => {
    it.each([
      ["subtitle", SUBTITLE_LABEL],
      ["title", TITLE_LABEL],
    ])(
      "should run the consumer onClick on a %s link without reaching the row",
      (key, label) => {
        // preventDefault stops jsdom attempting to navigate.
        const onClick = jest.fn((event: { preventDefault: () => void }): void =>
          event.preventDefault(),
        );
        const onRowClick = jest.fn();
        render(
          <div onClick={onRowClick}>
            <IdentityCell {...{ [key]: { label, onClick, url: URL } }} />
          </div>,
        );

        fireEvent.click(screen.getByText(label));

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onRowClick).not.toHaveBeenCalled();
      },
    );
  });

  describe("chips", () => {
    it("should use the tooltip as the chip's description, not its name", async () => {
      const { container } = render(
        <IdentityCell
          chips={[
            {
              label: CHIP_LABEL,
              slotProps: { tooltip: { title: TOOLTIP_TITLE } },
            },
          ]}
        />,
      );
      const chipEl = container.querySelector<HTMLElement>(MUI_CHIP_ROOT)!;

      fireEvent.mouseOver(chipEl);
      const tooltipEl = await screen.findByRole("tooltip");

      expect(tooltipEl).toHaveTextContent(TOOLTIP_TITLE);
      expect(chipEl).toHaveAttribute("aria-describedby", tooltipEl.id);
      expect(chipEl).toHaveAccessibleDescription(TOOLTIP_TITLE);
      expect(chipEl).not.toHaveAttribute("aria-label");
      expect(chipEl).not.toHaveAttribute("aria-labelledby");
    });

    it("should stop tooltip chip clicks reaching the row without making the chip a button", () => {
      const onRowClick = jest.fn();
      const { container } = render(
        <div onClick={onRowClick}>
          <IdentityCell
            chips={[
              {
                label: CHIP_LABEL,
                slotProps: { tooltip: { title: TOOLTIP_TITLE } },
              },
            ]}
          />
        </div>,
      );
      const chipEl = container.querySelector<HTMLElement>(MUI_CHIP_ROOT)!;

      fireEvent.click(chipEl);

      expect(onRowClick).not.toHaveBeenCalled();
      expect(chipEl).not.toHaveAttribute("role");
      expect(chipEl).not.toHaveClass("MuiChip-clickable");
    });

    it("should let chip clicks reach the row when there is no tooltip", () => {
      const onRowClick = jest.fn();
      const { container } = render(
        <div onClick={onRowClick}>
          <IdentityCell chips={[{ label: CHIP_LABEL }]} />
        </div>,
      );

      fireEvent.click(container.querySelector<HTMLElement>(MUI_CHIP_ROOT)!);

      expect(onRowClick).toHaveBeenCalledTimes(1);
    });
  });
});
