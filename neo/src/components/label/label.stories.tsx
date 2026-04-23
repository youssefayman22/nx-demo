import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from ".";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Label",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Label",
  },
};
