// MUSIC PLAYER OF Genres 
document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentSongDisplay = document.getElementById('current-song');
    const currentArtistDisplay = document.getElementById('current-artist');
    const progressElement = document.querySelector('.progress');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');

    // Sample songs array
    const songs = [
        { title: "Aap Ke Aa Jane Se", artist: "Mohammed Aziz & Sadhana Sargam", src: "90s/Aap Ke Aa Jane Se.mp3", cover: "images/apke.jpg" },
        { title: "Aankh Hai Bhari Bhari", artist: "Kumar Sanu", src: "90s/Aankh Hai Bhari Bhari (Male).mp3", cover: "images/aankh.jpg" },
        { title: "Aisi Deewangi", artist: "Alka Yagnik, Nadeem–Shravan, and Vinod Rathod", src: "90s/Aisi Deewangi.mp3", cover: "images/aisi.jpg" },
        { title: "Ek Do Teen Char", artist: "Alka Yagnik & Javed Akhtar", src: "90s/Ek Do Teen Char.mp3", cover: "images/ekdo.jpg" },
        { title: "Aye Mere Humsafar", artist: "Udit N  Alka Y", src: "90s/Aye Mere Humsafar.mp3", cover: "images/ayemere.jpg" },
        { title: "Baazigar O Baazigar", artist: "Kumar Sanu & Alka Yagnik", src: "90s/Baazigar O Baazigar.mp3", cover: "images/bhazigar.jpg" },
        { title: "Chand Chhupa Badal Mein", artist: "Udit N,Alka Y", src: "90s/Chand Chhupa Badal Mein.mp3", cover: "images/chand.jpg" },
        { title: "Chunnari Chunnari", artist: "Abhijeet Bhattacharya  Anuradha Sriram", src: "90s/Chunnari Chunnari.mp3", cover: "images/chunnari.jpg" },
        { title: "Dekha Ek Khwab", artist: "Kishore Kumar, Lata Mangeshkar, Shiv-Hari", src: "90s/Dekha Ek Khwab.mp3", cover: "images/dekhaek.jpg" },
        { title: "Dil Laga Liya", artist: "Alka Yagnik and Udit Narayan", src: "90s/Dil Laga Liya.mp3", cover: "images/dilaga.jpg" },
        { title: "Gore Rang Pe Na", artist: "Kishore Kumar and Lata Mangeshkar", src: "90s/Gore Rang Pe Na.mp3", cover: "images/gorarang.jpg" },
        { title: "Hum Tumko Nigahon Mein", artist: "Shreya Ghoshal, Udit Narayan, Shabbir Ahmed, Wajid Ali", src: "90s/Hum Tumko Nigahon Mein.mp3", cover: "images/humtumko.jpg" },
        { title: "Kabhi Bhula Kabhi Yaad Kiya", artist: "Alka Yagnik and Kumar Sanu", src: "90s/Kabhi Bhula Khabi.mp3", cover: "images/kadhibhoola.jpg" },
        { title: "Main Tujhse Aise Milun", artist: "Abhijeet Bhattacharya and Alka Yagnik", src: "90s/Main Tujhse Aise Milun.mp3", cover: "images/maintumse.jpg" },
        { title: "Odhani Odh Ke Nachu", artist: "Alka Yagnik and Udit Narayan", src: "90s/Odhani Odh Ke Nachu.mp3", cover: "images/odhani.jpg" }
    ];

    let currentSongIndex = 0;
    let isPlaying = false;

    function playSong(song) {
        audioPlayer.src = song.src;
        currentSongDisplay.textContent = song.title;
        currentArtistDisplay.textContent = song.artist;

        // Update the album cover
        const albumArt = document.getElementById('current-album-art');
        albumArt.src = song.cover; // Changed from song.albumCover to song.cover

        audioPlayer.play().then(() => {
            isPlaying = true;
            updatePlayButton();
        }).catch(error => {
            console.error("Error playing audio:", error);
        });
    }

    // Function to pause the current song
    function pauseSong() {
        audioPlayer.pause();
        isPlaying = false;
        updatePlayButton();
    }

    // Function to update play button text/icon based on playing state
    function updatePlayButton() {
        if (isPlaying) {
            playBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Change to pause icon
        } else {
            playBtn.innerHTML = '<i class="fas fa-play"></i>'; // Change to play icon
        }
    }

    // Function to handle play/pause button
    playBtn.addEventListener('click', function () {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong(songs[currentSongIndex]);
        }
    });

    // Function to handle next song
    nextBtn.addEventListener('click', function () {
        currentSongIndex = (currentSongIndex + 1) % songs.length; // Loop back to the start
        playSong(songs[currentSongIndex]);
    });

    // Function to handle previous song
    prevBtn.addEventListener('click', function () {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Loop to the end
        playSong(songs[currentSongIndex]);
    });

    // Update progress bar and time display
    audioPlayer.addEventListener('timeupdate', function () {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        progressElement.style.width = `${(currentTime / duration) * 100}%`;
        currentTimeDisplay.textContent = formatTime(currentTime);
        durationDisplay.textContent = formatTime(duration);
    });

    // Format time for display
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Load the first song initially but don't play
    currentSongDisplay.textContent = songs[0].title;
    currentArtistDisplay.textContent = songs[0].artist;
    audioPlayer.src = songs[0].src;
    updatePlayButton();
});


document.addEventListener("DOMContentLoaded", function () {
    const volumeSlider = document.getElementById("volumeSlider");
    const volumeProgress = document.getElementById("volumeProgress");
    const volumeIcon = document.getElementById("volumeIcon");
    const audio = document.getElementById("audioPlayer"); // Optional for real audio

    let volumeLevel = 50; // Default volume level (50%)

    // Function to update volume
    function updateVolume(level) {
        volumeLevel = level;
        volumeProgress.style.width = `${level}%`;

        // Change volume icon dynamically
        if (level === 0) {
            volumeIcon.className = "fas fa-volume-mute";
        } else if (level <= 40) {
            volumeIcon.className = "fas fa-volume-down";
        } else {
            volumeIcon.className = "fas fa-volume-up";
        }

        // Set actual audio volume (if applicable)
        if (audio) {
            audio.volume = level / 100;
        }
    }

    // Click to adjust volume
    volumeSlider.addEventListener("click", function (e) {
        const rect = volumeSlider.getBoundingClientRect();
        let newVolume = ((e.clientX - rect.left) / rect.width) * 100;
        newVolume = Math.max(0, Math.min(100, newVolume));
        updateVolume(newVolume);
    });

    // Dragging event
    let isDragging = false;

    volumeSlider.addEventListener("mousedown", function () {
        isDragging = true;
    });

    document.addEventListener("mousemove", function (e) {
        if (isDragging) {
            const rect = volumeSlider.getBoundingClientRect();
            let newVolume = ((e.clientX - rect.left) / rect.width) * 100;
            newVolume = Math.max(0, Math.min(100, newVolume));
            updateVolume(newVolume);
        }
    });

    document.addEventListener("mouseup", function () {
        isDragging = false;
    });

    // Click to mute/unmute
    volumeIcon.addEventListener("click", function () {
        if (volumeLevel > 0) {
            updateVolume(0); // Mute
        } else {
            updateVolume(50); // Restore default
        }
    });

    // Set initial volume
    updateVolume(volumeLevel);
});

document.addEventListener('DOMContentLoaded', function () {
    // Updated tracks data with more genres
    const tracks = [
        {
            rank: 1,
            title: "Tujhe Dekha To",
            artist: "Kumar Sanu, Lata Mangeshkar",
            album: "Dilwale Dulhania Le Jayenge",
            year: 1995,
            audioUrl: "https://example.com/tujhe-dekha-to.mp3",
            albumArt: "https://example.com/ddlj-album.jpg",
            genre: "romantic"
        },
        {
            rank: 2,
            title: "Chaiyya Chaiyya",
            artist: "Sukhwinder Singh, Sapna Awasthi",
            album: "Dil Se",
            year: 1998,
            audioUrl: "https://example.com/tujhe-dekha-to.mp3",
            albumArt: "https://example.com/ddlj-album.jpg",
            genre: "upbeat"
        },
        {
            rank: 3,
            title: "Pehla Nasha",
            artist: "Udit Narayan, Sadhana Sargam",
            album: "Jo Jeeta Wohi Sikandar",
            year: 1992,
            audioUrl: "https://example.com/tujhe-dekha-to.mp3",
            albumArt: "https://example.com/ddlj-album.jpg", 
            genre: "romantic"
        },
        {
            rank: 4,
            title: "Bholi Si Surat",
            artist: "Lata Mangeshkar, Udit Narayan",
            album: "Dil To Pagal Hai",
            year: 1997,
            audioUrl: "https://example.com/tujhe-dekha-to.mp3",
            albumArt: "https://example.com/ddlj-album.jpg", 
            genre: "romantic"
        },
        {
            rank: 5,
            title: "Ek Ladki Ko Dekha",
            artist: "Kumar Sanu",
            album: "1942: A Love Story",
            year: 1994,
            audioUrl: "https://example.com/tujhe-dekha-to.mp3",
            albumArt: "https://example.com/ddlj-album.jpg", 
            genre: "romantic"
        },
        {
            rank: 6,
            title: "Kuch Kuch Hota Hai",
            artist: "Udit Narayan, Alka Yagnik",
            album: "Kuch Kuch Hota Hai",
            year: 1998,
            audioUrl: "https://example.com/tujhe-dekha-to.mp3",
            albumArt: "https://example.com/ddlj-album.jpg", 
            genre: "upbeat"
        },
        {
            rank: 7,
            title: "Pardesi Pardesi",
            artist: "Kumar Sanu, Alka Yagnik",
            album: "Raja Hindustani",
            year: 1996,
            audioUrl: "https://example.com/tujhe-dekha-to.mp3",
            albumArt: "https://example.com/ddlj-album.jpg", 
            genre: "sad"
        },
        {
            rank: 8,
            title: "Taal Se Taal Mila",
            artist: "Alka Yagnik, Udit Narayan",
            album: "Taal",
            year: 1999,
            audioUrl: "https://example.com/tujhe-dekha-to.mp3",
            albumArt: "https://example.com/ddlj-album.jpg", 
            genre: "upbeat"
        },
        {
            rank: 9,
            title: "Tu Cheez Badi Hai Mast",
            artist: "Udit Narayan, Alka Yagnik",
            album: "Mohra",
            year: 1994,
            audioUrl: "https://example.com/tujhe-dekha-to.mp3",
            albumArt: "https://example.com/ddlj-album.jpg", 
            genre: "upbeat"
        },
        {
            rank: 10,
            title: "Humma Humma",
            artist: "A.R. Rahman",
            album: "Bombay",
            year: 1995,
            audioUrl: "https://example.com/tujhe-dekha-to.mp3",
            albumArt: "https://example.com/ddlj-album.jpg", 
            genre: "upbeat"
        },
        {
            rank: 11,
            title: "Kehna Hi Kya",
            artist: "A.R. Rahman",
            album: "Bombay",
            year: 1995,
            audioUrl: "https://example.com/tujhe-dekha-to.mp3",
            albumArt: "https://example.com/ddlj-album.jpg", 
            genre: "romantic"
        },
        {
            rank: 12,
            title: "Aaj Main Upar",
            artist: "Kavita Krishnamurthy, Udit Narayan",
            album: "Khamoshi: The Musical",
            year: 1996,
            audioUrl: "https://example.com/tujhe-dekha-to.mp3",
            albumArt: "https://example.com/ddlj-album.jpg", 
            genre: "upbeat"
        },
        {
            rank: 13,
            title: "Mere Mehboob Mere Sanam",
            artist: "Kumar Sanu, Alka Yagnik",
            album: "Duplicate",
            year: 1998,
            audioUrl: "https://example.com/tujhe-dekha-to.mp3",
            albumArt: "https://example.com/ddlj-album.jpg", 
            genre: "romantic"
        },
        {
            rank: 14,
            title: "Sandese Aate Hai",
            artist: "Sonu Nigam",
            album: "Border",
            year: 1997,
            audioUrl: "https://example.com/tujhe-dekha-to.mp3",
            albumArt: "https://example.com/ddlj-album.jpg", 
            genre: "sad"
        },
        {
            rank: 15,
            title: "Ghar Se Nikalte Hi",
            artist: "Udit Narayan",
            album: "Papa Kehte Hain",
            year: 1996,
            audioUrl: "https://example.com/tujhe-dekha-to.mp3",
            albumArt: "https://example.com/ddlj-album.jpg", 
            genre: "romantic"
        }
    ];

    // Music Player Class
    class MusicPlayer {
        constructor(tracks) {
            this.tracks = tracks;
            this.currentTrackIndex = 0;
            this.isPlaying = false;
            this.audio = new Audio();

            this.initializeElements();
            this.setupEventListeners();
        }

        initializeElements() {
            this.playerElement = document.getElementById('popup-music-player');
            this.playPauseBtn = document.getElementById('player-play-pause-btn');
            this.prevBtn = document.getElementById('player-prev-btn');
            this.nextBtn = document.getElementById('player-next-btn');
            this.closeBtn = document.getElementById('player-close-btn');
            this.progressFill = document.getElementById('player-progress-fill');
            this.trackTitle = document.getElementById('player-track-title');
            this.trackArtist = document.getElementById('player-track-artist');
            this.albumImg = document.getElementById('player-album-img');
        }

        setupEventListeners() {
            this.audio.addEventListener('timeupdate', () => this.updateProgress());
            this.audio.addEventListener('ended', () => this.nextTrack());

            this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
            this.prevBtn.addEventListener('click', () => this.prevTrack());
            this.nextBtn.addEventListener('click', () => this.nextTrack());
            this.closeBtn.addEventListener('click', () => this.closePlayer());
        }

        loadTrack(track) {
            this.audio.src = track.audioUrl;
            this.trackTitle.textContent = track.title;
            this.trackArtist.textContent = track.artist;
            this.albumImg.src = track.albumArt;
            this.albumImg.alt = track.album;

            this.playerElement.classList.add('active');
            this.playTrack();
        }

        togglePlayPause() {
            if (this.isPlaying) {
                this.pauseTrack();
            } else {
                this.playTrack();
            }
        }

        playTrack() {
            this.audio.play();
            this.isPlaying = true;
            this.playPauseBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
            `;
        }

        pauseTrack() {
            this.audio.pause();
            this.isPlaying = false;
            this.playPauseBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
            `;
        }

        nextTrack() {
            this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
            this.loadTrack(this.tracks[this.currentTrackIndex]);
        }

        prevTrack() {
            this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
            this.loadTrack(this.tracks[this.currentTrackIndex]);
        }

        updateProgress() {
            const progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
            this.progressFill.style.width = `${progressPercent}%`;
        }

        closePlayer() {
            this.audio.pause();
            this.playerElement.classList.remove('active');
        }
    }

    // Create popup music player HTML
    createMusicPlayerHTML();

    // Render tracks function
    renderTracks();

    function createMusicPlayerHTML() {
        const playerContainer = document.getElementById('popup-music-player-container');
        playerContainer.innerHTML = `
            <div class="popup-music-player" id="popup-music-player">
                <div class="player-progress">
                    <div class="player-progress-fill" id="player-progress-fill"></div>
                </div>
                <div class="player-album-art" id="player-album-art">
                    <img src="" alt="Album Art" id="player-album-img">
                </div>
                <div class="player-details">
                    <h3 id="player-track-title">No Track Playing</h3>
                    <p id="player-track-artist"></p>
                </div>
                <div class="player-controls">
                    <button class="player-control-btn" id="player-prev-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 19V5l-7 7h20"/>
                        </svg>
                    </button>
                    <button class="player-control-btn" id="player-play-pause-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                    </button>
                    <button class="player-control-btn" id="player-next-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M13 5v14l7-7h-20"/>
                        </svg>
                    </button>
                </div>
                <button class="player-close" id="player-close-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;
    }

    function renderTracks(genreFilter = 'all') {
        const tracksContent = document.getElementById('tracks-content');
        tracksContent.innerHTML = ''; // Clear previous tracks

        const musicPlayer = new MusicPlayer(tracks);

        // Filter tracks based on the selected genre
        const filteredTracks = genreFilter === 'all' ? tracks : tracks.filter(track => track.genre === genreFilter);

        filteredTracks.forEach((track, index) => {
            const trackElement = document.createElement('div');
            trackElement.classList.add('track-item');
            trackElement.setAttribute('data-rank', track.rank);
            trackElement.setAttribute('data-genre', track.genre);

            trackElement.innerHTML = `
                <div class="rank">${track.rank}</div>
                <div class="title">${track.title}</div>
                <div class="artist">${track.artist}</div>
                <div class="album">${track.album}</div>
                <div class="year">${track.year}</div>
                <div class="track-controls">
                    <button class="play-button" aria-label="Play ${track.title}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                    </button>
                </div>
            `;

            // Play button event listener
            const playButton = trackElement.querySelector('.play-button');
            playButton.addEventListener('click', function (e) {
                e.stopPropagation();
                musicPlayer.currentTrackIndex = index;
                musicPlayer.loadTrack(track);
                document.querySelectorAll('.track-item').forEach(item => {
                    item.classList.remove('active');
                });
                trackElement.classList.add('active');
            });

            tracksContent.appendChild(trackElement);
        });
    }

    // Genre filter button functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            this.classList.add('active');
            // Get the genre from the data attribute
            const genre = this.getAttribute('data-genre');
            // Render tracks based on the selected genre
            renderTracks(genre);
        });
    });
});


// Newletter Form
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.footer-newsletter form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!email) {
            showMessage('Please enter your email address', 'error');
            return;
        }
        
        // Send AJAX request
        const formData = new FormData();
        formData.append('email', email);
        
        fetch('newsletter_subscribe.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                showMessage(data.message, 'success');
                emailInput.value = '';
            } else {
                showMessage(data.message, 'error');
            }
        })
        .catch(error => {
            showMessage('An error occurred. Please try again later.', 'error');
            console.error('Error:', error);
        });
    });
    
    function showMessage(message, type) {
        // Check if a message element already exists
        let messageEl = document.querySelector('.newsletter-message');
        
        if (!messageEl) {
            // Create new message element
            messageEl = document.createElement('div');
            messageEl.className = 'newsletter-message';
            newsletterForm.insertAdjacentElement('afterend', messageEl);
        }
        
        // Update message content and class
        messageEl.textContent = message;
        messageEl.className = `newsletter-message ${type}`;
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
});