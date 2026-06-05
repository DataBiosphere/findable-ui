import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JSX } from "react";
import { FilterTags } from "./filterTags";

const onRemove = (): void => {
  // onRemove function
};

const meta = {
  argTypes: {
    tags: { control: { disable: true } },
  },
  component: FilterTags,
  decorators: [
    (Story): JSX.Element => (
      <div style={{ padding: "8px 12px 8px 16px", width: 264 }}>
        <Story />
      </div>
    ),
  ],
  title: "Components/Filter/FilterTags",
} satisfies Meta<typeof FilterTags>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FilterTagsStory: Story = {
  args: {
    tags: [
      {
        label: "Normal",
        onRemove: onRemove,
      },
      {
        label: "abscess",
        onRemove: onRemove,
      },
      {
        label: "acoustic neuroma",
        onRemove: onRemove,
      },
      {
        label: "acute kidney failure",
        onRemove: onRemove,
      },
      {
        label: "acute kidney tubular necrosis",
        onRemove: onRemove,
      },
      {
        label: "alcohol abuse",
        onRemove: onRemove,
      },
    ],
  },
};
