import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
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

    it("should not emit target on the fallback span", () => {
      render(
        <Link label={LABEL} target={ANCHOR_TARGET.BLANK} url={INVALID_URL} />,
      );
      expect(screen.getByText(LABEL)).not.toHaveAttribute("target");
    });

    // TypographyProps is the supported way to style the fallback, so it must
    // keep reaching the span.
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

    // props spread after rel, so a caller's rel already won before this change.
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
  });
});
