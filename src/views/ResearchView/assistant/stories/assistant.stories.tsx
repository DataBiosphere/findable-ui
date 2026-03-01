import { Box } from "@mui/material";
import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import { JSX } from "react";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { ChatProvider } from "../../state/provider";
import { Assistant } from "../assistant";
import { INITIAL_ARGS, INITIAL_CONFIG } from "./args";
import { ConfigProvider } from "../../../../providers/config";

const meta: Meta<typeof Assistant> = {
  component: Assistant,
  decorators: [
    (Story): JSX.Element => (
      <ConfigProvider config={INITIAL_CONFIG}>
        <ChatProvider initialArgs={INITIAL_ARGS} url="https://api.example.com">
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
            <Story />
          </Box>
        </ChatProvider>
      </ConfigProvider>
    ),
  ],
  parameters: { layout: "none" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
