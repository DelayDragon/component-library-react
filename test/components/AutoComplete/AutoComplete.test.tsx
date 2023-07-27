/**
 * @jest-environment jsdom
 */
// @ts-ignore
import React from "react";
import { config } from "react-transition-group";
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react'
import { AutoComplete, AutoCompleteProps,DataSourceType } from '../../../src/components/AutoComplele/AutoComplele'


config.disabled = true

const testArray = [
    { value: 'ab', number: 11 },
    { value: 'abc', number: 1 },
    { value: 'b', number: 4 },
    { value: 'c', number: 15 }
]

const testProps: AutoCompleteProps = {
    // 测试前三个测试用例
    // fetchSuggestions: (query) => { return testArray.filter(item => item.value.includes(query)) },
    // 测试异步性
    fetchSuggestions: (query: string) => {
        return new Promise((resolve, _) => {
            console.log('async');
            const data = testArray.filter(item => item.value.includes(query))
            resolve(data)
        }).then(data => data as DataSourceType[])
    },
    onSelect: jest.fn(),
    placeholder: 'auto-complete',
    // 测试自定义模板
    renderOption: (item) => { return <>{'value:' + item.value}</> }
}

let wrapper: RenderResult, inputNode: HTMLInputElement

describe('test AutoComplete component', () => {
    beforeEach(() => {
        wrapper = render(<AutoComplete {...testProps} />)
        inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    })
    it('test basic AutoComplete behavior', async () => {
        // input change
        fireEvent.change(inputNode, { target: { value: 'a' } })
        await waitFor(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
            console.log(1);
        })
        // should have three suggestion items
        expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
        // click the item
        fireEvent.click(wrapper.getByText('ab'))
        expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
        // fill the input
        expect(inputNode.value).toBe('ab')
    })
    it('should provide keyboard support', async () => {
        fireEvent.change(inputNode, { target: { value: 'a' } })
        await waitFor(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })
        const firstResult = wrapper.queryByText('ab')
        const secondResult = wrapper.queryByText('abc')

        // arrow down
        fireEvent.keyDown(inputNode, { keyCode: 40 })
        expect(firstResult).toHaveClass('item-hightlighted')
        fireEvent.keyDown(inputNode, { keyCode: 40 })
        expect(secondResult).toHaveClass('item-hightlighted')
        // arrow up
        fireEvent.keyDown(inputNode, { keyCode: 38 })
        expect(firstResult).toHaveClass('item-hightlighted')
        // press enter
        fireEvent.keyDown(inputNode, { keyCode: 13 })
        expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()

    })
    it('click outide should hide the dropdown', async () => {
        fireEvent.change(inputNode, { target: { value: 'a' } })
        await waitFor(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })
        fireEvent.click(document)
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    })
    // 测试renderOption需要注释掉以上测试
    it('renderOption should generate the right template', async () => {
        fireEvent.change(inputNode, { target: { value: 'a' } })
        await waitFor(() => {
            expect(wrapper.queryByText('value:ab')).toBeInTheDocument()
        })
    })
    it('async fetchSuggestions should works fine', async () => {
        fireEvent.change(inputNode, { target: { value: 'a' } })
        await waitFor(() => {
            expect(wrapper.queryByText('value:ab')).toBeInTheDocument()
        })
    })
})
