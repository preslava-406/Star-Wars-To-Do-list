// Глобални променливи
let tasks = [];
let taskIdCounter = 1;

// DOM елементи
const taskInput = document.getElementById('taskInput');
const categorySelect = document.getElementById('categorySelect');
const addBtn = document.getElementById('addBtn');
const generateBtn = document.getElementById('generateBtn');
const colorBtn = document.getElementById('colorBtn');
const tasksList = document.getElementById('tasksList');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const remainingTasks = document.getElementById('remainingTasks');

// Инициализация на приложението
document.addEventListener('DOMContentLoaded', function() {
    console.log('Star Wars To-Do App started! 🚀');
    
    // Зарежда запазените задачи
    loadTasks();
    
    // Създава частици
    createParticles();
    
    // Задава начална тема
    document.body.classList.add('blue-theme');
    
    // Добавя event listeners
    setupEventListeners();
    
    // Обновява статистиките
    updateStats();
});

// Функция за настройка на event listeners
function setupEventListeners() {
    // Добавяне на задача с Enter
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Добавяне на задача с бутон
    addBtn.addEventListener('click', addTask);
    
    // Генериране на случайна задача
    generateBtn.addEventListener('click', generateTask);
    
    // Смяна на цветова тема
    colorBtn.addEventListener('click', changeColorTheme);
}

// Функция за добавяне на задача
function addTask() {
    const taskText = taskInput.value.trim();
    const category = categorySelect.value;
    
    // Проверка дали има въведен текст
    if (taskText === '') {
        alert('Please, enter a task!');
        return;
    }
    
    // Създава нов обект за задача
    const newTask = {
        id: taskIdCounter++,
        text: taskText,
        category: category,
        completed: false,
        createdAt: new Date().toLocaleString('bg-BG')
    };
    
    // Добавя задачата в масива
    tasks.push(newTask);
    
    // Изчиства input полето
    taskInput.value = '';
    
    // Обновява интерфейса
    renderTasks();
    updateStats();
    saveTasks();
    
    console.log('Added task:', newTask);
}

// Функция за генериране на случайна задача
function generateTask() {
    const randomTaskData = generateRandomTask();
    
    // Създава нов обект за задача
    const newTask = {
        id: taskIdCounter++,
        text: randomTaskData.task,
        category: randomTaskData.category,
        completed: false,
        createdAt: new Date().toLocaleString('bg-BG')
    };
    
    // Добавя задачата в масива
    tasks.push(newTask);
    
    // Обновява интерфейса
    renderTasks();
    updateStats();
    saveTasks();
    
    console.log('Generated task:', newTask);
}

// Функция за рендериране на задачите
function renderTasks() {
    // Изчиства списъка
    tasksList.innerHTML = '';
    
    // Ако няма задачи, показва съобщение
    if (tasks.length === 0) {
        tasksList.innerHTML = '<li class="no-tasks">There are no tasks. Add a new task or generate a random one! 🌟</li>';
        return;
    }
    
    // Създава HTML за всяка задача
    tasks.forEach(task => {
        const taskItem = createTaskElement(task);
        tasksList.appendChild(taskItem);
    });
}

// Функция за създаване на HTML елемент за задача
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', task.id);
    
    // Взима иконата на категорията
    const categoryIcon = STAR_WARS_CATEGORIES[task.category].icon;
    
    li.innerHTML = `
        <div class="task-content">
            <span class="task-category">${categoryIcon}</span>
            <span class="task-text">${task.text}</span>
        </div>
        <div class="task-buttons">
            <button class="task-btn complete-btn" onclick="toggleTask(${task.id})">
                ${task.completed ? '↩️' : '✅'}
            </button>
            <button class="task-btn delete-btn" onclick="deleteTask(${task.id})">
                🗑️
            </button>
        </div>
    `;
    
    return li;
}

// Функция за превключване на състоянието на задача
function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        updateStats();
        saveTasks();
        console.log('Changed task status:', task);
    }
}

// Функция за изтриване на задача
function deleteTask(taskId) {
    // Потвърждение за изтриване
    if (confirm('Are you sure that you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        renderTasks();
        updateStats();
        saveTasks();
        console.log('Deleted task with ID:', taskId);
    }
}

// Функция за обновяване на статистиките
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const remaining = total - completed;
    
    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    remainingTasks.textContent = remaining;
}

// Функция за запазване на задачи в localStorage
function saveTasks() {
    try {
        localStorage.setItem('starWarsTasks', JSON.stringify(tasks));
        localStorage.setItem('starWarsTaskCounter', taskIdCounter.toString());
        console.log('The tasks are saved in localStorage');
    } catch (error) {
        console.error('Error saving tasks:', error);
    }
}

// Функция за зареждане на задачи от localStorage
function loadTasks() {
    try {
        const savedTasks = localStorage.getItem('starWarsTasks');
        const savedCounter = localStorage.getItem('starWarsTaskCounter');
        
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
            console.log('Loaded tasks:', tasks);
        }
        
        if (savedCounter) {
            taskIdCounter = parseInt(savedCounter);
        }
        
        renderTasks();
    } catch (error) {
        console.error('Error loading tasks:', error);
        tasks = [];
    }
}

// Функция за изчистване на всички задачи (за debugging)
function clearAllTasks() {
    if (confirm('Are you sure that you want to delete all tasks?')) {
        tasks = [];
        taskIdCounter = 1;
        renderTasks();
        updateStats();
        saveTasks();
        console.log('All tasks are deleted');
    }
}

// Функция за експортиране на задачите (бонус функция)
function exportTasks() {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'star-wars-tasks.json';
    link.click();
    console.log('The tasks are exported');
}

// Добавя функции в конзолата за debugging
window.debugFunctions = {
    clearAllTasks,
    exportTasks,
    showTasks: () => console.log('Current tasks:', tasks),
    showStats: () => console.log('Statistics:', {
        total: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        remaining: tasks.filter(t => !t.completed).length
    })
};

console.log('Star Wars To-Do App is ready! 🌟');
console.log('For debugging use: window.debugFunctions');