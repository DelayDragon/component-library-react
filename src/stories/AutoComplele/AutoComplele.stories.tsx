import { type Meta, type StoryObj } from '@storybook/react'

import { AutoComplete, DataSourceType } from '../../components/AutoComplele/AutoComplele'
import { action } from '@storybook/addon-actions'

const SimpleComplete: React.FC = () => {
    const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
        'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
    const lakersWithNumber = [
        { value: 'bradley', number: 24 },
        { value: 'kuzma', number: 0 }
    ]
    // const handleFetch = (query: string) => {
    //     return lakers.filter(name => name.includes(query)).map(name => ({value: name}))
    // }
    // const handleFetch = (query: string) => {
    //     return lakersWithNumber.filter(player => player.value.includes(query))
    // }
    const handleFetch = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then(({items}) => {
                console.log(items)
                return items?.slice(0,10).map((item: any) => ({value: item.login, ...item}))
            })
    }
    const renderOption = (item: DataSourceType) => {
        return (
            <>
                {/* 展示所有属性与值 */}
                {/* {
                    Object.keys(item).map((key, index) => {
                        while(index < 3){
                            if (item.hasOwnProperty(key)) {
                                return <h2 key={index}>{key}:{item[key]}</h2>
                            }
                        } 
                    })
                } */}
                <h5>{item.value}</h5>
                {/* 注意：在jest测试renderOption自定义模板中，如果改变了模板对应其他测试可能会失败，需要针对性测试注意其他测试！ */}
                {/* {'value:' + item.value} */}
            </>

        )
    }
    return (
        <AutoComplete
            fetchSuggestions={handleFetch}
            renderOption={renderOption}
            onSelect={action('selected')}
        ></AutoComplete>
    )
}

const meta = {
    title: 'Example/AutoComplete',
    component: SimpleComplete,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: '这是一个Input组件'
            }
        }
    }
} satisfies Meta<typeof AutoComplete>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
    args: {

    }
}