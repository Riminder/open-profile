import React from 'react';
import headerStyles from './header.module.scss';

const Header = () => {
  return (

      <header className={headerStyles.header}>
        <nav className={headerStyles.navbar}>
          <div className={headerStyles.content}>
            <img className={headerStyles.logo} src="https://img.riminder.net/logo-hrflow.svg" alt="Logo" />
          </div>
        </nav>
      </header>
  )
}

export default Header;