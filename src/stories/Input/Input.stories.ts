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
        style:{width:'500px'},
        size:'sm',
        disabled:false
    }
}
export const lg : Story = {
    args: {
        size:'lg',
        disabled:false
    }
}