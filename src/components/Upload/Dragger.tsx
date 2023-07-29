import { useState, DragEvent,ReactNode } from 'react'
import classNames from "classnames";

interface DraggerProps {
    onFile: (files: FileList) => void;
    children: ReactNode;
    onClick: () => void;
}

export const Dragger: React.FC<DraggerProps> = (props) => {
    const { 
        onFile, 
        onClick,
        children 
    } = props
    const [dragOver, setDragOver] = useState(false)
    const klass = classNames('viking-uploader-dragger', {
        'is-dragover': dragOver
    })
    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault()
        setDragOver(false)
        onFile(e.dataTransfer.files)
    }
    const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault()
        setDragOver(over)
    }
    return (
        <div
            className={klass}
            onDragOver={e => { handleDrag(e, true) }}
            onDragLeave={e => { handleDrag(e, false) }}
            onClick={onClick}
            onDrop={handleDrop}
        >
            {children}
        </div>
    )
}
