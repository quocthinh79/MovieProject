import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debounceValue, setDebouneceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouneceValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value]);
    return debounceValue;
}

export default useDebounce;
