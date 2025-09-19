import { matchers } from "@emotion/jest";
import { composeStories } from "@storybook/react";
import { Column } from "@tanstack/react-table";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "../src/components/Links/common/entities";
import { STYLED_ANCHOR } from "../src/components/Table/components/TableCell/components/MarkdownCell/stories/constants";
import * as stories from "../src/components/Table/components/TableCell/components/MarkdownCell/stories/markdownCell.stories";

expect.extend(matchers);

const { Default, WithHtml } = composeStories(stories);

describe("MarkdownCell", () => {
  it("renders the markdown content", async () => {
    render(<Default />);
    expect(await screen.findByText("UBERON:0000955")).toBeInTheDocument();
  });

  it("renders HTML and anchor elements", async () => {
    render(<WithHtml />);
    const anchorEl = await screen.findByText("example link");
    expect(anchorEl).toBeInTheDocument();
    expect(anchorEl.getAttribute("href")).toBe("https://www.example.com");
    expect(anchorEl.getAttribute("target")).toBe(ANCHOR_TARGET.BLANK);
    expect(anchorEl.getAttribute("rel")).toBe(
      REL_ATTRIBUTE.NO_OPENER_NO_REFERRER
    );
    expect(anchorEl).toHaveClass("MuiLink-root");
  });

  it("applies the correct className and component", async () => {
    render(
      <WithHtml
        className="css-pygqsj"
        column={
          {
            columnDef: { meta: { components: { a: STYLED_ANCHOR } } },
          } as unknown as Column<unknown, string>
        }
      />
    );
    const anchorEl = await screen.findByText("example link");
    expect(anchorEl).toHaveStyleRule("background-color", "green");
    expect(anchorEl).toHaveStyleRule("color", "white");
    expect(anchorEl.closest(".css-pygqsj")).toBeInTheDocument();
  });
});
