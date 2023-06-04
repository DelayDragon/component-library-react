import React, {useState} from "react";
import classNames from "classnames";
import { MenuContext } from './menu'
import { MenuItemProps } from "./menuItem"; 

export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
    children?: React.ReactNode
}

export const SubMenu: React.FC<SubMenuProps> = ({index, title, children, className}) => {
    const context = React.useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const idOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [menuOpen, setMenuOpen] = useState(idOpened)

    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index
    })

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setMenuOpen(!menuOpen)
    }
    let timer:any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setMenuOpen(toggle)
        }, 300)
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false)}
    } : {}

    const renderChildren = () => {
        const subMenuClasses = classNames('viking-submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children, (child, childIndex) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName === 'MenuItem'){
                return React.cloneElement(childElement, {
                    index: `${index}-${childIndex}`
                })
            }else{
                console.error("warning: SubMenu has A child which is not a MenuItem component!")
            }
        })
        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    } 
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}
SubMenu.displayName = 'SubMenu'