// Artist data
const initialArtists = [
    {
        id: 1,
        name: "Lata Mangeshkar",
        genre: "classical",
        decade: "70s Icon",
        albums: 12,
        followers: 7200000,
        image: "images/Lata Mangeshkr.jpg"
    },
    {
        id: 2,
        name: "Mohammad Rafi",
        genre: "classical",
        decade: "60s Icon",
        albums: 8,
        followers: 180000,
        image: "images/Mohammad Rafi.jpeg"
    },
    {
        id: 3,
        name: "Kishore Kumar",
        genre: "classical",
        decade: "60s Icon",
        albums: 15,
        followers: 3200000,
        image: "images/Kishor Kumar.jpg"
    },
    {
        id: 4,
        name: "Asha Bhosle",
        genre: "classical",
        decade: "70s Icon",
        albums: 6,
        followers: 980000,
        image: "images/Asha Bhosle.jpg"
    },
    {
        id: 5,
        name: "Mukesh",
        genre: "classical",
        decade: "60s Icon",
        albums: 10,
        followers: 4100000,
        image: "images/Mukesh.jpg"
    },
    {
        id: 6,
        name: "Kumar Sanu",
        genre: "classical",
        decade: "90s Icon",
        albums: 7,
        followers: 1400000,
        image: "images/Kumar Sanu.jpg"
    },
    {
        id: 7,
        name: "Alka Yagnik",
        genre: "Classical",
        decade: "90s Icon",
        albums: 20,
        followers: 850000,
        image: "images/Alka Yagnik.jpg"
    },
    {
        id: 8,
        name: "Udit Narayan",
        genre: "classical",
        decade: "80s Icon",
        albums: 9,
        followers: 2200000,
        image: "images/Udit Narayan.jpg"
    },
    {
        id: 9,
        name: "Sonu Nigam",
        genre: "classical",
        decade: "20s Icon",
        albums: 9,
        followers: 2200000,
        image: "images/Sonu Nigam.webp"
    },
    {
        id: 10,
        name: "Shreya Ghoshal",
        genre: "Classical",
        decade: "20s Icon",
        albums: 9,
        followers: 2200000,
        image: "images/Shreya Ghoshal.webp"
    },
    {
        id: 11,
        name: "Sadhana Sargam",
        genre: "classical",
        decade: "80s Icon",
        albums: 9,
        followers: 2200000,
        image: "images/Sadhana Sargam.jpg"
    },
    {
        id: 12,
        name: "Abhijeet Bhattacharya",
        genre: "classical",
        decade: "80s Icon",
        albums: 9,
        followers: 2200000,
        image: "images/Abhijeet Bhattacharya.webp"
    }
];

// Artist songs data
const artistSongs = {
    "Lata Mangeshkar": [
        { title: "Starlight Melody", duration: "3:45", url: "https://example.com/song1.mp3" },
        { title: "Electric Dreams", duration: "4:12", url: "https://example.com/song2.mp3" },
        { title: "Neon Horizons", duration: "3:30", url: "https://example.com/song3.mp3" }
    ],
    "Mohammad Rafi": [
        { title: "Synthwave Sunrise", duration: "4:00", url: "https://example.com/song4.mp3" },
        { title: "Digital Love", duration: "3:55", url: "https://example.com/song5.mp3" },
        { title: "Cyber Dance", duration: "3:25", url: "https://example.com/song6.mp3" }
    ],
    "Abhijeet Bhattacharya": [
        { title: "Road to Nowhere", duration: "4:15", url: "https://example.com/song7.mp3" },
        { title: "Endless Summer", duration: "3:50", url: "https://example.com/song8.mp3" }
    ],
    "Sadhana Sargam": [
        { title: "Starlight Melody", duration: "3:45", url: "https://example.com/song1.mp3" },
        { title: "Electric Dreams", duration: "4:12", url: "https://example.com/song2.mp3" },
        { title: "Neon Horizons", duration: "3:30", url: "https://example.com/song3.mp3" }
    ],
    "Shreya Ghoshal": [
        { title: "Starlight Melody", duration: "3:45", url: "https://example.com/song1.mp3" },
        { title: "Electric Dreams", duration: "4:12", url: "https://example.com/song2.mp3" },
        { title: "Neon Horizons", duration: "3:30", url: "https://example.com/song3.mp3" }
    ],
    "Sonu Nigam": [
        { title: "Starlight Melody", duration: "3:45", url: "https://example.com/song1.mp3" },
        { title: "Electric Dreams", duration: "4:12", url: "https://example.com/song2.mp3" },
        { title: "Neon Horizons", duration: "3:30", url: "https://example.com/song3.mp3" }
    ],
    "Udit Narayan": [
        { title: "Starlight Melody", duration: "3:45", url: "https://example.com/song1.mp3" },
        { title: "Electric Dreams", duration: "4:12", url: "https://example.com/song2.mp3" },
        { title: "Neon Horizons", duration: "3:30", url: "https://example.com/song3.mp3" }
    ],
    "Alka Yagnik": [
        { title: "Starlight Melody", duration: "3:45", url: "https://example.com/song1.mp3" },
        { title: "Electric Dreams", duration: "4:12", url: "https://example.com/song2.mp3" },
        { title: "Neon Horizons", duration: "3:30", url: "https://example.com/song3.mp3" }
    ],
    "Kumar Sanu": [
        { title: "Starlight Melody", duration: "3:45", url: "https://example.com/song1.mp3" },
        { title: "Electric Dreams", duration: "4:12", url: "https://example.com/song2.mp3" },
        { title: "Neon Horizons", duration: "3:30", url: "https://example.com/song3.mp3" }
    ],
    "Mukesh": [
        { title: "Starlight Melody", duration: "3:45", url: "https://example.com/song1.mp3" },
        { title: "Electric Dreams", duration: "4:12", url: "https://example.com/song2.mp3" },
        { title: "Neon Horizons", duration: "3:30", url: "https://example.com/song3.mp3" }
    ],
    "Asha Bhosle": [
        { title: "Starlight Melody", duration: "3:45", url: "https://example.com/song1.mp3" },
        { title: "Electric Dreams", duration: "4:12", url: "https://example.com/song2.mp3" },
        { title: "Neon Horizons", duration: "3:30", url: "https://example.com/song3.mp3" }
    ],
    "Kishore Kumar": [
        { title: "Starlight Melody", duration: "3:45", url: "https://example.com/song1.mp3" },
        { title: "Electric Dreams", duration: "4:12", url: "https://example.com/song2.mp3" },
        { title: "Neon Horizons", duration: "3:30", url: "https://example.com/song3.mp3" }
    ]
};

class MusicApp {
    constructor(artists) {
        this.artists = artists;
        this.filteredArtists = [...artists];
        this.currentPage = 1;
        this.artistsPerPage = 6;
        this.activeFilter = 'all';
        this.sortOption = 'followers';

        this.audio = new Audio();
        this.currentPlaylist = [];
        this.currentSongIndex = 0;

        this.initEventListeners();
        this.renderArtists();
        this.renderPagination();
        this.initMusicPlayer();
        this.initVolumeControl();
    }

    initEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => this.filterArtists(button.dataset.genre));
        });

        // Sort dropdown
        const sortDropdown = document.querySelector('.sort-dropdown');
        sortDropdown.addEventListener('change', () => this.sortArtists(sortDropdown.value));
    }

    filterArtists(genre) {
        // Update active filter button
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.genre === genre) btn.classList.add('active');
        });

        // Filter artists
        this.activeFilter = genre;
        this.filteredArtists = genre === 'all'
            ? [...this.artists]
            : this.artists.filter(artist => artist.decade === genre);

        this.currentPage = 1;
        this.renderArtists();
        this.renderPagination();
    }

    sortArtists(option) {
        this.sortOption = option;
        this.filteredArtists.sort((a, b) => {
            return option === 'followers'
                ? b.followers - a.followers
                : b.albums - a.albums;
        });

        this.renderArtists();
    }

    renderArtists() {
        const grid = document.getElementById('artists-grid');
        grid.innerHTML = '';

        // Pagination calculation
        const indexOfLastArtist = this.currentPage * this.artistsPerPage;
        const indexOfFirstArtist = indexOfLastArtist - this.artistsPerPage;
        const currentArtists = this.filteredArtists.slice(indexOfFirstArtist, indexOfLastArtist);

        currentArtists.forEach(artist => {
            const card = document.createElement('div');
            card.classList.add('artist-card');
            card.innerHTML = `
                <img src="${artist.image}" alt="${artist.name}" class="artist-image">
                <div class="artist-info">
                    <div class="artist-name">${artist.name}</div>
                    <div class="artist-genre">${artist.genre}</div>
                    <div class="artist-stats">
                        <span>${artist.albums} Albums</span>
                        <span>${(artist.followers / 1000000).toFixed(1)}M Followers</span>
                    </div>
                </div>
            `;

            // Add click event to show song list
            card.addEventListener('click', () => this.showSongList(artist.name));

            grid.appendChild(card);
        });
    }

    renderPagination() {
        const paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = '';

        const totalPages = Math.ceil(this.filteredArtists.length / this.artistsPerPage);

        // Previous button
        const prevButton = document.createElement('button');
        prevButton.textContent = '«';
        prevButton.classList.add('page-btn');
        prevButton.disabled = this.currentPage === 1;
        prevButton.addEventListener('click', () => this.changePage(this.currentPage - 1));
        paginationContainer.appendChild(prevButton);

        // Page buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.add('page-btn');
            if (i === this.currentPage) pageButton.classList.add('active');
            pageButton.addEventListener('click', () => this.changePage(i));
            paginationContainer.appendChild(pageButton);
        }

        // Next button
        const nextButton = document.createElement('button');
        nextButton.textContent = '»';
        nextButton.classList.add('page-btn');
        nextButton.disabled = this.currentPage === totalPages;
        nextButton.addEventListener('click', () => this.changePage(this.currentPage + 1));
        paginationContainer.appendChild(nextButton);
    }

    changePage(pageNumber) {
        this.currentPage = pageNumber;
        this.renderArtists();
        this.renderPagination();
    }

    showSongList(artistName) {
        const popup = document.getElementById('song-popup');
        const artistNameEl = document.getElementById('artist-name-popup');
        const songList = document.getElementById('song-list');

        // Clear previous songs
        songList.innerHTML = '';
        artistNameEl.textContent = artistName;

        // Get songs for this artist
        const songs = artistSongs[artistName] || [];

        // Populate song list
        songs.forEach((song, index) => {
            const songItem = document.createElement('li');
            songItem.classList.add('song-item');
            songItem.innerHTML = `
                <span>${song.title}</span>
                <span>${song.duration}</span>
            `;

            // Add click event to play song
            songItem.addEventListener('click', () => {
                this.playSongList(artistName, index);
                popup.style.display = 'none';
            });

            songList.appendChild(songItem);
        });

        // Show popup
        popup.style.display = 'flex';
    }

    initMusicPlayer() {
        const playPauseBtn = document.getElementById('play-pause-btn');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const progressContainer = document.getElementById('progress-container');
        const progressBar = document.getElementById('progress');
        const closePlayerBtn = document.getElementById('close-player');
        const musicPlayer = document.getElementById('music-player');
        const currentSongTitle = document.getElementById('current-song-title');
        const songPopup = document.getElementById('song-popup');

        // Close popup when clicking outside
        songPopup.addEventListener('click', (e) => {
            if (e.target === songPopup) {
                songPopup.style.display = 'none';
            }
        });

        // Play/Pause
        playPauseBtn.addEventListener('click', () => {
            if (this.audio.paused) {
                this.audio.play();
                playPauseBtn.textContent = '⏸️';
            } else {
                this.audio.pause();
                playPauseBtn.textContent = '▶️';
            }
        });

        // Previous Song
        prevBtn.addEventListener('click', () => this.changeSong(-1));

        // Next Song
        nextBtn.addEventListener('click', () => this.changeSong(1));

        // Progress Bar
        this.audio.addEventListener('timeupdate', () => {
            const progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
        });

        // Seek
        progressContainer.addEventListener('click', (e) => {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            const duration = this.audio.duration;

            this.audio.currentTime = (clickX / width) * duration;
        });

        // Auto play next song
        this.audio.addEventListener('ended', () => this.changeSong(1));

        // Close Player
        closePlayerBtn.addEventListener('click', () => {
            musicPlayer.style.display = 'none';
            this.audio.pause();
            this.audio.currentTime = 0;
        });
    }

    playSongList(artistName, startIndex) {
        const songs = artistSongs[artistName] || [];

        if (songs.length === 0) return;

        this.currentPlaylist = songs;
        this.currentSongIndex = startIndex;

        this.playSong();

        // Show music player
        document.getElementById('music-player').style.display = 'flex';
    }

    playSong() {
        const currentSong = this.currentPlaylist[this.currentSongIndex];

        // Update audio source
        this.audio.src = currentSong.url;

        // Update song title
        document.getElementById('current-song-title').textContent = currentSong.title;

        // Play the song
        this.audio.play();

        // Update play/pause button
        document.getElementById('play-pause-btn').textContent = '⏸️';
    }

    changeSong(direction) {
        // Calculate next song index
        this.currentSongIndex = (this.currentSongIndex + direction + this.currentPlaylist.length) % this.currentPlaylist.length;

        this.playSong();
    }

    initVolumeControl() {
        const volumeSlider = document.getElementById('volume-slider');
        const volumeIcon = document.getElementById('volume-icon');
        let lastVolume = 100;
    
        // Update volume when slider changes
        volumeSlider.addEventListener('input', () => {
            const volume = volumeSlider.value / 100;
            this.audio.volume = volume;
    
            // Update volume icon based on volume level
            this.updateVolumeIcon(volume);
        });
    
        // Mute/Unmute functionality
        volumeIcon.addEventListener('click', () => {
            if (this.audio.volume > 0) {
                // Store current volume before muting
                lastVolume = volumeSlider.value;
                this.audio.volume = 0;
                volumeSlider.value = 0;
                volumeIcon.textContent = '🔇';
            } else {
                // Restore previous volume
                this.audio.volume = lastVolume / 100;
                volumeSlider.value = lastVolume;
                this.updateVolumeIcon(lastVolume / 100);
            }
        });
    }
    
    updateVolumeIcon(volume) {
        const volumeIcon = document.getElementById('volume-icon');
        if (volume === 0) {
            volumeIcon.textContent = '🔇';
        } else if (volume < 0.3) {
            volumeIcon.textContent = '🔈';
        } else if (volume < 0.7) {
            volumeIcon.textContent = '🔉';
        } else {
            volumeIcon.textContent = '🔊';
        }
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new MusicApp(initialArtists);
});