// @ts-ignore
import React from 'react'
import { Menu, MenuProps } from '../../../src/components/Menu/menu'
import { MenuItem } from '../../../src/components/Menu/menuItem'


export const GenerateMenu = (props: MenuProps) => {
    return(
        <Menu {...props}>
            <MenuItem>
                active
            </MenuItem>
            <MenuItem disabled>
                disabled
            </MenuItem>
            <MenuItem>
                xyz
            </MenuItem>
        </Menu>
    )
}