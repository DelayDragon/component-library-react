/**
 * @jest-environment jsdom
 */

import { fireEvent, render, RenderResult, cleanup, waitFor } from '@testing-library/react'
import { MenuProps } from '../../../src/components/Menu/Menu'
import { GenerateVerticalMenu } from './testMenu'

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}
const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical'
}

const createStyleFile = () => {
    const cssFile: string = `
        .viking-submenu {
            display: none;
        }
        .viking-submenu.menu-opened {
            display:block;
        }
    `
    const style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    style.innerHTML = cssFile
    return style
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component', () => {
    beforeEach(() => {
        wrapper = render(GenerateVerticalMenu(testProps))
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')

    })
    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('viking-menu test')
        // expect(menuElement.getElementsByTagName('li').length).toEqual(5)
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')

    })
    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('xyz')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })
    it('should render vertical mode when mode is set to vertical', () => {
        cleanup()
        const wrapper = render(GenerateVerticalMenu(testVerProps))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
    // 测试横向下拉菜单
    // it('should show dropdown items when hover on subMenu', async () => {
    //     expect(wrapper.queryByText('drop1')).not.toBeVisible()
    //     const dropdownElement = wrapper.getByText('dropdown')
    //     fireEvent.mouseEnter(dropdownElement)
    //     await waitFor(() => {
    //         expect(wrapper.queryByText('drop1')).toBeVisible()
    //     })
    //     fireEvent.click(wrapper.getByText('drop1'))
    //     expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    //     fireEvent.mouseLeave(dropdownElement)
    //     await waitFor(() => {
    //         expect(wrapper.queryByText('drop1')).not.toBeVisible()
    //     })
    // })
    // 测试纵向下拉菜单
    it('should show dropdown items when click on subMenu', async () => {
        // 这里的异步并没有什么用，只是为了避免测试中提示waitFor未使用的情况
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).toBeVisible()
            fireEvent.click(wrapper.getByText('dropdown'))
            expect(wrapper.getByText('drop1')).not.toBeVisible()
            fireEvent.click(wrapper.getByText('drop1'))
            expect(wrapper.getByText('drop1')).toHaveClass('is-active')
            fireEvent.click(wrapper.getByText('dropdown'))
            expect(wrapper.getByText('drop1')).toBeVisible()
        })
    })
})