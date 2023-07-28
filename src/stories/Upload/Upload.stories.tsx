import { type Meta, type StoryObj } from '@storybook/react'
import { Upload } from '../../components/Upload/Upload'
import { action } from '@storybook/addon-actions'


const checkFileSize = (file: File) => {
    if(Math.round(file.size / 1024) > 50){
        alert('file too big')
        return false
    }
    return true
}
const filePromise = (file: File) => {
    const newFile = new File([file], 'new_name_docx', {type: file.type})
    return Promise.resolve(newFile)
}

const SimpleUpload: React.FC = () => {
    return (
        <Upload
            action='https://jsonplaceholder.typicode.com/posts'
            beforeUpload={filePromise}
            onChange={action('changed')}

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