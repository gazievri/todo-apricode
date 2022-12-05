import React from 'react';
import './Header.sass';


const Header:React.FC  = () => {
    return (
        <header className="header">
            <div className='header__logo' />
            <h1 className='header__title'> TODO-LIST FOR APRICODE</h1>
        </header>
    );
}

export default Header;