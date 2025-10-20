
import React from 'react';

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout, onLoginClick }) => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm p-4 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-cyan-400">
          Studio do Serralheiro
        </h1>
        {isAuthenticated ? (
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Sair
          </button>
        ) : (
          <button
            onClick={onLoginClick}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Área do Proprietário
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
