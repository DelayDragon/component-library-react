import React, { useRef, ChangeEvent } from "react";
import axios from 'axios'

import { Button } from "../Button/Button";

export interface UploadProps {
    action: string;
    beforeUpload?: (file: File) => boolean | Promise<File>
    onProgress?: (precentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
}

export const Upload: React.FC<UploadProps> = (props) => {
    const {
        action,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange
    } = props

    const fileInput = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) {
            return
        }
        uploadFiles(files)
        if (fileInput.current) {
            fileInput.current.value = ''
        }
    }
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files)
        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            }

        })
    }
    const post = (file: File) => {
        const formData = new FormData()
        formData.append(file.name, file)
        axios.post(action, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (e) => {
                if (e.total) {
                    let percentage = Math.round((e.loaded * 100) / e.total) || 0
                    if (percentage < 100) {
                        if (onProgress) {
                            onProgress(percentage, file)
                        }
                    }
                }
            }
        }).then(res => {
            console.log(res);
            if (onSuccess) {
                onSuccess(res.data, file)
            }
            if(onChange){
                onChange(file)
            }
        }).catch(err => {
            console.log(err);
            if (onError) {
                onError(err, file)
            }
            if(onChange){
                onChange(file)
            }
        })
    }
    return (
        <div className="viking-upload-component">
            <Button
                btnType="primary"
                onClick={handleClick}
            >
                UploadFile
            </Button>
            <input
                className="viking-file-input"
                style={{ display: 'none' }}
                ref={fileInput}
                type="file"
                onChange={handleFileChange}
            ></input>
        </div>
    )
}