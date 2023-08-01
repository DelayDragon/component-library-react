/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect'
// @ts-ignore
import React from 'react'
import axios from 'axios'
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
// import { Icon } from '../../../src/components/Icon/Icon'
import { Upload, UploadProps } from '../../../src/components/Upload/Upload'
import { act } from 'react-dom/test-utils'

// jest.mock('../../../src/components/Icon/Icon', () => {
//     return jest.fn().mockImplementation(({ icon, onClick }: { icon: string, onClick: () => void }) => {
//         return <span onClick={onClick}>{icon}</span>
//     })
// })
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
    action: 'fakeurl.com',
    onSuccess: jest.fn(),
    onChange: jest.fn(),
    onRemove: jest.fn(),
    // drag: true
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })


describe('test upload component', () => {
    beforeEach(() => {
        wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
        fileInput = wrapper.container.querySelector('.viking-file-input') as HTMLInputElement
        uploadArea = wrapper.queryByText('Click to upload') as HTMLElement

    })
    it('upload precess should works fine', async () => {
        const { queryByText } = wrapper
        // mockedAxios.post.mockImplementation(() => {
        //     return Promise.resolve({ 'data': 'cool' })
        // })
        mockedAxios.post.mockResolvedValue({ 'data': 'cool' })

        expect(uploadArea).toBeInTheDocument()
        expect(fileInput).toBeInTheDocument()
        expect(fileInput).not.toBeVisible()
        expect(wrapper.container.querySelector('.viking-upload-list')).toBeInTheDocument()
        act(() => {
            fireEvent.change(fileInput, { target: { files: [testFile] } })
        })
        expect(queryByText('spinner')).toBeInTheDocument()
        await waitFor(() => {
            expect(queryByText('test.png')).toBeInTheDocument()
            console.log(2);
            expect(queryByText('spinner')).not.toBeInTheDocument()
            console.log(3);

        })
        // expect(queryByText('times-circle')).toBeInTheDocument()
        expect(queryByText('times')).toBeInTheDocument()
        // expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
        // expect(testProps.onChange).toHaveBeenCalledWith(testFile)
        // remove the uploaded file
        fireEvent.click(queryByText('times') as HTMLElement)
        expect(queryByText('test.png')).not.toBeInTheDocument()
        expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
            raw: testFile,
            status: 'success',
            name: 'test.png'
        }))
    })

 
})

