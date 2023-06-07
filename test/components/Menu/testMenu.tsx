// @ts-ignore
import React from 'react'
import { Menu, MenuProps } from '../../../src/components/Menu/Menu'
import { MenuItem } from '../../../src/components/Menu/MenuItem'
import { SubMenu } from '../../../src/components/Menu/SubMenu'


export const GenerateVerticalMenu = (props: MenuProps) => {
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
export const GenerateHorizontalMenu = (props: MenuProps) => {
    return (
        <Menu {...props} mode='horizontal' defaultOpenSubMenus={['3']}>
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