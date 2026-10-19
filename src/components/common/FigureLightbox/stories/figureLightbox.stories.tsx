import { Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../styles/common/mui/typography";
import { LightboxFigure } from "../components/LightboxFigure/lightboxFigure";
import { FigureLightboxProvider } from "../provider/provider";
import { FIGURES } from "./constants";

const meta = {
  component: LightboxFigure,
  decorators: [
    (Story): JSX.Element => (
      <div style={{ margin: "0 auto", maxWidth: 720, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LightboxFigure>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * A single detailed SVG figure with a caption, outside any FigureLightboxProvider:
 * it opens a lightbox of its own, with no counter and no previous or next.
 */
export const SINGLE_FIGURE: Story = {
  args: { ...FIGURES[0] },
};

/**
 * Figures in a FigureLightboxProvider, as in a blog post: the lightbox shows
 * "Figure N of 4" and steps between them in page order.
 */
export const GROUP: Story = {
  args: { ...FIGURES[0] },
  render: (): JSX.Element => (
    <FigureLightboxProvider>
      {FIGURES.map((figure, index) => (
        <div key={figure.alt} style={{ marginBottom: 32 }}>
          <Typography
            component="p"
            mb={2}
            variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_400}
          >
            Body copy before the figure. Click the figure to open it, then zoom
            with the controls, the mouse wheel or a pinch, and step to the other
            figures with the arrows.
          </Typography>
          <LightboxFigure
            {...figure}
            caption={
              // The second caption includes inline code.
              index === 1 ? (
                <span>
                  {figure.caption} Marker <code>Nu_CDS1</code>.
                </span>
              ) : (
                figure.caption
              )
            }
          />
        </div>
      ))}
    </FigureLightboxProvider>
  ),
};
