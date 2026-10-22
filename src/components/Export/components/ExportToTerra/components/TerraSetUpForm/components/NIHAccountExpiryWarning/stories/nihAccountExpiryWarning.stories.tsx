import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JSX } from "react";
import { TerraProfileContext } from "../../../../../../../../../terra/context";
import { TerraProfileContextProps } from "../../../../../../../../../terra/types/context";
import { NIHAccountExpiryWarning } from "../nihAccountExpiryWarning";
import { EXPIRED, EXPIRES_IN_DAYS, EXPIRES_IN_ONE_DAY } from "./args";

const meta: Meta<typeof NIHAccountExpiryWarning> = {
  component: NIHAccountExpiryWarning,
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Builds a decorator that provides the given mock Terra profile context.
 * @param value - Mock Terra profile context.
 * @returns story decorator.
 */
function withTerraProfile(
  value: TerraProfileContextProps,
): NonNullable<Story["decorators"]> {
  return [
    (Story): JSX.Element => (
      <TerraProfileContext.Provider value={value}>
        <Story />
      </TerraProfileContext.Provider>
    ),
  ];
}

export const Expired: Story = {
  decorators: withTerraProfile(EXPIRED),
};

export const ExpiresInDays: Story = {
  decorators: withTerraProfile(EXPIRES_IN_DAYS),
};

export const ExpiresInOneDay: Story = {
  decorators: withTerraProfile(EXPIRES_IN_ONE_DAY),
};
