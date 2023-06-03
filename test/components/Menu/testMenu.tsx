// @ts-ignore
import React from 'react'
import { Menu, MenuProps } from '../../../src/components/Menu/menu'
import { MenuItem } from '../../../src/components/Menu/menuItem'


export const GenerateMenu = (props: MenuProps) => {
    return(
        <Menu {...props}>
            <MenuItem index={0}>
                active
            </MenuItem>
            <MenuItem index={1} disabled>
                disabled
            </MenuItem>
            <MenuItem index={2}>
                xyz
            </MenuItem>
        </Menu>
    )
}