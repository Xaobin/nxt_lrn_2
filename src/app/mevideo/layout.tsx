import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MeVideo - Player de Vídeo Online',
  description: 'Player de vídeo online com suporte a múltiplos formatos e controles de velocidade',
};

export default function VideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900">
      {children}
    </div>
  );
} 