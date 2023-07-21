import { type Meta, type StoryObj } from '@storybook/react'
import { Input } from '../../components/Input/Input'
import { useState } from 'react'

const ControlledInput = () => {
    const [value, setValue] = useState('')
    return <Input value={value} defaultValue={'3'} onChange={(e) => {
        console.log(value)
        setValue(e.target.value)
    }} />
}
const meta = {
    title: 'Example/Input',
    component: Input,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: '这是一个Input组件'
            }
        }
    }
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>



export const sm: Story = {
    args: {
        size: 'sm',
        disabled: false,
        placeholder: 'placeholder',
        append: '.com',
        children: <ControlledInput />
    }
}
export const lg: Story = {
    args: {
        size: 'lg',
        disabled: false,
        prepend: 'http://'
    }
}

export const disabledInput: Story = {
    args: {
        disabled: true,
        placeholder: 'banned'
    }
}