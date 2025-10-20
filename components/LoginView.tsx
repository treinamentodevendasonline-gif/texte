
import React, { useState } from 'react';

interface LoginViewProps {
  onLogin: (success: boolean) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would be a secure API call.
    // This is highly insecure and for demonstration purposes only.
    if (email === 'vitopdm@gmail.com' && password === '94122065Pg@') {
      setError('');
      onLogin(true);
    } else {
      setError('Email ou senha incorretos.');
      onLogin(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-800 p-8 rounded-xl shadow-2xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-cyan-400">Acesso Restrito</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-300">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-colors duration-300"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginView;
