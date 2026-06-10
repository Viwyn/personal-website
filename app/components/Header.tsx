import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header = () => {

    return (
        <div className='w-full flex items-center justify-around p-4 text-5xl'>
            <ThemeToggle />
        </div>
    )
};

export default Header;