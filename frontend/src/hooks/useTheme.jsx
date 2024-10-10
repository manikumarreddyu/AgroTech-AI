import { useState, useEffect } from 'react';

const useTheme = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.body.classList.add(savedTheme);
        } else {
            document.body.classList.add('light');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(newTheme);
        localStorage.setItem('theme', newTheme); // for Save theme in localStorage
    };

    return { theme, toggleTheme };
};

export default useTheme;
