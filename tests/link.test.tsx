import { jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "../src/components/Links/common/entities";
import { Link } from "../src/components/Links/components/Link/link";

const LABEL = "Gray (2022) Developmental Cell";

// Empty string is the case consumers hit: isValidUrl("") throws inside new URL()
// and returns false, so the component falls back to a plain span.
const INVALID_URL = "";

describe("Link", () => {
  describe("invalid url", () => {
    // Regression: rel stayed in ...props and was spread onto the span, emitting
    // <span rel="noopener noreferrer">, which is invalid markup.
    it("should not emit rel on the fallback span", () => {
      render(
        <Link
          label={LABEL}
          rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
          target={ANCHOR_TARGET.BLANK}
          url={INVALID_URL}
        />,
      );
      const el = screen.getByText(LABEL);
      expect(el.tagName).toBe("SPAN");
      expect(el).not.toHaveAttribute("rel");
    });

    // download, href, hrefLang, ping, referrerPolicy and rel reached the span
    // before this. target was already destructured and is asserted as a guard.
    it("should not emit any anchor-only prop on the fallback span", () => {
      render(
        <Link
          download="file.csv"
          href="https://elsewhere.example.com"
          hrefLang="en"
          label={LABEL}
          media="print"
          ping="https://ping.example.com"
          referrerPolicy="no-referrer"
          rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
          target={ANCHOR_TARGET.BLANK}
          type="text/csv"
          url={INVALID_URL}
        />,
      );
      const el = screen.getByText(LABEL);
      expect(el.tagName).toBe("SPAN");
      for (const attribute of [
        "download",
        "href",
        "hreflang",
        "media",
        "ping",
        "referrerpolicy",
        "rel",
        "target",
        "type",
      ]) {
        expect(el).not.toHaveAttribute(attribute);
      }
    });

    // Only anchor-only attributes are omitted. Anything valid on a span,
    // including what wrappers such as Tooltip inject, must still reach it.
    it("should keep span-valid props on the fallback span", () => {
      render(
        <Link
          aria-label="Citation"
          data-testid="citation"
          id="citation-id"
          label={LABEL}
          style={{ color: "red" }}
          url={INVALID_URL}
        />,
      );
      const el = screen.getByTestId("citation");
      expect(el.tagName).toBe("SPAN");
      expect(el).toHaveAttribute("aria-label", "Citation");
      expect(el).toHaveAttribute("id", "citation-id");
      expect(el).toHaveStyle({ color: "red" });
    });

    it("should forward ref to the fallback span", () => {
      const ref = createRef<HTMLAnchorElement>();
      render(<Link label={LABEL} ref={ref} url={INVALID_URL} />);
      expect(ref.current).toBe(screen.getByText(LABEL));
    });

    // TypographyProps must keep reaching the span.
    it("should still apply TypographyProps to the fallback span", () => {
      render(
        <Link
          label={LABEL}
          TypographyProps={{ noWrap: true }}
          url={INVALID_URL}
        />,
      );
      expect(screen.getByText(LABEL)).toHaveClass("MuiTypography-noWrap");
    });

    it("should keep TypographyProps.classes on the fallback span typography class channel", () => {
      render(
        <Link
          label={LABEL}
          TypographyProps={{
            classes: { noWrap: "typography-nowrap" },
            noWrap: true,
          }}
          url={INVALID_URL}
        />,
      );
      expect(screen.getByText(LABEL)).toHaveClass("typography-nowrap");
    });

    it("should let clicks on the fallback span reach the parent", () => {
      const onClick = jest.fn((event: { stopPropagation: () => void }): void =>
        event.stopPropagation(),
      );
      const onParentClick = jest.fn();
      render(
        <div onClick={onParentClick}>
          <Link label={LABEL} onClick={onClick} url={INVALID_URL} />
        </div>,
      );

      fireEvent.click(screen.getByText(LABEL));

      expect(onClick).not.toHaveBeenCalled();
      expect(onParentClick).toHaveBeenCalledTimes(1);
    });

    it("should keep className on the fallback span", () => {
      render(
        <Link className="citation-link" label={LABEL} url={INVALID_URL} />,
      );
      expect(screen.getByText(LABEL)).toHaveClass("citation-link");
    });

    it("should merge TypographyProps.className with className on the fallback span", () => {
      render(
        <Link
          TypographyProps={{ className: "tp" }}
          className="caller"
          label={LABEL}
          url={INVALID_URL}
        />,
      );
      expect(screen.getByText(LABEL)).toHaveClass("tp");
      expect(screen.getByText(LABEL)).toHaveClass("caller");
    });

    it("should not emit MuiLink-only props on the fallback span", () => {
      render(
        <Link
          TypographyClasses={{ root: "typography-root" }}
          label={LABEL}
          underline="none"
          url={INVALID_URL}
        />,
      );
      const el = screen.getByText(LABEL);
      expect(el.tagName).toBe("SPAN");
      expect(el).not.toHaveAttribute("typographyclasses");
      expect(el).not.toHaveAttribute("underline");
    });

    it("should ignore Link-only styling props on the fallback span", () => {
      render(
        <Link
          classes={{ root: "link-root" }}
          TypographyClasses={{ root: "typography-root" }}
          label={LABEL}
          noWrap
          underline="none"
          url={INVALID_URL}
        />,
      );
      expect(screen.getByText(LABEL)).toHaveClass("link-root");
      expect(screen.getByText(LABEL)).toHaveClass("MuiTypography-noWrap");
      expect(screen.getByText(LABEL)).not.toHaveClass("MuiLink-underlineNone");
      expect(screen.getByText(LABEL)).toHaveClass("typography-root");
    });

    it("should merge fallback typography class channels", () => {
      render(
        <Link
          TypographyClasses={{ root: "typography-root" }}
          TypographyProps={{ classes: { noWrap: "typography-nowrap-prop" } }}
          classes={{ root: "link-root" }}
          label={LABEL}
          noWrap
          url={INVALID_URL}
        />,
      );
      expect(screen.getByText(LABEL)).toHaveClass("link-root");
      expect(screen.getByText(LABEL)).toHaveClass("typography-root");
      expect(screen.getByText(LABEL)).toHaveClass("typography-nowrap-prop");
    });
  });

  describe("external url", () => {
    it("should default rel to noopener noreferrer", () => {
      render(<Link label={LABEL} url="https://www.example.com" />);
      const el = screen.getByText(LABEL);
      expect(el.tagName).toBe("A");
      expect(el).toHaveAttribute("rel", REL_ATTRIBUTE.NO_OPENER_NO_REFERRER);
    });

    // props is spread after the default rel, so a caller's rel wins.
    it("should let a caller's rel override the default", () => {
      render(
        <Link
          label={LABEL}
          rel={REL_ATTRIBUTE.NO_OPENER}
          url="https://www.example.com"
        />,
      );
      expect(screen.getByText(LABEL)).toHaveAttribute(
        "rel",
        REL_ATTRIBUTE.NO_OPENER,
      );
    });

    // An explicit empty rel is a caller value like any other, so it must not
    // fall back to the default.
    it("should keep an explicitly empty rel", () => {
      render(<Link label={LABEL} rel="" url="https://www.example.com" />);
      expect(screen.getByText(LABEL)).toHaveAttribute("rel", "");
    });

    it("should keep underline and classes, while merging TypographyProps.className with className", () => {
      render(
        <Link
          TypographyProps={{ className: "tp" }}
          classes={{ root: "link-root" }}
          className="caller"
          label={LABEL}
          underline="none"
          url="https://www.example.com"
        />,
      );
      expect(screen.getByText(LABEL)).toHaveClass("MuiLink-underlineNone");
      expect(screen.getByText(LABEL)).toHaveClass("link-root");
      expect(screen.getByText(LABEL)).toHaveClass("tp");
      expect(screen.getByText(LABEL)).toHaveClass("caller");
    });
  });

  describe("client-side url", () => {
    it("should default rel to noopener", () => {
      render(<Link label={LABEL} url="/explore" />);
      const el = screen.getByText(LABEL);
      expect(el.tagName).toBe("A");
      expect(el).toHaveAttribute("rel", REL_ATTRIBUTE.NO_OPENER);
    });

    it("should let a caller's rel override the default", () => {
      render(
        <Link
          label={LABEL}
          rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
          url="/explore"
        />,
      );
      expect(screen.getByText(LABEL)).toHaveAttribute(
        "rel",
        REL_ATTRIBUTE.NO_OPENER_NO_REFERRER,
      );
    });

    it("should keep an explicitly empty rel", () => {
      render(<Link label={LABEL} rel="" url="/explore" />);
      expect(screen.getByText(LABEL)).toHaveAttribute("rel", "");
    });

    it("should keep underline and classes while merging TypographyProps.className with className", () => {
      render(
        <Link
          TypographyProps={{ className: "tp" }}
          classes={{ root: "link-root" }}
          className="caller"
          label={LABEL}
          underline="none"
          url="/explore"
        />,
      );
      expect(screen.getByText(LABEL)).toHaveClass("MuiLink-underlineNone");
      expect(screen.getByText(LABEL)).toHaveClass("link-root");
      expect(screen.getByText(LABEL)).toHaveClass("tp");
      expect(screen.getByText(LABEL)).toHaveClass("caller");
    });
  });
});
