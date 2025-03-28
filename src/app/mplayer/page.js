'use client'
import React, { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        window.playSong = playSong;
        return () => {
            delete window.playSong;
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Player de Música
                    </h1>
                </div>

                <div className="bg-gray-800 rounded-xl shadow-2xl p-8 mb-8">
                    <div className="flex flex-col items-center space-y-6">
                        <img
                            className="w-16 h-16 md:w-20 md:h-20 rounded-lg shadow-lg object-cover transition-transform duration-300 hover:scale-105"
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20231213162352/music.png"
                            alt="audio player"
                            id="audioPlayerimg"
                        />
                        <audio 
                            id="audioPlayer" 
                            className="w-full rounded-lg bg-gray-700"
                            controls
                        >
                            Seu navegador não suporta o elemento de áudio.
                        </audio>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl shadow-2xl p-6 mb-8">
                    <div className="flex flex-col space-y-4">
                        <label htmlFor="Search" className="text-white text-lg font-medium">
                            Buscar Música:
                        </label>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                id="Search"
                                onInput={SearchSongs}
                                placeholder="Digite o nome da música"
                                className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button 
                                onClick={SearchSongs}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl shadow-2xl p-6">
                    <ul id="playlist" className="space-y-3"></ul>
                </div>
            </div>
        </div>
    );
};

export default Home;

function playSong(songSrc, songimg) {
    const audioPlayer = document.getElementById("audioPlayer");
    const audioPlayerimg = document.getElementById("audioPlayerimg");

    document.querySelectorAll("#playlist li").forEach((item) => {
        item.classList.remove("scale-110");
    });

    audioPlayerimg.src = songimg;
    audioPlayer.src = songSrc;
    audioPlayer.play();
}

function SearchSongs() {
    const SearchSong = document.getElementById("Search").value.toLowerCase();
    const saavnSearchUrl = "https://saavn.dev/search/songs";
    const params = { query: SearchSong };
    const headers = { "Content-Type": "application/json" };

    fetch(`${saavnSearchUrl}?${new URLSearchParams(params)}`, {
        method: "GET",
        headers: headers,
    })
        .then((response) => response.json())
        .then((songData) => {
            const playlist = document.getElementById("playlist");
            playlist.innerHTML = "";
            for (const song of songData.data.results) {
                const songName = song.name;
                const artistName = song.primaryArtists;
                const highestQualityDownloadUrl = song.downloadUrl.find(
                    (downloadUrl) => downloadUrl.quality === "320kbps"
                );
                const image150x150 = song.image.find(
                    (image) => image.quality === "500x500"
                );
                playlist.innerHTML += `
                    <li class="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-all duration-200 transform hover:scale-105"
                        onclick="playSong('${highestQualityDownloadUrl.link}', '${image150x150.link}')">
                        <img src="${image150x150.link}" class="w-12 h-12 rounded-lg object-cover">
                        <span class="text-white">${songName} - ${artistName}</span>
                    </li>`;
            }
        })
        .catch((error) => console.error("Error:", error));
}
