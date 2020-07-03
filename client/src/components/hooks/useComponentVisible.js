import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target) && isComponentVisible) {
            setIsComponentVisible(false);
        }
        else if(isComponentVisible)setIsComponentVisible(true)
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return { ref, isComponentVisible, setIsComponentVisible };
}