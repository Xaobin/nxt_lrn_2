'use client';

import { useState } from 'react';

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  const generatePassword = async () => {
    try {
      const response = await fetch('/api/generate-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });
      
      const data = await response.json();
      setPassword(data.password);
    } catch (error) {
      console.error('Erro ao gerar senha:', error);
    }
  };

  const handleOptionChange = (option: keyof PasswordOptions, value: boolean | number) => {
    setOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Gerador de Senhas
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input 
            type="text" 
            value={password} 
            readOnly 
            placeholder="Sua senha aparecerá aqui"
            className="flex-1 px-4 py-3 text-lg border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={() => navigator.clipboard.writeText(password)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Copiar
          </button>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="flex-1 text-gray-700">
              Tamanho da senha: {options.length}
              <input
                type="range"
                min="8"
                max="32"
                value={options.length}
                onChange={(e) => handleOptionChange('length', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </label>
          </div>

          <div className="space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.includeUppercase}
                onChange={(e) => handleOptionChange('includeUppercase', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Incluir maiúsculas (A-Z)</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.includeLowercase}
                onChange={(e) => handleOptionChange('includeLowercase', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Incluir minúsculas (a-z)</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.includeNumbers}
                onChange={(e) => handleOptionChange('includeNumbers', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Incluir números (0-9)</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.includeSymbols}
                onChange={(e) => handleOptionChange('includeSymbols', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Incluir símbolos (!@#$%^&*)</span>
            </label>
          </div>
        </div>

        <button 
          onClick={generatePassword}
          disabled={!options.includeUppercase && !options.includeLowercase && !options.includeNumbers && !options.includeSymbols}
          className="w-full py-4 px-6 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
        >
          Gerar Senha
        </button>
      </div>
    </div>
  );
} 