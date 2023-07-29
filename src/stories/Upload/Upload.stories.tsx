import { type Meta, type StoryObj } from '@storybook/react'
import { Upload, UploadFile } from '../../components/Upload/Upload'
import { action } from '@storybook/addon-actions'
import { Icon } from '../../components/Icon/Icon'

const defaultFileList: UploadFile[] = [
    { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
    { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
    { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]

// 测试beforUpload的函数个例
// const checkFileSize = (file: File) => {
//     if(Math.round(file.size / 1024) > 50){
//         alert('file too big')
//         return false
//     }
//     return true
// }
// const filePromise = (file: File) => {
//     const newFile = new File([file], 'new_name_docx', {type: file.type})
//     return Promise.resolve(newFile)
// }

const SimpleUpload: React.FC = () => {
    return (
        <Upload
            // action='https://jsonplaceholder.typicode.com/posts'
            // 自己简单搭建的文件接收接口
            action='http://127.0.0.1:3000/upload'
            onChange={action('changed')}
            defaultFileList={defaultFileList}
            name='fileName'
            data={{ key: 'value' }}
            header={{ 'X-Powered-By': 'viking-ship' }}
            accept='.png'
            multiple
            drag

            children={<>
                <Icon icon={'file-alt'} theme="secondary" size='lg' />
                <span>Drag file over or cilck here to upload</span>
            </>}
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