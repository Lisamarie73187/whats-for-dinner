import { useMemo } from 'react';

const useRandomPrompt = (strings: string[]) => {
    const randomString = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * strings.length);
        return strings[randomIndex];
    }, [strings]);

    return randomString;
};

export default useRandomPrompt;
