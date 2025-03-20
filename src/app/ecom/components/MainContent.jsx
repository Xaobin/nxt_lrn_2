'use client';

import { 
  CurrencyDollarIcon, 
  ShoppingBagIcon, 
  UserGroupIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MainContent = () => {
  const stats = [
    { name: 'Vendas Totais', value: 'R$ 45.231,89', icon: CurrencyDollarIcon, change: '+20.1%' },
    { name: 'Pedidos', value: '2.345', icon: ShoppingBagIcon, change: '+15.2%' },
    { name: 'Clientes', value: '1.234', icon: UserGroupIcon, change: '+12.3%' },
    { name: 'Taxa de Conversão', value: '3.2%', icon: ChartBarIcon, change: '+2.4%' },
  ];

  const data = [
    { name: 'Seg', vendas: 4000, pedidos: 2400 },
    { name: 'Ter', vendas: 3000, pedidos: 1398 },
    { name: 'Qua', vendas: 2000, pedidos: 9800 },
    { name: 'Qui', vendas: 2780, pedidos: 3908 },
    { name: 'Sex', vendas: 1890, pedidos: 4800 },
    { name: 'Sáb', vendas: 2390, pedidos: 3800 },
    { name: 'Dom', vendas: 3490, pedidos: 4300 },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 dark:text-green-400 text-sm font-medium">{stat.change}</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">vs mês anterior</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Vendas nos Últimos 7 Dias</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" className="dark:stroke-gray-600" />
              <XAxis 
                dataKey="name" 
                stroke="#6B7280" 
                className="dark:stroke-gray-400"
                tick={{ fill: '#6B7280' }}
              />
              <YAxis 
                stroke="#6B7280" 
                className="dark:stroke-gray-400"
                tick={{ fill: '#6B7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Line 
                type="monotone" 
                dataKey="vendas" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="pedidos" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MainContent; 