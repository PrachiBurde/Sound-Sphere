// FIRST MUSIC SECTION OR MUSIC BUTTON
document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const searchResults = document.getElementById('searchResults');
    const playButton = document.getElementById('playButton');
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentSongDisplay = document.getElementById('current-song');
    const currentArtistDisplay = document.getElementById('current-artist');
    const progressElement = document.querySelector('.progress');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');
    const albumArt = document.getElementById('current-album-art');

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

    // ONLY ONE playSong function definition
    function playSong(song) {
        audioPlayer.src = song.src;
        currentSongDisplay.textContent = song.title;
        currentArtistDisplay.textContent = song.artist;
        
        // Update the album cover - make sure this executes
        if (albumArt) {
            console.log("Setting album cover to:", song.cover);
            albumArt.src = song.cover;
        } else {
            console.error("Album art element not found");
        }
        
        audioPlayer.play().then(() => {
            isPlaying = true;
            updatePlayButton();
        }).catch(error => {
            console.error("Error playing audio:", error);
        });
    }

    // Function to handle search input
    function handleSearchInput() {
        const query = searchInput.value.trim().toLowerCase();
        if (query.length === 0) {
            searchResults.innerHTML = '';
            return;
        }

        // Mock search results
        const results = songs.filter(song =>
            song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query)
        );

        displaySearchResults(results);
    }

    // Function to display search results
    function displaySearchResults(results) {
        searchResults.innerHTML = '';
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
            return;
        }

        results.forEach(song => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `<div>${song.title} - ${song.artist}</div>`;
            resultItem.addEventListener('click', () => {
                // Find the index of the selected song
                currentSongIndex = songs.findIndex(s => s.title === song.title);
                playSong(song);
            });
            searchResults.appendChild(resultItem);
        });
    }

    // Function to pause the current song
    function pauseSong() {
        audioPlayer.pause();
        isPlaying = false;
        updatePlayButton();
    }

    // Function to resume playing the current song
    function resumeSong() {
        audioPlayer.play();
        isPlaying = true;
        updatePlayButton();
    }

    // Function to update play button text/icon based on playing state
    function updatePlayButton() {
        // Update both the main play button and the player control button
        if (isPlaying) {
            playButton.textContent = 'Pause';
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            playButton.textContent = 'Start Listening';
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    // Event listeners
    playButton.addEventListener('click', function () {
        if (isPlaying) {
            pauseSong();
        } else {
            if (audioPlayer.src) {
                resumeSong();
            } else {
                playSong(songs[currentSongIndex]);
            }
        }
    });

    playBtn.addEventListener('click', function () {
        if (isPlaying) {
            pauseSong();
        } else {
            if (audioPlayer.src) {
                resumeSong();
            } else {
                playSong(songs[currentSongIndex]);
            }
        }
    });

    nextBtn.addEventListener('click', function () {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(songs[currentSongIndex]);
    });

    prevBtn.addEventListener('click', function () {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
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

    searchInput.addEventListener('input', handleSearchInput);
    searchBtn.addEventListener('click', handleSearchInput);

    // Load the first song initially but don't play it
    currentSongDisplay.textContent = songs[0].title;
    currentArtistDisplay.textContent = songs[0].artist;
    audioPlayer.src = songs[0].src;
    
    // Set initial album cover
    if (albumArt) {
        albumArt.src = songs[0].cover;
    }
    
    updatePlayButton();

    // Handle song ended event
    audioPlayer.addEventListener('ended', function () {
        // Play the next song when current song ends
        nextBtn.click();
    });
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