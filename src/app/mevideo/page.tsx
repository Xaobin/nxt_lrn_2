'use client';

import { useState, useRef } from 'react';

export default function VideoPlayer() {
  const [videoUrl, setVideoUrl] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.src = videoUrl;
      videoRef.current.play();
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setVideoUrl(fileUrl);
      if (videoRef.current) {
        videoRef.current.src = fileUrl;
        videoRef.current.play();
      }
    }
  };

  const handleClear = () => {
    setVideoUrl('');
    if (videoRef.current) {
      videoRef.current.src = '';
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Player de Vídeo Online</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Cole o link do vídeo aqui..."
              className="flex-1 px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handlePlayVideo}
                className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
              >
                Reproduzir
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors"
              >
                Abrir Arquivo
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
              >
                Limpar
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="video/*"
              className="hidden"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-400">Velocidade:</span>
            <div className="flex gap-2">
              {[0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3].map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`px-3 py-1 rounded ${
                    playbackSpeed === speed
                      ? 'bg-blue-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-black rounded-lg overflow-hidden aspect-video">
          <video
            ref={videoRef}
            controls
            className="w-full h-full"
            playsInline
          >
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </div>
      </div>
    </div>
  );
} 