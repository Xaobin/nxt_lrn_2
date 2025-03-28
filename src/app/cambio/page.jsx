import CurrencyConverter from './components/CurrencyConverter';

export const metadata = {
  title: 'Conversor de Moedas',
  description: 'Converta valores entre diferentes moedas usando taxas de câmbio em tempo real',
};

export default function CambioPage() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <CurrencyConverter />
      </div>
    </main>
  );
} 