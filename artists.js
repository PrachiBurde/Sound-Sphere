document.addEventListener('DOMContentLoaded', function() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter logic would go here
            const genre = this.textContent;
            console.log('Filtering by:', genre);
            
            // In a real application, you would fetch artists by genre
            // For now, we'll just log it
        });
    });
    
    // Sort dropdown
    const sortDropdown = document.querySelector('.sort-dropdown');
    sortDropdown.addEventListener('change', function() {
        const sortBy = this.value;
        console.log('Sorting by:', sortBy);
        
        // In a real application, you would sort the artists
        // For now, we'll just log it
    });
    
    // Alphabet navigation
    const letterButtons = document.querySelectorAll('.letter-btn');
    letterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            letterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const letter = this.dataset.letter;
            console.log('Filtering by letter:', letter);
            
            // In a real application, you would filter artists by starting letter
            // For now, we'll just log it
        });
    });
    
    // Artist cards
    const artistCards = document.querySelectorAll('.artist-card');
    artistCards.forEach(card => {
        card.addEventListener('click', function() {
            const artistId = this.dataset.id || '1'; // Fallback for static examples
            window.location.href = `artist-detail.php?id=${artistId}`;
        });
    });
    
    // Featured artist buttons
    const featuredButtons = document.querySelectorAll('.featured-artist-btn');
    featuredButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent bubbling to parent
            const artistId = this.closest('.featured-artist').dataset.id || '1'; // Fallback for static examples
            window.location.href = `artist-detail.php?id=${artistId}`;
        });
    });
    
    // Pagination
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent !== '«' && this.textContent !== '»')
        });
    });
});
