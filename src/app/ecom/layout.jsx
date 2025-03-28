'use client';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';

export default function DashboardLayout({ children }) {
  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
} 