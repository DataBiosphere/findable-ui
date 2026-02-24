import { Box } from "@mui/material";
import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import { JSX } from "react";
import { PALETTE } from "../../../../../styles/common/constants/palette";
import { ChatProvider } from "../../state/provider";
import { Panel } from "../panel";
import { INITIAL_ARGS } from "./args";

const meta: Meta<typeof Panel> = {
  component: Panel,
  decorators: [
    (Story): JSX.Element => (
      <ChatProvider initialArgs={INITIAL_ARGS}>
        <Box
          sx={{
            backgroundColor: PALETTE.COMMON_WHITE,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            minHeight: 0,
            width: "412px",
          }}
        >
          <div>
            <Story />
          </div>
        </Box>
      </ChatProvider>
    ),
  ],
  parameters: { layout: "none" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
