import { UploadFile } from "./Upload";
// import { Icon } from "../Icon/Icon";
import { Progress } from "../Progress/Progress";

interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void
}

export const UploadList: React.FC<UploadListProps> = (props) => {
    const {
        fileList,
        onRemove,
    } = props
    return (
        <ul className="viking-upload-list">
            {
                fileList.map(item => {
                    return (
                        <li className="viking-upload-list-item" key={item.uid}>
                            <span className={`file-name file-name-${item.status}`}>
                                {/* 单元测试替换Icon */}
                                {/* <Icon icon={'file-alt'} theme="secondary" /> */}
                                {item.name}
                            </span>
                            <span className="file-status">
                                {/* {(item.status === 'uploading' || item.status === 'ready') && <Icon icon='spinner' spin theme="primary" />}
                                {item.status === 'success' && <Icon icon='check-circle' theme="success" />}
                                {item.status === 'error' && <Icon icon='times-circle' theme="danger" />} */}
                                {/* 单元测试替换Icon */}
                                {(item.status === 'uploading' || item.status === 'ready') && <span>spinner</span>}
                                {item.status === 'success' && <span>check-circle</span>}
                                {item.status === 'error' && <span>times-circle</span>}
                            </span>
                            <span className="file-actions">
                                {/* <Icon icon={'times'} onClick={() => onRemove(item)}></Icon> */}
                                {/* 单元测试替换Icon */}
                                <span onClick={() => onRemove(item)}>times</span>
                            </span>
                            {item.status === 'uploading' &&
                                <Progress
                                    percent={item.percent || 0}
                                />
                            }
                        </li>
                    )
                })
            }
        </ul>
    )
}
