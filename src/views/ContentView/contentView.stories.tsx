import { Meta, StoryObj } from "@storybook/react";
import image from "images/logo.svg";
import React from "react";
import { NavBarHero } from "../../components/Layout/components/Nav/components/NavBarHero/navBarHero";
import { Nav } from "../../components/Layout/components/Nav/nav";
import { ContentView } from "./contentView";

export default {
  component: ContentView,
  parameters: {
    layout: "fullscreen",
  },
  title: "Views/ContentView",
} as Meta<typeof ContentView>;

type Story = StoryObj<typeof ContentView>;

export const ContentViewStory: Story = {
  args: {
    content: (
      <div>
        <h1>Clinical Sequencing Evidence-Generating Research</h1>
        <p>
          The Clinical Sequencing Evidence-Generating Research (CSER) consortium
          is a national multi-site research program funded by the National Human
          Genome Research Institute (NHGRI), the National Cancer Institute (NCI)
          and the National Institute on Minority Health and Health Disparities
          (NIMHD).
        </p>
        <p>
          Prioritizing engagement of traditionally underrepresented populations
          in genomics research, CSER’s seven clinical sites seek to study the
          effectiveness of integrating genome sequencing into the clinical care
          of diverse and medically underserved individuals. CSER’s research
          goals include measuring sequencing’s clinical utility through patient
          and familial responses to genomic testing and evaluating
          patient-provider-laboratory interactions that influence the use of
          sequencing. Drawing from the expertise of clinicians, scientists,
          ethicists, bioinformaticians, economists, and legal scholars, CSER is
          poised to develop and share best practices in areas such as the
          discovery and interpretation of genomic variants, return of results,
          healthcare utilization, health outcomes and metrics, and the ethical,
          legal, and social implications of sequencing in diverse populations.
        </p>
        <h2></h2>
        <p>
          In CSER, we aim to improve the use of genetic information in medicine
          and reduce barriers to genetic services among underserved groups. Our
          research seeks to better understand connections between genes, other
          drivers of health and disease, and health outcomes. We have worked
          with study participants and community partners to help make our
          research more inclusive. We still have much more work to do to ensure
          that our findings are applied in fair and just ways. We also
          acknowledge the need for more diversity among our own researchers. As
          we publish the results of CSER, we commit to carrying efforts forward
          to make sure people of all backgrounds benefit from genomic research
          and medicine.
        </p>
        <h3>Clinical sequencing evidence-generating research (cser) sites:</h3>
        <p>
          In CSER, we aim to improve the use of genetic information in medicine
          and reduce barriers to genetic services among underserved groups. Our
          research seeks to better understand connections between genes, other
          drivers of health and disease, and health outcomes. We have worked
          with study participants and community partners to help make our
          research more inclusive. We still have much more work to do to ensure
          that our findings are applied in fair and just ways. We also
          acknowledge the need for more diversity among our own researchers. As
          we publish the results of CSER, we commit to carrying efforts forward
          to make sure people of all backgrounds benefit from genomic research
          and medicine.
        </p>
        <ul>
          <li>CHARM, Kaiser Permanente Northwest</li>
          <li>KidsCanSeq, Baylor College of Medicine</li>
          <li>NCGENES 2, University of North Carolina, Chapel Hill</li>
          <li>NYCKidSeq, Icahn School of Medicine at Mount Sinai</li>
          <li>P3EGS, University of California, San Francisco</li>
          <li>SouthSeq, HudsonAlpha Institute for Biotechnology</li>
          <li>ClinSeq A2, NHGRI Intramural</li>
          <li>CSER Coordinating Center, University of Washington, Seattle</li>
        </ul>
      </div>
    ),
    navigation: (
      <Nav
        Hero={
          <NavBarHero
            byline="Active August, 2020 to July, 2023"
            logo={{ ...image, height: 40 }}
            slogan="Clinical Sequencing Evidence-Generating Research"
          />
        }
        navigation={[
          { active: true, label: "About", url: "/" },
          { label: "News", url: "/" },
          { label: "Projects", url: "/" },
          { label: "Publications", url: "/" },
          { label: "Resources", url: "/" },
          { label: "Research Materials", url: "/" },
        ]}
      />
    ),
  },
};
