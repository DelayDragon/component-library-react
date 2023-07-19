import { type Meta, type StoryObj } from '@storybook/react';
import { Button } from '../../components/Button/Button';
import { CenterDecorator } from './CenterDecorator';



// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Example/Button',
  component: Button,
  decorators: [CenterDecorator],
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { 
      description:'背景颜色',
      control: 'color' 
    },
    btnType:{
      description:"按钮类型"
    },
    children: {
      description:'子节点',
      table:{
        type:{
          summary: 'ReactNode | string'
        }
      }
    },
    className:{
      description:"类名",
    },
    disabled: {
      description:"是否可用"
    },
    size:{
      description:'按钮尺寸大小'
    },
    href:{
      description:'link按钮的链接'
    },
  },
  parameters:{
    docs:{
      description: {
        component: "这是一个按钮组件",
        
      }
    }
  }
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
