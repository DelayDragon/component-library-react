import { type Meta, type StoryObj } from '@storybook/react';
import { Menu } from '../../components/Menu/Menu';
import { MenuItem } from '../../components/Menu/MenuItem';
import { SubMenu } from '../../components/Menu/SubMenu';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Example/Menu',
    component: Menu,
    tags: ['autodocs'],
    argTypes: {
        mode: {
            description: '方向模式',
            table: {
                type: { summary: 'string' },
            },
        },
        children: {
            type: 'function',
            description: "接收MenuItem与SubMenu单个或多个节点",
            table: {
                type: { summary: 'ReactNode | ReactNode[]' },
            }
        },
        onSelect: {
            type: 'function',
            description: "被选择时调用回调"
        },
        defaultOpenSubMenus: {
            description: '默认打开的下拉菜单',
            // control: { type: "array" }
        },
        defaultIndex: {
            defaultValue: "0",
            type: 'string',
            description: '默认选中项',
            control: { type: 'none' }
        },
        className: {
            type: 'string',
            description: '类名'
        },
        backgroundColor: {
            type: 'string',
            description: "背景颜色",
            control: 'color'
        }
    },

    parameters: {
        docs: {
            description: {
                component: "这是一个菜单组件"
            },
            subcomponents: {
                MenuItem: {
                    description: "A menu item that can be clicked to perform an action.",
                    props: {
                        disabled: {
                            description:
                                "The label to display for this menu item. This can be text, or an icon.",
                            type: {
                                summary: "boolean"
                            },
                            control: {
                                type: 'radio',
                            },
                        },
                        onClick: {
                            description: "A callback function to be called when the menu item is clicked",
                            control: null,
                        },
                    }
                }
            },
        },
    }
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Horizontal: Story = {
    args: {
        mode: 'horizontal',
        children: [<MenuItem>
            active
        </MenuItem>,
        <MenuItem disabled>
            disabled
        </MenuItem>,
        <MenuItem>
            xyz
        </MenuItem>,
        <SubMenu title='dropdown'>
            <MenuItem>
                drop1
            </MenuItem>
        </SubMenu>],
        defaultOpenSubMenus: ['3']
    },
    argTypes: {
        mode: {
            description: '方向模式',
            table: {
                type: { summary: 'string', details: 'ceshi' },
            },
        },
        // children: {
        //     type: 'function',
        //     description: "接收MenuItem与SubMenu单个或多个节点",
        //     table: {
        //         type: { summary: 'ReactNode | ReactNode[]' },
        //     }
        // },
        // onSelect: {
        //     type: "function",
        //     description: "被选择时调用回调"
        // },
        // defaultOpenSubMenus: {
        //     description: '默认打开的下拉菜单'
        // },
        // defaultIndex: {
        //     type:'string',
        //     description:'默认选中项',
        //     control:{
        //         type:'radio',
        //     },
        //     options:['0','2','3']
        // },
        // className: {
        //     type:'string',
        //     description:'类名'
        // },
        // backgroundColor:{
        //     type:'string',
        //     description:"背景颜色"
        // }
    }
};

export const Vertical: Story = {
    args: {
        mode: 'vertical',
        children: [<MenuItem>
            active
        </MenuItem>,
        <MenuItem disabled>
            disabled
        </MenuItem>,
        <MenuItem>
            xyz
        </MenuItem>,
        <SubMenu title='dropdown'>
            <MenuItem>
                drop1
            </MenuItem>
        </SubMenu>]

    },
};