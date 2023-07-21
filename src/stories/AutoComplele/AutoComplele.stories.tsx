import { type Meta, type StoryObj } from '@storybook/react'

import { AutoComplete } from '../../components/AutoComplele/AutoComplele'
import { action } from '@storybook/addon-actions'

const SimpleComplete:React.FC = () => {
    const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
        'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
    const handleFetch = (query: string) => {
        return lakers.filter(name => name.includes(query))
    }
    return (
        <AutoComplete
            fetchSuggestions={handleFetch}
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