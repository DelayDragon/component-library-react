import React, { useState } from "react";
import classNames from "classnames";
import { MenuContext } from './Menu'
import { MenuItemProps } from "./MenuItem";
import { Icon } from "../Icon/Icon";
// import { CSSTransition } from 'react-transition-group'
import { Transition } from "../Transition/transition";

export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
    children?: React.ReactNode
}

export const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className }) => {
    const context = React.useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const idOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [menuOpen, setMenuOpen] = useState(idOpened)

    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    })

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setMenuOpen(!menuOpen)
    }
    let timer: any
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
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
    } : {}

    const renderChildren = () => {
        const subMenuClasses = classNames('viking-submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children, (child, childIndex) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${childIndex}`
                })
            } else {
                console.error("warning: SubMenu has A child which is not a MenuItem component!")
            }
        })
        return (
            // <CSSTransition
            //     in={menuOpen}
            //     timeout={{enter: 300, exit: 300}}
            //     classNames='zoom-in-top'
            //     appear
            //     unmountOnExit
            // >
            //     <ul className={subMenuClasses}>
            //         {childrenComponent}
            //     </ul>
            // </CSSTransition>
            <Transition
                in={menuOpen}
                timeout={{ enter: 300, exit: 300 }}
                animation="zoom-in-bottom"
                wrapper
            >
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </Transition>
        )
    }
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
                <Icon icon='angle-down' className="arrow-icon"></Icon>
            </div>
            {renderChildren()}
        </li>
    )
}
SubMenu.displayName = 'SubMenu'