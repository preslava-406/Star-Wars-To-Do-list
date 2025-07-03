// Star Wars categories with icons and sample tasks
const STAR_WARS_CATEGORIES = {
    characters: {
        icon: "👤",
        name: "Characters",
        tasks: [
            "Train with Master Yoda",
            "Meet with Princess Leia",
            "Help Han Solo",
            "Find Obi-Wan Kenobi",
            "Battle Darth Vader",
            "Learn from Luke Skywalker",
            "Visit Chewbacca",
            "Talk with C-3PO",
            "Repair R2-D2",
            "Follow Mace Windu",
            "Study Qui-Gon Jinn's techniques",
            "Meditate with Anakin Skywalker",
            "Save Padmé Amidala",
            "Escape from Boba Fett",
            "Fight Emperor Palpatine"
        ]
    },
    species: {
        icon: "🐾",
        name: "Species",
        tasks: [
            "Train as a Wookiee warrior",
            "Learn the language of Ewoks",
            "Visit the Jawa settlement",
            "Learn to fly like a Twi'lek",
            "Meditate with Togruta sage",
            "Research Rodian culture",
            "Train Force with Zabrak",
            "Visit the Gungan home",
            "Study Duros technologies",
            "Fight like a Mandalorian",
            "Learn diplomacy from Mon Calamari",
            "Explore the secrets of Chiss",
            "Train with Nautolan master",
            "Visit the planet of Kel Dor",
            "Study the mysteries of Miraluka"
        ]
    },
    planets: {
        icon: "🌍",
        name: "Planets",
        tasks: [
            "Explore the deserts of Tatooine",
            "Visit the ice caves of Hoth",
            "Study the jungles of Endor",
            "Train in the swamps of Dagobah",
            "Explore the capital Coruscant",
            "Visit the cloud city of Bespin",
            "Study the lava fields of Mustafar",
            "Explore the oceans of Kamino",
            "Visit the temples of Yavin 4",
            "Train in the mountains of Alderaan",
            "Explore the forests of Kashyyyk",
            "Visit the wastelands of Jakku",
            "Study the secrets of Naboo",
            "Explore the crystal caves of Ilum",
            "Visit the mystical Mortis"
        ]
    },
    vehicles: {
        icon: "🚗",
        name: "Vehicles",
        tasks: [
            "Ride Speeder bike through forest",
            "Repair AT-AT Walker",
            "Train with Podracer",
            "Operate Sandcrawler",
            "Explore with Scout Trooper bike",
            "Repair Landspeeder",
            "Train with Swoop bike",
            "Operate Imperial Walker",
            "Explore with Dewback",
            "Repair Moisture Vaporator",
            "Train with Speeder truck",
            "Operate Clone Turbo Tank",
            "Explore with Bantha",
            "Repair Jawa Sandcrawler",
            "Train with Republic Gunship"
        ]
    },
    starships: {
        icon: "🚀",
        name: "Starships",
        tasks: [
            "Pilot Millennium Falcon",
            "Repair X-wing fighter",
            "Train with TIE Fighter",
            "Navigate with Star Destroyer",
            "Explore with Y-wing bomber",
            "Repair A-wing interceptor",
            "Train with B-wing assault",
            "Pilot Imperial Shuttle",
            "Explore with Nebulon frigate",
            "Repair Corellian Corvette",
            "Train with Jedi Interceptor",
            "Pilot Venator cruiser",
            "Explore with Mon Calamari cruiser",
            "Repair Rebel Transport",
            "Train with Lambda Shuttle"
        ]
    }
};

// Color themes for the lightsaber effect
const COLOR_THEMES = [
    'blue-theme',    // Luke Skywalker
    'red-theme',     // Darth Vader / Sith
    'green-theme',   // Yoda
    'purple-theme',  // Mace Windu
    'orange-theme'   // Unique combination
];

// A funcyion for random task generating
function generateRandomTask() {
    // Избира случайна категория
    const categoryKeys = Object.keys(STAR_WARS_CATEGORIES);
    const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    
    // Chooses a random task from the category
    const categoryTasks = STAR_WARS_CATEGORIES[randomCategory].tasks;
    const randomTask = categoryTasks[Math.floor(Math.random() * categoryTasks.length)];
    
    return {
        category: randomCategory,
        task: randomTask,
        icon: STAR_WARS_CATEGORIES[randomCategory].icon
    };
}

// Function for color theme changing
function changeColorTheme() {
    const currentTheme = document.body.className;
    const currentIndex = COLOR_THEMES.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % COLOR_THEMES.length;
    
    // Removing the old theme
    document.body.className = '';
    
    // Добавя новата тема
    document.body.classList.add(COLOR_THEMES[nextIndex]);
    
    // Generating particles with the new color
    createParticles();
}

// Function for generating new particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    // Clears old particles
    particlesContainer.innerHTML = '';
    
    // Creates new particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random delay of the animation
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        // Random speed of the animation
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Export the functions for use in script.js
// (There is no module system in the browser, so we just make them global)
