import { matchers } from "@emotion/jest";
import { composeStories } from "@storybook/react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "../src/components/Links/common/entities";
import * as stories from "../src/components/Table/components/TableCell/components/LinkCell/stories/linkCell.stories";

expect.extend(matchers);

const { ClientSide, External, Invalid, WithCustomStyle } =
  composeStories(stories);

const STYLE_RULE_PROPERTIES = {
  TEXT_DECORATION: "text-decoration",
};

const STYLE_RULE_VALUES = {
  NONE: "none",
  UNDERLINE: "underline",
};

describe("TableCell, LinkCell", () => {
  afterEach(() => {});

  it("renders client-side link", async () => {
    render(<ClientSide />);
    const anchorEl = screen.getByText("Explore");
    expect(anchorEl).toBeDefined();
    expect(anchorEl?.getAttribute("href")).toBe("/");
    expect(anchorEl?.getAttribute("rel")).toBe(REL_ATTRIBUTE.NO_OPENER);
    expect(anchorEl?.getAttribute("target")).toBe(ANCHOR_TARGET.SELF);
    // Expect MuiLink-underlineAlways class and underline style.
    expect(anchorEl).toHaveClass("MuiLink-underlineAlways");
    expect(anchorEl).toHaveStyleRule(
      STYLE_RULE_PROPERTIES.TEXT_DECORATION,
      STYLE_RULE_VALUES.UNDERLINE
    );
  });

  it("renders external link", async () => {
    render(<External />);
    const anchorEl = screen.getByText("Explore");
    expect(anchorEl).toBeDefined();
    expect(anchorEl?.getAttribute("href")).toBe("https://www.example.com");
    expect(anchorEl?.getAttribute("rel")).toBe(
      REL_ATTRIBUTE.NO_OPENER_NO_REFERRER
    );
    expect(anchorEl?.getAttribute("target")).toBe(ANCHOR_TARGET.BLANK);
    // Expect MuiLink-underlineAlways class and underline style.
    expect(anchorEl).toHaveClass("MuiLink-underlineAlways");
    expect(anchorEl).toHaveStyleRule(
      STYLE_RULE_PROPERTIES.TEXT_DECORATION,
      STYLE_RULE_VALUES.UNDERLINE
    );
  });

  it("renders plain text for invalid link", () => {
    render(<Invalid />);
    const spanEl = screen.getByText("Explore");
    expect(spanEl.tagName).toBe("SPAN");
    expect(spanEl.getAttribute("href")).toBeNull();
    expect(spanEl.getAttribute("rel")).toBeNull();
    expect(spanEl.getAttribute("target")).toBeNull();
    // Expect no MuiLink-root class and no underline style.
    expect(spanEl).not.toHaveClass("MuiLink-root");
    expect(spanEl).not.toHaveStyleRule(
      STYLE_RULE_PROPERTIES.TEXT_DECORATION,
      STYLE_RULE_VALUES.UNDERLINE
    );
  });

  it("renders link with custom link props", async () => {
    render(<WithCustomStyle />);
    const anchorEl = screen.getByText("Explore");
    // Expect MuiLink-underlineNone class and no underline style.
    expect(anchorEl).toHaveClass("MuiLink-underlineNone");
    expect(anchorEl).toHaveStyleRule(
      STYLE_RULE_PROPERTIES.TEXT_DECORATION,
      STYLE_RULE_VALUES.NONE
    );
    expect(anchorEl).toHaveStyleRule(
      STYLE_RULE_PROPERTIES.TEXT_DECORATION,
      STYLE_RULE_VALUES.NONE,
      { target: ":hover" }
    );
  });
});
