'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  ShoppingCartIcon, 
  UsersIcon, 
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, href: '/ecom' },
    { name: 'Produtos', icon: ShoppingCartIcon, href: '/ecom/produtos' },
    { name: 'Clientes', icon: UsersIcon, href: '/ecom/clientes' },
    { name: 'Relatórios', icon: ChartBarIcon, href: '/ecom/relatorios' },
    { name: 'Configurações', icon: Cog6ToothIcon, href: '/ecom/configuracoes' },
  ];

  return (
    <div className={`bg-gray-800 dark:bg-gray-900 text-white h-screen ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
      <div className="p-4">
        <h1 className={`text-xl font-bold ${!isOpen && 'hidden'}`}>E-Commerce</h1>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white transition-colors ${
              pathname === item.href ? 'bg-gray-700 dark:bg-gray-800 text-white' : ''
            }`}
          >
            <item.icon className="h-6 w-6" />
            {isOpen && <span className="ml-3">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar; 