import { ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { Input, InputProps } from '../Input/Input'
import classNames from 'classnames';
import { Icon } from '../Icon/Icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import { Transition } from '../Transition/transition';

interface DataSourceObject {
    value: string;
    [key: string]: string | number;
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
    const [hightlightIndex, setHightlightIndex] = useState(-1)
    const debounceValue = useDebounce(inputValue, 500)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)

    useClickOutside(componentRef, () => {
        setSuggestions([])
    })
    useEffect(() => {
        if (debounceValue && triggerSearch.current) {
            console.log('triggered')
            setLoading(true)
            const results = fetchSuggestions(debounceValue)
            if (results instanceof Promise) {
                results.then(data => {
                    setLoading(false)
                    setSuggestions(data)
                })
            } else {
                setLoading(false)
                setSuggestions(results)
            }
        } else {
            setLoading(false)
            setSuggestions([])
        }
        setHightlightIndex(-1)
    }, [debounceValue])

    const hightlight = (index: number) => {
        if (index < 0) index = 0
        if (index >= suggestions?.length) {
            index = suggestions.length - 1
        }
        setHightlightIndex(index)
    }

    const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'Enter':
                if (suggestions[hightlightIndex]) {
                    handleSelect(suggestions[hightlightIndex])
                }
                break
            case 'ArrowUp':
                hightlight(hightlightIndex - 1)
                break
            case 'ArrowDown':
                hightlight(hightlightIndex + 1)
                break
            case 'Escape':
                setSuggestions([])
                break
            default:
                break
        }
        // switch (e.keyCode) {
        //     case 13:
        //         handleSelect(suggestions[hightlightIndex])
        //         break
        //     case 38:
        //         hightlight(hightlightIndex - 1)
        //         break
        //     case 40:
        //         hightlight(hightlightIndex + 1)
        //         break
        //     case 27:
        //         setSuggestions([])
        //         break
        //     default:
        //         break
        // }
    }

    // console.log(suggestions)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        if (onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false
    }
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }
    const generateDropdown = () => {
        return (
            <Transition
                in={!loading}
                timeout={500}
                animation='zoom-in-top'
                wrapper
            >
                <ul>
                    {suggestions.map((item, index) => {
                        const classes = classNames('suggestion-item', {
                            'item-hightlighted': index === hightlightIndex
                        })
                        return (
                            <li className={classes} key={index} onClick={() => handleSelect(item)}>
                                {renderTemplate(item)}
                            </li>
                        )
                    })}
                </ul>
            </Transition>
        )
    }

    return (
        <div className='viking-auto-complete' ref={componentRef}>
            <Input
                onChange={handleChange}
                onKeyDown={handleKeydown}
                value={inputValue}
                {...restProps}
            />
            {loading &&
                <Transition
                    in={loading}
                    timeout={500}
                    animation='zoom-in-top'
                    wrapper
                >
                    <ul style={{height:'50px',display:'flex',justifyContent:'center',alignItems:'center'}}><Icon icon={'spinner'} spin /></ul>
                </Transition>}
            {suggestions.length > 0 && generateDropdown()}
        </div>
    )
}