
const galleryGrid = document.querySelector('.gallery-grid');
const totalArtworks = 60; // Total number of artworks
let activeIndex = 4; // Start with the center item as active
let currentIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // Initial indices for the 3x3 grid

// Function to create gallery items
const createGalleryItem = (index) => {
    const item = document.createElement('div');
    item.classList.add('gallery-item');
    if (index === activeIndex) {
        item.classList.add('active');
    }
    item.style.backgroundImage = `url('path/to/artwork${index + 1}.jpg')`; // Update with actual path
    return item;
};

// Function to populate the grid
const populateGrid = () => {
    galleryGrid.innerHTML = ''; // Clear existing items
    currentIndices.forEach(index => {
        galleryGrid.appendChild(createGalleryItem(index));
    });
};

const updateIndices = (direction) => {
    let newIndices;
    switch (direction) {
        case 'left':
            newIndices = currentIndices.map(index => (index + 1) % totalArtworks);
            break;
        case 'right':
            newIndices = currentIndices.map(index => (index - 1 + totalArtworks) % totalArtworks);
            break;
        case 'up':
            newIndices = currentIndices.map(index => (index - 3 + totalArtworks) % totalArtworks);
            break;
        case 'down':
            newIndices = currentIndices.map(index => (index + 3) % totalArtworks);
            break;
    }
    currentIndices = newIndices;
};

const updateActiveItem = (newActiveIndex) => {
    const items = document.querySelectorAll('.gallery-item');
    items[activeIndex % 9].classList.remove('active');
    items[newActiveIndex % 9].classList.add('active');
    activeIndex = newActiveIndex;
};

const swipeHandler = (direction) => {
    let newActiveIndex;
    switch (direction) {
        case 'left':
            newActiveIndex = (activeIndex % 3 === 2) ? activeIndex : activeIndex + 1;
            break;
        case 'right':
            newActiveIndex = (activeIndex % 3 === 0) ? activeIndex : activeIndex - 1;
            break;
        case 'up':
            newActiveIndex = (activeIndex < 3) ? activeIndex : activeIndex - 3;
            break;
        case 'down':
            newActiveIndex = (activeIndex > 5) ? activeIndex : activeIndex + 3;
            break;
    }
    updateIndices(direction);
    populateGrid();
    updateActiveItem(newActiveIndex);
};

// Initial population of the grid
populateGrid();

// Set up Hammer.js
const hammer = new Hammer(galleryGrid);
hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

hammer.on('swipeleft', () => swipeHandler('left'));
hammer.on('swiperight', () => swipeHandler('right'));
hammer.on('swipeup', () => swipeHandler('up'));
hammer.on('swipedown', () => swipeHandler('down'));
