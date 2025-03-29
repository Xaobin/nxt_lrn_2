'use client';

import { useState } from 'react';
import styles from './styles.module.css';

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
    <div className={styles.container}>
      <h1 className={styles.title}>Gerador de Senhas</h1>
      
      <button 
        onClick={generatePassword}
        disabled={!options.includeUppercase && !options.includeLowercase && !options.includeNumbers && !options.includeSymbols}
        className={styles.generateButton}
      >
        Gerar Senha
      </button>

      <div className={styles.options}>
        <div className={styles.option}>
          <label>
            Tamanho da senha: {options.length}
            <input
              type="range"
              min="8"
              max="32"
              value={options.length}
              onChange={(e) => handleOptionChange('length', parseInt(e.target.value))}
            />
          </label>
        </div>

        <div className={styles.option}>
          <label>
            <input
              type="checkbox"
              checked={options.includeUppercase}
              onChange={(e) => handleOptionChange('includeUppercase', e.target.checked)}
            />
            Incluir maiúsculas (A-Z)
          </label>
        </div>

        <div className={styles.option}>
          <label>
            <input
              type="checkbox"
              checked={options.includeLowercase}
              onChange={(e) => handleOptionChange('includeLowercase', e.target.checked)}
            />
            Incluir minúsculas (a-z)
          </label>
        </div>

        <div className={styles.option}>
          <label>
            <input
              type="checkbox"
              checked={options.includeNumbers}
              onChange={(e) => handleOptionChange('includeNumbers', e.target.checked)}
            />
            Incluir números (0-9)
          </label>
        </div>

        <div className={styles.option}>
          <label>
            <input
              type="checkbox"
              checked={options.includeSymbols}
              onChange={(e) => handleOptionChange('includeSymbols', e.target.checked)}
            />
            Incluir símbolos (!@#$%^&*)
          </label>
        </div>
      </div>

      <div className={styles.parameters}>
        <div className={styles.parameter}>
          Tamanho: {options.length} caracteres
        </div>
        {options.includeUppercase && (
          <div className={styles.parameter}>Maiúsculas</div>
        )}
        {options.includeLowercase && (
          <div className={styles.parameter}>Minúsculas</div>
        )}
        {options.includeNumbers && (
          <div className={styles.parameter}>Números</div>
        )}
        {options.includeSymbols && (
          <div className={styles.parameter}>Símbolos</div>
        )}
      </div>

      <div className={styles.passwordDisplay}>
        <input 
          type="text" 
          value={password} 
          readOnly 
          placeholder="Sua senha aparecerá aqui"
        />
        <button onClick={() => navigator.clipboard.writeText(password)}>
          Copiar
        </button>
      </div>
    </div>
  );
} 