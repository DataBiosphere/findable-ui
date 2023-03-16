import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { CheckboxMenu } from "./checkboxMenu";

export default {
  argTypes: {
    label: { control: "text" },
    onReset: { control: { disabled: true } },
    options: { control: "array" },
  },
  component: CheckboxMenu,
  title: "Components/Common/Menu/CheckboxMenu",
} as ComponentMeta<typeof CheckboxMenu>;

const CheckboxMenuTemplate: ComponentStory<typeof CheckboxMenu> = (args) => (
  <CheckboxMenu {...args} />
);

const onChange = (): void => {
  // onChange function
};

const onReset = (): void => {
  // onReset function
};

export const CheckboxMenuStory = CheckboxMenuTemplate.bind({});
CheckboxMenuStory.args = {
  label: "Options",
  onReset: onReset,
  options: [
    {
      checked: true,
      disabled: true,
      label: "Item 1",
      onChange,
      value: "item_1",
    },
    {
      checked: false,
      disabled: false,
      label: "Item 2",
      onChange,
      value: "item_2",
    },
    {
      checked: true,
      disabled: false,
      label: "Item 3",
      onChange,
      value: "item_3",
    },
  ],
};
