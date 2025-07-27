import React from 'react';
import { Button } from './Button';
import './header.css';

interface User {
  name: string;
  avatar?: string;
}

interface HeaderProps {
  user?: User | null;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
  logo?: React.ReactNode;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  user = null, 
  onLogin, 
  onLogout, 
  onCreateAccount,
  logo,
  title = 'Snake Eater UI'
}) => (
  <header className="snake-header">
    <div className="snake-header__container">
      <div className="snake-header__brand">
        {logo || (
          <div className="snake-header__logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" fill="#bdbdbd"/>
              <rect x="4" y="4" width="24" height="24" fill="#0b0b0d"/>
              <rect x="8" y="8" width="16" height="16" fill="#bdbdbd"/>
            </svg>
          </div>
        )}
        <h1 className="snake-header__title">{title}</h1>
      </div>
      
      <nav className="snake-header__nav">
        {user ? (
          <div className="snake-header__user">
            <span className="snake-header__welcome">
              Welcome, <strong>{user.name}</strong>
            </span>
            {user.avatar && (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="snake-header__avatar"
              />
            )}
            <Button size="small" variant="ghost" onClick={onLogout}>
              Log out
            </Button>
          </div>
        ) : (
          <div className="snake-header__actions">
            <Button size="small" variant="ghost" onClick={onLogin}>
              Log in
            </Button>
            <Button size="small" variant="primary" onClick={onCreateAccount}>
              Sign up
            </Button>
          </div>
        )}
      </nav>
    </div>
  </header>
);