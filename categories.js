// Star Wars категории с икони и примерни задачи
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

// Цветови теми за lightsaber ефекта
const COLOR_THEMES = [
    'blue-theme',    // Luke Skywalker
    'red-theme',     // Darth Vader / Sith
    'green-theme',   // Yoda
    'purple-theme',  // Mace Windu
    'orange-theme'   // Unique combination
];

// Функция за генериране на случайна задача
function generateRandomTask() {
    // Избира случайна категория
    const categoryKeys = Object.keys(STAR_WARS_CATEGORIES);
    const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    
    // Избира случайна задача от категорията
    const categoryTasks = STAR_WARS_CATEGORIES[randomCategory].tasks;
    const randomTask = categoryTasks[Math.floor(Math.random() * categoryTasks.length)];
    
    return {
        category: randomCategory,
        task: randomTask,
        icon: STAR_WARS_CATEGORIES[randomCategory].icon
    };
}

// Функция за смяна на цветова тема
function changeColorTheme() {
    const currentTheme = document.body.className;
    const currentIndex = COLOR_THEMES.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % COLOR_THEMES.length;
    
    // Премахва старата тема
    document.body.className = '';
    
    // Добавя новата тема
    document.body.classList.add(COLOR_THEMES[nextIndex]);
    
    // Генерира нови частици с новия цвят
    createParticles();
}

// Функция за създаване на анимирани частици
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    // Изчиства старите частици
    particlesContainer.innerHTML = '';
    
    // Създава нови частици
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайна позиция
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Случайно забавяне на анимацията
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        // Случайна скорост на анимацията
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Експортираме функциите за използване в script.js
// (В браузъра няма модулна система, така че просто ги правим глобални)