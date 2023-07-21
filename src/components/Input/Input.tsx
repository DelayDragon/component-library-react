import React, { ChangeEvent, InputHTMLAttributes, ReactElement } from "react";
import classNames from "classnames";
import { Icon } from "../Icon/Icon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type InputSize = 'lg' | 'sm'
// export type BaseInputType = {
//     className?:string,
//     size?: InputSize,
//     icon?: FontAwesomeIconProps,
//     disabled?: boolean,
//     prepand?: string | ReactElement,
//     append?: string | ReactElement,
//     children?: string
// }
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean;
    size?: InputSize;
    icon?: IconProp;
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void 
}

// type NativeInputProps = BaseInputType & React.InputHTMLAttributes<HTMLElement>
// export type InputProps = Partial<BaseInputType | NativeInputProps>

export const Input: React.FC<InputProps> = (props) => {
    // 取属性
    const {
        className,
        size,
        icon,
        disabled,
        prepend,
        append,
        children,
        ...restProps
    } = props
    // 根据属性计算不同的classname
    const classes = classNames('viking-input-wrapper', className, {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend
    })
    const fixControlledValue = (value: any) => {
        if(typeof value === 'undefined' || value === null){
            return ''
        }
        return value
    }
    if('value' in props){
        delete restProps.defaultValue
        restProps.value = fixControlledValue(props.value)
    }
    // 根据属性判断是否需要添加特定的节点
    return (
        <div
            className={classes}
        >
            {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
            {icon && <div className="icon-wrapper"><Icon icon={icon} title=''></Icon></div>}
            <input
                className="viking-input-inner"
                disabled={disabled}
                {...restProps}
            ></input>
            {append && <div className="viking-input-group-append">{append}</div>}
        </div>
    )
}

Input.defaultProps = {
    disabled: false,
    size: 'sm'
}