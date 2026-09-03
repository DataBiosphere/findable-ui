import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JSX } from "react";
import logo from "../../../images/logo.svg";
import { ConfigProvider } from "../../../providers/config";
import { DataDictionaryStateProvider } from "../../../providers/dataDictionaryState/provider";
import { LayoutDimensionsProvider } from "../../../providers/layoutDimensions/provider";
import { GitHubIcon } from "../../common/CustomIcon/components/GitHubIcon/gitHubIcon";
import { XIcon } from "../../common/CustomIcon/components/XIcon/xIcon";
import { AppLayout } from "../../Layout/components/AppLayout/appLayout.styles";
import { Main } from "../../Layout/components/ContentLayout/components/Main/main";
import { Footer } from "../../Layout/components/Footer/footer";
import { Logo } from "../../Layout/components/Header/components/Content/components/Logo/logo";
import { Header } from "../../Layout/components/Header/header";
import { DataDictionary } from "../dataDictionary";
import { DICTIONARY_PATH } from "./constants";
import { getSiteConfig } from "./utils";

const meta: Meta<typeof DataDictionary> = {
  component: DataDictionary,
  parameters: { layout: "fullscreen" },
  title: "Components/DataDictionary",
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Renders the dictionary as a page — header, main and footer — because the
 * layouts under test are sticky against the document scrollport and cannot be
 * judged without the elements they compete with.
 *
 * Uses `ContentLayout`'s `Main`, not `Layout/components/Main`, to match the
 * data-portal's dictionary page: it sets `Page.Main` to this one, opting out of
 * the header offset that `_app` applies by default. `<main>` therefore starts at
 * the top of the viewport, behind the fixed header, and the only thing pushing
 * content clear of it is the sticky layouts' own `padding-top`.
 * @returns The data dictionary page.
 */
const PageStory = (): JSX.Element => (
  <ConfigProvider config={getSiteConfig()}>
    <LayoutDimensionsProvider>
      <DataDictionaryStateProvider>
        <AppLayout>
          <Header
            logo={<Logo alt="Logo" height={32} link="/" src={logo.src} />}
            navigation={[
              undefined,
              [
                { label: "Datasets", url: "/" },
                { label: "Guides", url: "/" },
                { label: "Metadata", url: "/" },
              ],
              undefined,
            ]}
            searchEnabled
            searchURL="/search"
            socialMedia={{
              socials: [
                { Icon: GitHubIcon, label: "GitHub", url: "/" },
                { Icon: XIcon, label: "X", url: "/" },
              ],
            }}
          />
          <Main>
            <DataDictionary dictionary={DICTIONARY_PATH} />
          </Main>
          <Footer
            Branding={<Logo alt="Logo" height={24} link="/" src={logo.src} />}
            navLinks={[
              { label: "About", url: "/" },
              { label: "Privacy", url: "/" },
            ]}
            socials={[{ Icon: GitHubIcon, label: null, url: "/" }]}
          />
        </AppLayout>
      </DataDictionaryStateProvider>
    </LayoutDimensionsProvider>
  </ConfigProvider>
);

export const Page: Story = { render: () => <PageStory /> };
