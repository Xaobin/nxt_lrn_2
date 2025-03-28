'use client';

import { BellIcon, UserCircleIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md h-16 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          aria-label={darkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
        >
          {darkMode ? (
            <SunIcon className="h-6 w-6 text-yellow-500" />
          ) : (
            <MoonIcon className="h-6 w-6 text-gray-600" />
          )}
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
          <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-200" />
        </button>
        <button className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors">
          <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-200" />
          <span className="text-gray-700 dark:text-gray-200">Admin</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar; 