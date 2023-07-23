import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import  {Input,InputProps } from '../Input/Input'
import { Icon } from '../Icon/Icon';
import useDebounce from '../../hooks/useDebounce';

interface DataSourceObject {
    [key: string]: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        renderOption,
        value,
        ...restProps
    } = props

    const [inputValue, setInputValue] = useState(value as string)
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    const [loading, setLoading] = useState(false)
    const debounceValue = useDebounce(inputValue, 500)

    useEffect(() => {
        if(debounceValue){
            console.log('triggered')
            setLoading(true)
            const results = fetchSuggestions(debounceValue)
            if(results instanceof Promise){
                results.then(data => {
                    setLoading(false)
                    setSuggestions(data)
                })
            }else{
                setSuggestions(results)
            }
        }else{
            setSuggestions([])
        }
    }, [debounceValue])

    console.log(suggestions)
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
    }
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        if(onSelect){
            onSelect(item)
        }
    }
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }

    const generateDropdown = () => {
        return (
            <ul>
                {
                    suggestions.map((item, index) => {
                        return (
                            <li key={index} onClick={() => handleSelect(item)}>
                                {renderTemplate(item)}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
    return (
        <div className='viking-auto-complete'>
            <Input
                onChange={handleChange}
                value={inputValue}
                {...restProps}
            />
            {loading && <ul><Icon icon={'spinner'} spin/></ul>}
            {suggestions.length > 0 && generateDropdown() }
        </div>
    )
}