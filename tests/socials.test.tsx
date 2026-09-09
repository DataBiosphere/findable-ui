import { render, screen } from "@testing-library/react";
import { GitHubIcon } from "../src/components/common/CustomIcon/components/GitHubIcon/gitHubIcon";
import { ARIA_LABEL } from "../src/components/common/Socials/constants";
import { Social, Socials } from "../src/components/common/Socials/socials";

const GITHUB: Social = {
  Icon: GitHubIcon,
  label: "GitHub",
  url: "https://github.com/DataBiosphere/findable-ui",
};

describe("Socials", () => {
  // Each social renders as an anchor (the IconButton is given an href), so the
  // accessible role is "link" rather than "button".
  it("should name each social link from its label", () => {
    render(<Socials socials={[GITHUB]} />);
    expect(screen.getByRole("link", { name: "GitHub" })).not.toBeNull();
  });

  it("should fall back to a generic name when the label is not a string", () => {
    render(<Socials socials={[{ ...GITHUB, label: null }]} />);
    expect(
      screen.getByRole("link", { name: ARIA_LABEL.SOCIAL }),
    ).not.toBeNull();
  });
});
