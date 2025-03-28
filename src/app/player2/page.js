'use client'
import React, { useState, useEffect } from 'react';

const DeezerPlayer = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchTracks = async () => {
        if (!searchQuery.trim()) return;
        
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error.message);
            }
            
            setTracks(data.data || []);
        } catch (err) {
            setError('Erro ao buscar músicas. Por favor, tente novamente.');
            console.error('Erro na busca:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const playTrack = (track) => {
        setCurrentTrack(track);
        const audio = document.getElementById('audio-player');
        if (audio) {
            audio.src = track.preview;
            audio.play();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Cabeçalho */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Deezer Player
                    </h1>
                    <p className="text-gray-400">
                        Encontre e reproduza suas músicas favoritas
                    </p>
                </div>

                {/* Player */}
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-2xl p-6 mb-8">
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src={currentTrack?.album?.cover_medium || '/music-placeholder.jpg'}
                            alt={currentTrack?.title || 'Capa do álbum'}
                            className="w-48 h-48 rounded-lg shadow-lg object-cover"
                        />
                        <div className="text-center">
                            <h2 className="text-white font-semibold text-lg">
                                {currentTrack?.title || 'Nenhuma música selecionada'}
                            </h2>
                            <p className="text-gray-400">
                                {currentTrack?.artist?.name || 'Selecione uma música para começar'}
                            </p>
                        </div>
                        <audio
                            id="audio-player"
                            controls
                            className="w-full max-w-md rounded-lg"
                        >
                            Seu navegador não suporta o elemento de áudio.
                        </audio>
                    </div>
                </div>

                {/* Barra de Busca */}
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-2xl p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && searchTracks()}
                            placeholder="Busque por artista ou música..."
                            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                            onClick={searchTracks}
                            disabled={isLoading}
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                        >
                            {isLoading ? 'Buscando...' : 'Buscar'}
                        </button>
                    </div>
                </div>

                {/* Lista de Músicas */}
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-2xl p-6">
                    {error && (
                        <div className="text-red-400 text-center mb-4">
                            {error}
                        </div>
                    )}
                    <div className="space-y-3">
                        {tracks.map((track) => (
                            <div
                                key={track.id}
                                onClick={() => playTrack(track)}
                                className="flex items-center space-x-4 p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                            >
                                <img
                                    src={track.album.cover_small}
                                    alt={track.title}
                                    className="w-12 h-12 rounded-md"
                                />
                                <div className="flex-1">
                                    <h3 className="text-white font-medium">
                                        {track.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {track.artist.name}
                                    </p>
                                </div>
                                <span className="text-gray-400 text-sm">
                                    {Math.floor(track.duration / 60)}:
                                    {String(track.duration % 60).padStart(2, '0')}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeezerPlayer; 