import React, { useRef, ChangeEvent, useState } from "react";
import axios from 'axios'
import { UploadList } from "./UploadList";
import { Button } from "../Button/Button";

export type UploadFileStaus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStaus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}

export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    beforeUpload?: (file: File) => boolean | Promise<File>
    onProgress?: (precentage: number, file: UploadFile) => void;
    onSuccess?: (data: any, file: UploadFile) => void;
    onError?: (err: any, file: UploadFile) => void;
    onChange?: (file: UploadFile) => void;
    onRemove?: (file: UploadFile) => void;
    header?: {[key: string]: any};
    name?: string;
    data?: {[key: string]: any};
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
}

export const Upload: React.FC<UploadProps> = (props) => {
    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        name,
        header,
        data,
        withCredentials,
        accept,
        multiple
    } = props

    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
    const fileInput = useRef<HTMLInputElement>(null)

    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    return { ...file, ...updateObj }
                } else {
                    return file
                }
            })
        })
    }
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
    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        if(onRemove){
            onRemove(file)
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
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        // setFileList([_file, ...fileList])
        setFileList(prevList => {
            return [_file, ...prevList]
        })
        const formData = new FormData()
        formData.append(name || 'file', file)
        if(data){
            Object.keys(data).forEach(key => {
                formData.append(key, data[key])
            })
        }
        axios.post(action, formData, {
            headers: {
                ...header,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: (e) => {
                if (e.total) {
                    let percentage = Math.round((e.loaded * 100) / e.total) || 0
                    if (percentage < 100) {
                        updateFileList(_file, {percent: percentage, status: 'uploading'})

                        if (onProgress) {
                            onProgress(percentage, _file)
                        }
                    }
                }
            }
        }).then(res => {
            updateFileList(_file, {status: 'success', response: res.data})
            console.log(res);
            if (onSuccess) {
                onSuccess(res.data, _file)
            }
            if (onChange) {
                onChange(_file)
            }
        }).catch(err => {
            updateFileList(_file, {status: 'error', response: err})

            console.log(err);
            if (onError) {
                onError(err, _file)
            }
            if (onChange) {
                onChange(_file)
            }
        })
    }
    console.log(fileList);

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
                accept={accept}
                multiple={multiple}
            ></input>
            <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
        </div>
    )
}

Upload.defaultProps = {
    name:'file'
}