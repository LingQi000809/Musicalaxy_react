import { useReducer, useEffect } from 'react';

// returns [boolean, function() ]
// function toggles the boolean
export function useToggle() {
    return useReducer(visible => !visible, false);
}

// adds page title on component mount
export function usePageTitleOnMount(title) {
    useEffect(() => {
        document.title = title;
    }, [title]);
}