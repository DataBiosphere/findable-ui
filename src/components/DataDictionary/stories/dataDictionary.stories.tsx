import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JSX } from "react";
import logo from "../../../images/logo.svg";
import { ConfigProvider } from "../../../providers/config";
import { DataDictionaryStateProvider } from "../../../providers/dataDictionaryState/provider";
import { LayoutDimensionsProvider } from "../../../providers/layoutDimensions/provider";
import { GitHubIcon } from "../../common/CustomIcon/components/GitHubIcon/gitHubIcon";
import { XIcon } from "../../common/CustomIcon/components/XIcon/xIcon";
import { AppLayout } from "../../Layout/components/AppLayout/appLayout.styles";
import { Footer } from "../../Layout/components/Footer/footer";
import { Logo } from "../../Layout/components/Header/components/Content/components/Logo/logo";
import { Header } from "../../Layout/components/Header/header";
import { Main } from "../../Layout/components/Main/main";
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
