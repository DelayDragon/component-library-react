import { type Meta, type StoryObj } from '@storybook/react'
import { Upload } from '../../components/Upload/Upload'
import { action } from '@storybook/addon-actions'


const SimpleUpload: React.FC = () => {
    return (
        <Upload
            action='https://jsonplaceholder.typicode.com/posts'
            onError={action('error')}
            onProgress={(action('progress'))}
            onSuccess={action('success')}
        ></Upload>
    )
}

const meta = {
    title: 'Example/Upload',
    component: SimpleUpload,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: '这是一个Upload组件'
            }
        }
    }
} satisfies Meta<typeof SimpleUpload>

export default meta
type Story = StoryObj<typeof meta>
export const Normal: Story = {
    args: {

    }
}