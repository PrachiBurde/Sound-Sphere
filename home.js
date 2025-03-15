document.addEventListener('DOMContentLoaded', function () {

        // Get DOM elements
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        const searchContainer = document.querySelector('.search-container');
        
        // Create the search results container if it doesn't exist
        let searchResults = document.getElementById('searchResults');
        if (!searchResults) {
            searchResults = document.createElement('div');
            searchResults.className = 'search-results';
            searchResults.id = 'searchResults';
            // Insert after search container
            searchContainer.parentNode.insertBefore(searchResults, searchContainer.nextSibling);
        }
        
        // Track search timeout for debouncing
        let searchTimeout = null;
        
        // Function to handle search input
        function handleSearchInput() {
            const query = searchInput.value.trim();
            
            // Clear previous timeout
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            
            // If query is empty, hide results
            if (query.length === 0) {
                searchResults.style.display = 'none';
                return;
            }
            
            // Show loading indicator
            searchResults.style.display = 'block';
            searchResults.innerHTML = '<div class="no-results">Searching...</div>';
            
            // Debounce search to avoid too many requests
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        }
        
        // Function to perform search
        function performSearch(query) {
            // In a real app, this would make an API call to your backend
            // For demonstration, we'll use mock data
            
            // Simulate API delay
            setTimeout(() => {
                // Mock search results
                const results = fetchMockResults(query);
                displayResults(results, query);
            }, 500);
        }
        
        // Function to get mock results (replace with actual API call)
        function fetchMockResults(query) {
            // Mock data - in a real app, this would come from your PHP backend
            const allItems = [
                { id: 1, title: 'Electric Pulse', artist: 'Neon Wave', type: 'song', image: 'https://via.placeholder.com/40' },
                { id: 2, title: 'Electronic Dreams', artist: 'Synthwave', type: 'album', image: 'https://via.placeholder.com/40' },
                { id: 3, title: 'Neon Wave', artist: '', type: 'artist', image: 'https://via.placeholder.com/40' },
                { id: 4, title: 'Pulse Beats', artist: 'Electric Sound', type: 'song', image: 'https://via.placeholder.com/40' },
                { id: 5, title: 'Synthwave', artist: '', type: 'artist', image: 'https://via.placeholder.com/40' },
                { id: 6, title: 'Future Sounds', artist: 'Electric Pulse', type: 'playlist', image: 'https://via.placeholder.com/40' }
            ];
            
            // Filter based on query
            return allItems.filter(item => {
                const titleMatch = item.title.toLowerCase().includes(query.toLowerCase());
                const artistMatch = item.artist.toLowerCase().includes(query.toLowerCase());
                return titleMatch || artistMatch;
            });
        }
        
        // Function to display search results
        function displayResults(results, query) {
            searchResults.innerHTML = '';
            
            if (results.length === 0) {
                searchResults.innerHTML = `<div class="no-results">No results found for "${query}"</div>`;
                return;
            }
            
            // Group results by type (like Spotify does)
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
            
            // Create sections for each type
            const types = ['artist', 'album', 'song', 'playlist'];
            types.forEach(type => {
                const typeItems = groupedResults[type];
                if (typeItems.length > 0) {
                    // Add section title
                    const sectionTitle = document.createElement('div');
                    sectionTitle.className = 'result-section-title';
                    sectionTitle.innerHTML = `<div style="padding: 8px 12px; color: #b3b3b3; font-size: 14px; font-weight: 600;">${type.charAt(0).toUpperCase() + type.slice(1)}s</div>`;
                    searchResults.appendChild(sectionTitle);
                    
                    // Add items
                    typeItems.slice(0, 3).forEach(item => { // Limit to 3 items per section like Spotify
                        const resultItem = createResultItem(item);
                        searchResults.appendChild(resultItem);
                    });
                }
            });
            
            searchResults.style.display = 'block';
        }
        
        // Function to create result item element
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
            
            // Add click event
            resultItem.addEventListener('click', () => {
                // Handle item click - in a real app, this would play the song, open the album, etc.
                console.log(`Clicked on ${item.type}: ${item.title}`);
                if (item.type === 'song') {
                    alert(`Now playing: ${item.title} by ${item.artist}`);
                    // In a real app, you would update the player UI and play the song
                } else {
                    alert(`Opening ${item.type}: ${item.title}`);
                    // In a real app, this would navigate to the artist/album/playlist page
                }
                
                // Close search results
                searchResults.style.display = 'none';
                // Update search input
                searchInput.value = item.title;
            });
            
            return resultItem;
        }
        
        // Function to handle search button click
        function handleSearchButtonClick() {
            if (searchInput.value.trim().length > 0) {
                performSearch(searchInput.value.trim());
            }
        }
        
        // Add event listeners
        searchInput.addEventListener('input', handleSearchInput);
        searchInput.addEventListener('focus', function() {
            if (searchInput.value.trim().length > 0) {
                searchResults.style.display = 'block';
            }
        });
        
        searchBtn.addEventListener('click', handleSearchButtonClick);
        
        // Close search results when clicking outside
        document.addEventListener('click', function(event) {
            if (!searchContainer.contains(event.target) && 
                !searchResults.contains(event.target)) {
                searchResults.style.display = 'none';
            }
        });
        

    const ctaButton = document.querySelector(".cta-btn");

    // Add click event
    ctaButton.addEventListener("click", function () {
        // alert("Redirecting to the music platform...");
        window.location.href = "https://www.spotify.com"; // Change URL if needed
    });

    // Music cards hover effect
    const musicCards = document.querySelectorAll('.music-card');
    musicCards.forEach(card => {
        card.addEventListener('click', function () {
            const musicTitle = this.querySelector('.music-title').textContent;
            const musicArtist = this.querySelector('.music-artist').textContent;
            const albumCover = this.querySelector('.music-thumbnail').src;

            // Update player info
            document.querySelector('.track-name').textContent = musicTitle;
            document.querySelector('.artist-name').textContent = musicArtist;
            document.querySelector('.now-playing img').src = albumCover;

            // Reset progress bar
            document.querySelector('.progress').style.width = '0%';

            // Change play button to pause
            document.querySelector('.play-btn').textContent = '⏸️';

            // Simulate playing
            simulatePlayback();
        });
    });

    // Play/Pause button toggle
    const playBtn = document.querySelector('.play-btn');
    playBtn.addEventListener('click', function () {
        if (this.textContent === '▶️') {
            this.textContent = '⏸️';
            simulatePlayback();
        } else {
            this.textContent = '▶️';
            clearInterval(window.playbackInterval);
        }
    });

    // Progress bar interaction
    const progressBar = document.querySelector('.progress-bar');
    progressBar.addEventListener('click', function (e) {
        const width = this.clientWidth;
        const clickPosition = e.offsetX;
        const percentage = (clickPosition / width) * 100;

        document.querySelector('.progress').style.width = `${percentage}%`;
    });

    // CTA button action
    document.querySelector('.cta-btn').addEventListener('click', function () {
        document.querySelector('.featured').scrollIntoView({ behavior: 'smooth' });
    });

    // Function to simulate playback
    function simulatePlayback() {
        clearInterval(window.playbackInterval);
        let progress = 0;
        const progressElement = document.querySelector('.progress');

        window.playbackInterval = setInterval(() => {
            progress += 0.5;
            progressElement.style.width = `${progress}%`;

            if (progress >= 100) {
                clearInterval(window.playbackInterval);
                playBtn.textContent = '▶️';
            }
        }, 300);
    }
});
