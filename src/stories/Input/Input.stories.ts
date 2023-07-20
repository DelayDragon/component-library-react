import {type Meta, type StoryObj} from '@storybook/react'
import { Input } from '../../components/Input/Input'

const meta = {
    title: 'Example/Input',
    component: Input,
    tags:['autodocs'],

} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const sm : Story = {
    args: {
        size:'sm',
        disabled:false,
        placeholder:'placeholder',
        append:'.com',
    }
}
export const lg : Story = {
    args: {
        size:'lg',
        disabled:false,
        prepend:'http://'
    }
}

export const disabledInput : Story = {
    args: {
        disabled:true,
        placeholder:'banned'
    }
}