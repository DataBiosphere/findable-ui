import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
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
  });
});
