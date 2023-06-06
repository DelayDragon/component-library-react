import type { Meta, StoryObj } from '@storybook/react';

import { MyButton } from './MyButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Example/MyButton',
  component: MyButton,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof MyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'MyButton',
  },
};

export const Secondary: Story = {
  args: {
    label: 'MyButton',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'MyButton',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'MyButton',
  },
};
