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

  // Social.label is typed ReactNode, so an element is valid per the public type.
  // Naming every such link ARIA_LABEL.SOCIAL would leave a list of socials
  // indistinguishable, so the host stands in for the label.
  it("should fall back to the host when the label is not a string", () => {
    render(<Socials socials={[{ ...GITHUB, label: <span>GitHub</span> }]} />);
    expect(screen.getByRole("link", { name: "github.com" })).not.toBeNull();
  });

  it("should keep element-labelled socials distinguishable from each other", () => {
    render(
      <Socials
        socials={[
          { ...GITHUB, label: <span>GitHub</span> },
          { ...GITHUB, label: <span>X</span>, url: "https://x.com/dbiosphere" },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: "github.com" })).not.toBeNull();
    expect(screen.getByRole("link", { name: "x.com" })).not.toBeNull();
  });

  it("should fall back to a generic name when the url has no host", () => {
    render(<Socials socials={[{ ...GITHUB, label: null, url: "/socials" }]} />);
    expect(
      screen.getByRole("link", { name: ARIA_LABEL.SOCIAL }),
    ).not.toBeNull();
  });
});
