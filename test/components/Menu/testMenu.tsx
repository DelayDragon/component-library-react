// @ts-ignore
import React from 'react'
import { Menu, MenuProps } from '../../../src/components/Menu/menu'
import { MenuItem } from '../../../src/components/Menu/menuItem'
import { SubMenu } from '../../../src/components/Menu/subMenu'


export const GenerateMenu = (props: MenuProps) => {
    return (
        <Menu {...props} mode='vertical' defaultOpenSubMenus={['3']}>
            <MenuItem>
                active
            </MenuItem>
            <MenuItem disabled>
                disabled
            </MenuItem>
            <MenuItem>
                xyz
            </MenuItem>
            <SubMenu title='dropdown'>
                <MenuItem>
                    drop1
                </MenuItem>
            </SubMenu>
        </Menu>
    )
}