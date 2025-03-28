'use client';

import { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1); 
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currencies = [
    { code: 'USD', name: 'Dólar Americano' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'Libra Esterlina' },
    { code: 'BRL', name: 'Real Brasileiro' },
    { code: 'JPY', name: 'Iene Japonês' },
    { code: 'AUD', name: 'Dólar Australiano' },
    { code: 'CAD', name: 'Dólar Canadense' },
    { code: 'CHF', name: 'Franco Suíço' },
    { code: 'CNY', name: 'Yuan Chinês' },
    { code: 'INR', name: 'Rúpia Indiana' },
  ];

  useEffect(() => {
    fetchRates();
  }, [fromCurrency]);

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/cambio/api/rates?from=${fromCurrency}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao buscar taxas de câmbio');
      }
      
      setRates(data.rates);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const convertCurrency = () => {
    if (!rates) return 0;
    return (amount * rates[toCurrency]).toFixed(2);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Conversor de Moedas
      </h1>

      <div className="space-y-4">
        {/* Valor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Valor
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            min="0"
            step="0.01"
          />
        </div>

        {/* Moeda de Origem */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            De
          </label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        {/* Moeda de Destino */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Para
          </label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        {/* Resultado */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Taxa de câmbio atual:
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {loading ? (
              'Carregando...'
            ) : error ? (
              <span className="text-red-500">{error}</span>
            ) : rates ? (
              `1 ${fromCurrency} = ${rates[toCurrency].toFixed(4)} ${toCurrency}`
            ) : (
              'Selecione as moedas'
            )}
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Resultado da conversão:
          </p>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            {loading ? (
              'Carregando...'
            ) : error ? (
              <span className="text-red-500">{error}</span>
            ) : rates ? (
              `${amount} ${fromCurrency} = ${convertCurrency()} ${toCurrency}`
            ) : (
              'Selecione as moedas'
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter; 