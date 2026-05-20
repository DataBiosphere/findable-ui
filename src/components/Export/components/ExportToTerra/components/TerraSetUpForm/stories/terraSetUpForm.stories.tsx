import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ComponentProps, JSX } from "react";
import { AuthContext } from "../../../../../../../auth/contexts/auth";
import { CONTROL_TYPE } from "../../../../../../../storybook/controls/types";
import { configureControls } from "../../../../../../../storybook/controls/utils";
import { TerraProfileContext } from "../../../../../../../terra/context";
import { TerraSetUpUIProvider } from "../../../../../../../terra/setUpUI/provider/provider";
import { TerraSetUpForm } from "../terraSetUpForm";
import {
  DEFAULT_TERRA_SET_UP_FORM_ARGS,
  MOCK_AUTH_STATE,
  MOCK_TERRA_PROFILE_INCOMPLETE,
} from "./args";
import { BOOLEAN_CONTROLS } from "./constants";

const meta: Meta<typeof TerraSetUpForm> = {
  argTypes: {
    ...configureControls<ComponentProps<typeof TerraSetUpForm>>(
      BOOLEAN_CONTROLS,
      CONTROL_TYPE.BOOLEAN,
    ),
  },
  component: TerraSetUpForm,
  decorators: [
    (Story): JSX.Element => (
      <AuthContext.Provider
        value={{
          authDispatch: null,
          authState: MOCK_AUTH_STATE,
          service: undefined,
        }}
      >
        <TerraProfileContext.Provider value={MOCK_TERRA_PROFILE_INCOMPLETE}>
          <TerraSetUpUIProvider>
            <Box m={8}>
              <Story />
            </Box>
          </TerraSetUpUIProvider>
        </TerraProfileContext.Provider>
      </AuthContext.Provider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: DEFAULT_TERRA_SET_UP_FORM_ARGS,
};

export const NotCollapsible: Story = {
  args: { ...DEFAULT_TERRA_SET_UP_FORM_ARGS, collapsible: false },
};
