import type { Meta, StoryObj } from '@storybook/react';

// import { Button } from './Button';
import { Button } from '../components/Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    btnType: 'primary',
    children: 'Button'
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button'
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Button'
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Button'
  },
};
