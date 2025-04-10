//SEARCH BAR of ALL PAGE
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const searchContainer = document.querySelector('.search-container');

    let searchResults = document.getElementById('searchResults');
    if (!searchResults) {
        searchResults = document.createElement('div');
        searchResults.className = 'search-results';
        searchResults.id = 'searchResults';
        searchContainer.parentNode.insertBefore(searchResults, searchContainer.nextSibling);
    }

    let searchTimeout = null;

    function handleSearchInput() {
        const query = searchInput.value.trim();

        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (query.length === 0) {
            searchResults.style.display = 'none';
            return;
        }

        searchResults.style.display = 'block';
        searchResults.innerHTML = '<div class="no-results">Searching...</div>';

        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    }

    function performSearch(query) {

        setTimeout(() => {
            const results = fetchMockResults(query);
            displayResults(results, query);
        }, 500);
    }

    function fetchMockResults(query) {
        const allItems = [
            { id: 1, title: 'Mera Joota Hai Japani', artist: 'Mukesh (Shree 420)', type: 'song', image: 'https://via.placeholder.com/40' },
            { id: 2, title: 'Pyar Kiya To Darna Kya', artist: 'Lata Mangeshkar (Mughal-e-Azam)', type: 'album', image: 'https://via.placeholder.com/40' },
            { id: 3, title: 'Aye Meri Zohra Jabeen', artist: 'Manna Dey (Waqt)', type: 'artist', image: 'https://via.placeholder.com/40' },
            { id: 4, title: 'Aaj Kal Tere Mere Pyaar Ke Charche', artist: 'Mohammed Rafi (Brahmachari)', type: 'song', image: 'https://via.placeholder.com/40' },
            { id: 5, title: 'Mere Mehboob Qayamat Hogi', artist: 'Mohammed Rafi (Mr. X in Bombay)', type: 'artist', image: 'https://via.placeholder.com/40' },
            { id: 6, title: 'Dum Maro Dum', artist: 'Asha Bhosle (Hare Rama Hare Krishna)', type: 'playlist', image: 'https://via.placeholder.com/40' },
            { id: 7, title: "Yamma Yamma", artist: "Kishore Kumar (Shaan)", type: 'playlist', image: 'https://via.placeholder.com/40' },
            { id: 8, title: "Khaike Paan Banaras Wala", artist: "Kishore Kumar (Don)", type: 'playlist', image: 'https://via.placeholder.com/40' },
            { id: 9, title: "Mehbooba Mehbooba", artist: "RD Burman (Sholay)", type: 'playlist', image: 'https://via.placeholder.com/40' },
            { id: 10, title: "Aap Jaisa Koi", artist: "Nazia Hassan (Qurbani)", type: 'playlist', image: 'https://via.placeholder.com/40' },
            { id: 11, title: "I Am A Disco Dancer", artist: "Vijay Benedict (Disco Dancer)", type: 'playlist', image: 'https://via.placeholder.com/40' },
            { id: 12, title: "Jimmy Jimmy Jimmy Aaja", artist: "Parvati Khan (Disco Dancer)", type: 'playlist', image: 'https://via.placeholder.com/40' },
            { id: 13, title: "Ek Do Teen", artist: "Alka Yagnik (Tezaab)", type: 'playlist', image: 'https://via.placeholder.com/40' },
            { id: 14, title: "Jumma Chumma De De", artist: "Sudesh Bhosle (Hum)", type: 'playlist', image: 'https://via.placeholder.com/40' },
            { id: 15, title: "Tamma Tamma Loge", artist: "Bappi Lahiri (Thanedaar)", type: 'playlist', image: 'https://via.placeholder.com/40' },
            { id: 16, title: "Tujhe Dekha To", artist: "Kumar Sanu & Lata Mangeshkar (DDLJ)", type: 'playlist', image: 'https://via.placeholder.com/40' },
            { id: 17, title: "Pehla Nasha", artist: "Udit Narayan & Sadhana Sargam (Jo Jeeta Wohi Sikandar)", type: 'playlist', image: 'https://via.placeholder.com/40' },
            { id: 18, title: "Ae Mere Humsafar", artist: "Udit Narayan & Alka Yagnik (Baazigar)", type: 'playlist', image: 'https://via.placeholder.com/40' },
            { id: 19, title: "Tu Cheez Badi Hai Mast Mast", artist: "Udit Narayan & Kavita Krishnamurthy (Mohra)", type: 'playlist', image: 'https://via.placeholder.com/40' },
            { id: 20, title: "Mehndi Laga Ke Rakhna", artist: "Lata Mangeshkar & Udit Narayan (DDLJ)", type: 'playlist', image: 'https://via.placeholder.com/40' },
            { id: 21, title: "Kal Ho Naa Ho", artist: "Sonu Nigam (Kal Ho Naa Ho)", type: 'playlist', image: 'https://via.placeholder.com/40' },
            { id: 22, title: "It's The Time To Disco", artist: "KK, Shaan & Vasundhara Das (Kal Ho Naa Ho)", type: 'playlist', image: 'https://via.placeholder.com/40' },
            { id: 23, title: "Dhoom Machale", artist: "Sunidhi Chauhan (Dhoom)", type: 'playlist', image: 'https://via.placeholder.com/40' },
            { id: 24, title: "Kajra Re", artist: "Alisha Chinai, Shankar Mahadevan & Javed Ali (Bunty Aur Babli)", type: 'playlist', image: 'https://via.placeholder.com/40' },
            { id: 25, title: "Mauja Hi Mauja", artist: "Mika Singh (Jab We Met)", type: 'playlist', image: 'https://via.placeholder.com/40' }
        ];

        return allItems.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(query.toLowerCase());
            const artistMatch = item.artist.toLowerCase().includes(query.toLowerCase());
            return titleMatch || artistMatch;
        });
    }

    function displayResults(results, query) {
        searchResults.innerHTML = '';

        if (results.length === 0) {
            searchResults.innerHTML = `<div class="no-results">No results found for "${query}"</div>`;
            return;
        }

        const groupedResults = {
            artist: [],
            album: [],
            song: [],
            playlist: []
        };

        results.forEach(item => {
            if (groupedResults[item.type]) {
                groupedResults[item.type].push(item);
            }
        });

        const types = ['artist', 'album', 'song', 'playlist'];
        types.forEach(type => {
            const typeItems = groupedResults[type];
            if (typeItems.length > 0) {
                const sectionTitle = document.createElement('div');
                sectionTitle.className = 'result-section-title';
                sectionTitle.innerHTML = `<div style="padding: 8px 12px; color: #b3b3b3; font-size: 14px; font-weight: 600;">${type.charAt(0).toUpperCase() + type.slice(1)}s</div>`;
                searchResults.appendChild(sectionTitle);

                typeItems.slice(0, 3).forEach(item => { // Limit to 3 items per section like Spotify
                    const resultItem = createResultItem(item);
                    searchResults.appendChild(resultItem);
                });
            }
        });

        searchResults.style.display = 'block';
    }

    function createResultItem(item) {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';

        resultItem.innerHTML = `
                <img src="${item.image}" alt="" class="result-image">
                <div class="result-info">
                    <div class="result-title">${item.title}</div>
                    ${item.artist ? `<div class="result-artist">${item.artist}</div>` : ''}
                </div>
                <div class="result-type">${item.type}</div>
            `;

        resultItem.addEventListener('click', () => {
            console.log(`Clicked on ${item.type}: ${item.title}`);
            if (item.type === 'song') {
                alert(`Now playing: ${item.title} by ${item.artist}`);
            } else {
                alert(`Opening ${item.type}: ${item.title}`);
            }

            searchResults.style.display = 'none';
            searchInput.value = item.title;
        });

        return resultItem;
    }

    function handleSearchButtonClick() {
        if (searchInput.value.trim().length > 0) {
            performSearch(searchInput.value.trim());
        }
    }

    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('focus', function () {
        if (searchInput.value.trim().length > 0) {
            searchResults.style.display = 'block';
        }
    });

    searchBtn.addEventListener('click', handleSearchButtonClick);

    document.addEventListener('click', function (event) {
        if (!searchContainer.contains(event.target) &&
            !searchResults.contains(event.target)) {
            searchResults.style.display = 'none';
        }
    });

    const ctaButton = document.querySelector(".cta-btn");

    const musicCards = document.querySelectorAll('.music-card');
    musicCards.forEach(card => {
        card.addEventListener('click', function () {
            const musicTitle = this.querySelector('.music-title').textContent;
            const musicArtist = this.querySelector('.music-artist').textContent;
            const albumCover = this.querySelector('.music-thumbnail').src;

            document.querySelector('.track-name').textContent = musicTitle;
            document.querySelector('.artist-name').textContent = musicArtist;
            document.querySelector('.now-playing img').src = albumCover;

            document.querySelector('.progress').style.width = '0%';

            document.querySelector('#play-btn').textContent = '⏸️';

            simulatePlayback();
        });
    });
});


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

    // Add close button functionality to existing code
    const musicPlayer = document.querySelector('.music-player');
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;'; // × symbol
    closeButton.classList.add('close-btn');
    closeButton.setAttribute('title', 'Close Music Player');
    
    // Style the close button
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = '#333';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.zIndex = '10';

    // Add the close button to the music player
    musicPlayer.appendChild(closeButton);

    // Close button functionality
    closeButton.addEventListener('click', function() {
        // Pause the current song
        const audioPlayer = document.getElementById('audioPlayer');
        if (audioPlayer) {
            audioPlayer.pause();
        }

        // Hide the music player
        musicPlayer.style.display = 'none';
    });

    // Set initial volume
    updateVolume(volumeLevel);
});


// FEARTUED MUSIC OF HOME
document.addEventListener('DOMContentLoaded', function () {
    const musicDetails = document.getElementById('musicDetails');
    const albumCover = document.getElementById('albumCover');
    const collectionName = document.getElementById('collectionName');
    const collectionSummary = document.getElementById('collectionSummary');
    const trackListing = document.getElementById('trackListing');
    const exitIcon = document.querySelector('.exit-icon');

    const musicCollections = {
        "60s": {
            title: "60's Bollywood Classics",
            description: "Melodious gems from Rafi, Lata & Kishore Kumar",
            image: "images/60's Bollywood Classics.jpg",
            tracks: [
                { title: "Mera Joota Hai Japani", artist: "Mukesh (Shree 420)", duration: "4:12", path: "" },
                { title: "Pyar Kiya To Darna Kya", artist: "Lata Mangeshkar (Mughal-e-Azam)", duration: "3:43", path: "" },
                { title: "Aye Meri Zohra Jabeen", artist: "Manna Dey (Waqt)", duration: "4:05", path: "" },
                { title: "Aaj Kal Tere Mere Pyaar Ke Charche", artist: "Mohammed Rafi (Brahmachari)", duration: "5:21", path: "" },
                { title: "Mere Mehboob Qayamat Hogi", artist: "Mohammed Rafi (Mr. X in Bombay)", duration: "3:57", path: "" }
            ]
        },
        "70s": {
            title: "70's Bollywood Classics",
            description: "Melodious gems from Rafi, Lata & Kishore Kumar",
            image: "images/70's Bollywood Disco.jpg",
            tracks: [
                { title: "Dum Maro Dum", artist: "Asha Bhosle (Hare Rama Hare Krishna)", duration: "4:35", path: "" },
                { title: "Yamma Yamma", artist: "Kishore Kumar (Shaan)", duration: "5:12", path: "" },
                { title: "Khaike Paan Banaras Wala", artist: "Kishore Kumar (Don)", duration: "4:23", path: "" },
                { title: "Mehbooba Mehbooba", artist: "RD Burman (Sholay)", duration: "3:47", path: "" },
                { title: "Aap Jaisa Koi", artist: "Nazia Hassan (Qurbani)", duration: "4:51", path: "" }
            ]
        },
        "80s": {
            title: "80's Bollywood Classics",
            description: "Melodious gems from Rafi, Lata & Kishore Kumar",
            image: "images/80's Bollywood Dance Hits.jpg",
            tracks: [
                { title: "I Am A Disco Dancer", artist: "Vijay Benedict (Disco Dancer)", duration: "5:23", path: "" },
                { title: "Jimmy Jimmy Jimmy Aaja", artist: "Parvati Khan (Disco Dancer)", duration: "3:55", path: "" },
                { title: "Ek Do Teen", artist: "Alka Yagnik (Tezaab)", duration: "4:42", path: "" },
                { title: "Jumma Chumma De De", artist: "Sudesh Bhosle (Hum)", duration: "6:21", path: "" },
                { title: "Tamma Tamma Loge", artist: "Bappi Lahiri (Thanedaar)", duration: "5:12", path: "" }
            ]
        },
        "90s": {
            title: "90's Bollywood Classics",
            description: "Melodious gems from Rafi, Lata & Kishore Kumar",
            image: "images/90's romance.jpg",
            tracks: [
                { title: "Tujhe Dekha To", artist: "Kumar Sanu & Lata Mangeshkar (DDLJ)", duration: "5:02", path: "" },
                { title: "Pehla Nasha", artist: "Udit Narayan & Sadhana Sargam (Jo Jeeta Wohi Sikandar)", duration: "4:49", path: "" },
                { title: "Ae Mere Humsafar", artist: "Udit Narayan & Alka Yagnik (Baazigar)", duration: "5:37", path: "" },
                { title: "Tu Cheez Badi Hai Mast Mast", artist: "Udit Narayan & Kavita Krishnamurthy (Mohra)", duration: "4:55", path: "" },
                { title: "Mehndi Laga Ke Rakhna", artist: "Lata Mangeshkar & Udit Narayan (DDLJ)", duration: "4:12", path: "" }
            ]
        },
        "2000s": {
            title: "2000's Bollywood Classics",
            description: "Melodious gems from Rafi, Lata & Kishore Kumar",
            image: "images/2000's Bollywood Fusion.webp",
            tracks: [
                { title: "Kal Ho Naa Ho", artist: "Sonu Nigam (Kal Ho Naa Ho)", duration: "5:21", path: "" },
                { title: "It's The Time To Disco", artist: "KK, Shaan & Vasundhara Das (Kal Ho Naa Ho)", duration: "5:34", path: "" },
                { title: "Dhoom Machale", artist: "Sunidhi Chauhan (Dhoom)", duration: "3:56", path: "" },
                { title: "Kajra Re", artist: "Alisha Chinai, Shankar Mahadevan & Javed Ali (Bunty Aur Babli)", duration: "5:48", path: "" },
                { title: "Mauja Hi Mauja", artist: "Mika Singh (Jab We Met)", duration: "4:03", path: "" }
            ]
        },
    };

    document.querySelectorAll('.music-card').forEach(card => {
        card.addEventListener('click', function () {
            const collectionId = this.getAttribute('data-collection');
            const collection = musicCollections[collectionId];

            if (!collection) return;

            albumCover.src = collection.image;
            albumCover.alt = collection.title;
            collectionName.textContent = collection.title;
            collectionSummary.textContent = collection.description;

            trackListing.innerHTML = '';

            collection.tracks.forEach((track, index) => {
                const li = document.createElement('li');
                li.className = 'track-item';
                li.innerHTML = `
            <div class="track-number">${index + 1}</div>
            <div class="track-control"><i class="fas fa-play"></i></div>
            <div class="track-details">
                <div class="track-name">${track.title}</div>
                <div class="track-artist">${track.artist}</div>
            </div>
            <div class="track-length">${track.duration}</div>
        `;

                const controlBtn = li.querySelector('.track-control');
                controlBtn.addEventListener('click', function (e) {
                    e.stopPropagation();  // Prevent event bubbling

                    const icon = this.querySelector('i');
                    if (icon.classList.contains('fa-play')) {
                        document.querySelectorAll('.track-control i').forEach(i => {
                            i.classList.remove('fa-pause');
                            i.classList.add('fa-play');
                        });

                        icon.classList.remove('fa-play');
                        icon.classList.add('fa-pause');

                        console.log(`Playing: ${track.title} by ${track.artist}`);
                    } else {
                        icon.classList.remove('fa-pause');
                        icon.classList.add('fa-play');

                        console.log(`Paused: ${track.title}`);
                    }
                });

                trackListing.appendChild(li);
            });

            musicDetails.style.display = 'flex';
        });
    });

    exitIcon.addEventListener('click', function () {
        musicDetails.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === musicDetails) {
            musicDetails.style.display = 'none';
        }
    });
});


// CATEGARIES 
document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categories = document.querySelectorAll('.category-card');
    const songPopup = document.getElementById('songPopup');
    const popupTitle = document.getElementById('popupTitle');
    const songList = document.getElementById('songList');
    const closeBtn = document.querySelector('.close-btn');

    // Sample song data for each genre
    const songsByGenre = {
        'Romantic': [
            { title: 'Dheere Dhheere Se Meri Zindagi Mein Aana', artist: 'Anuradha Paudwal and Kumar Sanu', path: "Songs/Romantic/Dheere Dhheere Se Meri Zindagi Mein Aana.mp3" },
            { title: 'Kabhi Kabhie Mere Dil Mein', artist: 'Mukesh', path: "Songs/Romantic/Kabhi Kabhie Mere Dil Mein.mp3" },
            { title: 'Kaho Naa Pyaar Hai', artist: 'Ed Sheeran', path: "Songs/Romantic/Kaho Naa Pyaar Hai.mp3" },
            { title: 'Kora Kagaz Tha Yeh Man Mera', artist: 'Kishore Kumar and Lata Mangeshkar', path: "Songs/Romantic/Kora Kagaz Tha Yeh Man Mera.mp3" },
            { title: 'Lag Ja Gale', artist: 'Lata Mangeshkar', path: "Songs/Romantic/Lag Ja Gale.mp3" },
            { title: 'Mera Dil Bhi Kitna Pagal Hai', artist: 'Alka Yagnik and Kumar Sanu', path: "Songs/Romantic/Mera Dil Bhi Kitna Pagal Hai.mp3" },
            { title: 'O Mere Dil Ke Chain', artist: 'Kishore Kumar', path: "Songs/Romantic/O MERE DIL KE CHAIN.mp3" },
            { title: 'Suraj Hua Maddham', artist: 'Alka Yagnik, Sandesh Shandilya', path: "Songs/Romantic/Suraj Hua Maddham.mp3" }
        ],
        'Classical': [
            { title: 'Bikhri Zulfon Ko Sajaane Ki', artist: 'Alka Yagnik and Kumar Sanu', path: "Songs/Classical/Bikhri Zulfon Ko Sajaane Ki.mp3" },
            { title: 'China Town', artist: 'Mohammed Rafi, Asha Bhosle', path: "Songs/Classical/China Town.mp3" },
            { title: 'Ek Haseen Ladki Se Hogaya Hai Mujhe Pyaar', artist: 'Sonu Nigam, Alka Yagnik', path: "Songs/Classical/Ek Haseen Ladki Se Hogaya Hai Mujhe Pyaar.mp3" },
            { title: 'Hum Unki Aarzu Mein', artist: 'Hemlata & Anwar', path: "Songs/Classical/Hum Unki Aarzu Mein.mp3" },
            { title: 'Khuli Khuli Zulfon Ko', artist: 'Mukesh and Usha Mangeshkar', path: "Songs/Classical/Khuli Khuli Zulfon Ko.mp3" },
            { title: 'Koi Ladki Hai', artist: 'Lata Mangeshkar and Udit Narayan', path: "Songs/Classical/Koi Ladki Hai.mp3" },
            { title: 'Lag Ja Gale Se Phir', artist: 'Lata Mangeshkar', path: "Songs/Classical/Lag Ja Gale Se Phir.mp3" },
            { title: 'Mera Dil Bhi Kitna Pagal Hai', artist: 'Alka Yagnik and Kumar Sanu', path: "Songs/Classical/Mera Dil Bhi Kitna Pagal Hai.mp3" },
            { title: 'Teri Ore', artist: 'Rahat Fateh Ali Khan and Shreya Ghoshal', path: "Songs/Classical/Teri Ore.mp3" },
            { title: 'Tum Se Hi', artist: 'Mohit Chauhan | Pritam', path: "Songs/Classical/Tum Se Hi.mp3" }
        ],
        'Sad': [
            { title: 'Kitne Bhi Tu Karle Sitam', artist: 'Kishore Kumar and R. D. Burman', path: "Songs/Sad/Kitne Bhi Tu Karle Sitam.mp3" },
            { title: 'Pardesi Pardesi', artist: 'Alka Yagnik, Sapna Awasthi, and Udit Narayan', path: "Songs/Sad/Pardesi Pardesi.mp3" },
            { title: 'Rula Ke Gaya', artist: ' Lata Mangeshkar | Jewel Thief', path: "Songs/Sad/Rula Ke Gaya.mp3" },
            { title: 'Tere Bina Zindagi Se Koi Shikwa To Nahin', artist: 'Kishore Kumar and Lata Mangeshkar', path: "Songs/Sad/Tere Bina Zindagi Se Koi Shikwa To Nahin.mp3" },
            { title: 'Toh Phir Aao', artist: 'Emraan Hashmi | Shriya Saran', path: "Songs/Sad/Toh Phir Aao.mp3" },
            { title: 'Tum Bin Jaoon Kahan', artist: 'Kishore Kumar', path: "Songs/Sad/Tum Bin Jaoon Kahan.mp3" },
            { title: 'Tu Jaane Na', artist: 'Atif Aslam and Pritam Chakraborty', path: "Songs/Sad/Tu Jaane Na.mp3" },
            { title: 'Umrao Jaan', artist: 'Farooq Sheikh', path: "Songs/Sad/Umrao Jaan.mp3" },
            { title: 'Zindagi Ke Safar Mein Guzar Jaate', artist: 'Kishore Kumar', path: "Songs/Sad/Zindagi Ke Safar Mein Guzar Jaate.mp3" },
        ],
        'Upbeat': [
            { title: 'Bikhri Zulfon Ko Sajaane Ki', artist: 'Alka Yagnik and Kumar Sanu', path: "Songs/Upbeat/Abhi Na Jaao Chhod Kar.mp3" },
            { title: 'China Town', artist: 'Mohammed Rafi', path: "Songs/Upbeat/Are Diwano Mujhe Pehchano.mp3" },
            { title: 'Ek Haseen Ladki Se Hogaya Hai Mujhe Pyaar', artist: 'Kishore Kumar', path: "Songs/Upbeat/Bhool Bhulaiyaa Title Track.mp3" },
            { title: 'Hum Unki Aarzu Mein', artist: 'Mohammed Rafi', path: "Songs/Upbeat/Chadhti Jawani Meri Chaal Mastani.mp3" },
            { title: 'Khuli Khuli Zulfon Ko', artist: 'Kishore Kumar', path: "Songs/Upbeat/Chal Chaiya Chaiya.mp3" },
            { title: 'Koi Ladki Hai', artist: 'Udit Narayan & Alka Yagnik', path: "Songs/Upbeat/Ek Do Teen.mp3" },
            { title: 'Lag Ja Gale Se Phir', artist: 'Lata Mangeshkar', path: "Songs/Upbeat/Kajra Re.mp3" },
            { title: 'Mera Dil Bhi Kitna Pagal Hai', artist: 'Kumar Sanu & Alka Yagnik', path: "Songs/Upbeat/Papa Kehte Hain Bada Naam Karega.mp3" },
            { title: 'Teri Ore', artist: 'Kishore Kumar', path: "Songs/Upbeat/Tera Hone Laga Hoon.mp3" },
            { title: 'Tum Se Hi', artist: 'Mohit Chauhan', path: "Songs/Upbeat/Yeh Kaali Kaali Aankhen.mp3" }
        ],
        'Funny': [
            { title: 'Bikhri Zulfon Ko Sajaane Ki', artist: 'Anuradha Paudwal & Kumar Sanu', path: "Songs/Funny/Aaj Na Chhodenge.mp3" },
            { title: 'China Town', artist: 'Mukesh', path: "Songs/Funny/Aasha.mp3" },
            { title: 'Ek Haseen Ladki Se Hogaya Hai Mujhe Pyaar', artist: 'Kishore Kumar', path: "Songs/Funny/Ek Chatur Naar Badi Hoshiyaar.mp3" },
            { title: 'Hum Unki Aarzu Mein', artist: 'Kishore Kumar and Lata Mangeshkar', path: "Songs/Funny/Ek Garam Chai Ki Pyali Ho.mp3" },
            { title: 'Khuli Khuli Zulfon Ko', artist: 'Lata Mangeshkar', path: "Songs/Funny/Govinda Aala Re Aala.mp3" },
            { title: 'Koi Ladki Hai', artist: 'Alka Yagnik & Udit Narayan', path: "Songs/Funny/Khaike Paan Banaras Wala.mp3" },
            { title: 'Lag Ja Gale Se Phir', artist: 'Lata Mangeshkar', path: "Songs/Funny/Meri Pyari Bindu.mp3" },
            { title: 'Mera Dil Bhi Kitna Pagal Hai', artist: 'Kumar Sanu & Alka Yagnik', path: "Songs/Funny/Saree Ke Fall Sa.mp3" },
            { title: 'Teri Ore', artist: 'Shreya Ghoshal & Rahat Fateh Ali Khan', path: "Songs/Funny/Tharki Chokro.mp3" }
        ],
        'Jazz': [
            { title: 'Dil Ki To Lag Gayi', artist: 'Anuradha Paudwal and Kumar Sanu', path: "Songs/Jazz/Dil Ki To Lag Gayi.mp3" },
            { title: 'Eena Meena Deeka', artist: 'C. Ramchandra & Meena Kapoor', path: "Songs/Jazz/Eena Meena Deeka.mp3" },
            { title: 'Kiya Kiya', artist: 'Sunidhi Chauhan & Kunal Ganjawala', path: "Songs/Jazz/Kiya Kiya.mp3" },
            { title: 'Kya Yahi Pyar Hai', artist: 'Kishore Kumar & Lata Mangeshkar', path: "Songs/Jazz/Kya Yahi Pyar Hai.mp3" },
            { title: 'Mera Naam Chin Chin Chu', artist: 'Geeta Dutt', path: "Songs/Jazz/Mera Naam Chin Chin Chu.mp3" },
            { title: 'Na Tum Jano Na Hum', artist: 'Lucky Ali & Ramya', path: "Songs/Jazz/Na Tum Jano Na Hum.mp3" },
            { title: 'Saagar Jaisi Aankhon Wali', artist: 'Kishore Kumar', path: "Songs/Jazz/Saagar Jaisi Aankhon Wali.mp3" },
            { title: 'Tera Hone Laga Hoon', artist: 'Atif Aslam & Alisha Chinai', path: "Songs/Jazz/Tera Hone Laga Hoon.mp3" },
            { title: 'Apni To Jaise Taise', artist: 'Kishore Kumar', path: "Songs/Jazz/Apni To Jaise Taise.mp3" },
            { title: 'Badan Pe Sitare Lapete Huye', artist: 'Mohammad Rafi', path: "Songs/Jazz/Badan Pe Sitare Lapete Huye.mp3" }
        ]
    };

    // Add click event to category cards to show popup
    categories.forEach(card => {
        card.addEventListener('click', function () {
            // Get the genre from the data attribute
            const genre = this.getAttribute('data-genre');

            // Update popup title
            popupTitle.textContent = genre + ' Music';

            // Clear previous song list
            songList.innerHTML = '';

            // Add songs for the selected genre
            songsByGenre[genre].forEach(song => {
                const li = document.createElement('li');
                li.innerHTML = `
                <div>
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
                <div>
                    <span class="play-icon">▶</span>
                </div>
            `;

                // Add click event to song items (play button)
                li.querySelector('.play-icon').addEventListener('click', function (e) {
                    e.stopPropagation();

                    // Find any currently playing song and reset its icon
                    const playingIcons = document.querySelectorAll('.play-icon');
                    playingIcons.forEach(icon => {
                        if (icon.textContent === '❚❚') {
                            icon.textContent = '▶';
                        }
                    });

                    // Toggle play/pause
                    if (this.textContent === '▶') {
                        this.textContent = '❚❚';

                        // Here you would add actual audio playback
                        console.log(`Playing: ${song.title} by ${song.artist}`);
                    } else {
                        this.textContent = '▶';

                        // Here you would pause actual audio playback
                        console.log(`Paused: ${song.title} by ${song.artist}`);
                    }
                });

                songList.appendChild(li);
            });

            // Show the popup
            songPopup.classList.add('active');

            // Prevent body scrolling when popup is open
            document.body.style.overflow = 'hidden';

            // Remove active class from all cards
            categories.forEach(c => c.classList.remove('active'));

            // Add active class to clicked card
            this.classList.add('active');

            // Add pulse animation to the card
            this.style.animation = 'none';
            void this.offsetWidth; // Trigger reflow
            this.style.animation = 'pulse 0.5s';
        });

        // Add hover animation
        card.addEventListener('mouseover', function () {
            this.style.transform = 'translateY(-10px) scale(1.03)';
        });

        card.addEventListener('mouseout', function () {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });

    // Close popup when clicking the close button
    closeBtn.addEventListener('click', function () {
        songPopup.classList.remove('active');

        // Re-enable body scrolling
        document.body.style.overflow = '';
    });

    // Close popup when clicking outside the content
    songPopup.addEventListener('click', function (e) {
        if (e.target === songPopup) {
            songPopup.classList.remove('active');

            // Re-enable body scrolling
            document.body.style.overflow = '';
        }
    });

    // Add filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value
            const filter = this.getAttribute('data-filter');

            // Filter categories
            categories.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';

                    // Add animation
                    card.style.animation = 'none';
                    void card.offsetWidth; // Trigger reflow
                    card.style.animation = 'fadeIn 0.5s';
                } else {
                    if (card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';

                        // Add animation
                        card.style.animation = 'none';
                        void card.offsetWidth; // Trigger reflow
                        card.style.animation = 'fadeIn 0.5s';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Close popup with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && songPopup.classList.contains('active')) {
            songPopup.classList.remove('active');

            // Re-enable body scrolling
            document.body.style.overflow = '';
        }
    });
});