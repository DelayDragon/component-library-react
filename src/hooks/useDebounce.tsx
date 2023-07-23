import { useState, useEffect } from 'react'

function useDebounce(value: any, delay=500) {
    const [debounceValue, setDebounceValue] = useState()
    useEffect(() =>{
        const handler = window.setTimeout(()=> {
            setDebounceValue(value)
        },delay)
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])
    return debounceValue
}

export default useDebounce