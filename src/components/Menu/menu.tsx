import React, { useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from './MenuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    children?: React.ReactNode | React.ReactNode[];
    onSelect?: SelectCallback;
    defaultOpenSubMenus?: string[];
    backgroundColor?: string;
}

interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}

export const MenuContext = React.createContext<IMenuContext>({ index: '0' })

export const Menu: React.FC<MenuProps> = (props) => {
    const {
        className,
        mode,
        style,
        children,
        defaultIndex,
        onSelect,
        defaultOpenSubMenus,
        backgroundColor
    } = props
    const [currentActive, setCurrentActive] = useState(defaultIndex)

    const classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })
    const handleClick = (index: string) => {
        setCurrentActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => { 
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if(displayName === 'MenuItem' || displayName === 'SubMenu'){
                return React.cloneElement(childElement, {
                    index: index.toString()
                })
            }else{
                console.error("warning: Menu has A child which is not a MenuItem component!")
            }
        })
    }
    return (
        <ul className={classes} style={{...style,backgroundColor}} data-testid='test-menu'>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}