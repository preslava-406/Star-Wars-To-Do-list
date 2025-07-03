// Global variables
let tasks = [];
let taskIdCounter = 1;

// DOM elements
const taskInput = document.getElementById('taskInput');
const categorySelect = document.getElementById('categorySelect');
const addBtn = document.getElementById('addBtn');
const generateBtn = document.getElementById('generateBtn');
const colorBtn = document.getElementById('colorBtn');
const tasksList = document.getElementById('tasksList');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const remainingTasks = document.getElementById('remainingTasks');

// Application initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Star Wars To-Do App started! 🚀');
    
    // Loads saved tasks
    loadTasks();
    
    // Creates particles
    createParticles();
    
    // Sets a starting topic
    document.body.classList.add('blue-theme');
    
    // Adds event listeners
    setupEventListeners();
    
    // Refreshes statistics
    updateStats();
});

// Function for setting up event listeners
function setupEventListeners() {
    // Add task with Enter
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Add a task with a button
    addBtn.addEventListener('click', addTask);
    
    // Generate a random task
    generateBtn.addEventListener('click', generateTask);
    
    // Change color theme
    colorBtn.addEventListener('click', changeColorTheme);
}

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();
    const category = categorySelect.value;
    
    // Checking for entered text
    if (taskText === '') {
        alert('Please, enter a task!');
        return;
    }
    
    // Creates a new task object
    const newTask = {
        id: taskIdCounter++,
        text: taskText,
        category: category,
        completed: false,
        createdAt: new Date().toLocaleString('bg-BG')
    };
    
    // Adds the task to the array
    tasks.push(newTask);
    
    // Clears the input field
    taskInput.value = '';
    
    // Refreshes the interface
    renderTasks();
    updateStats();
    saveTasks();
    
    console.log('Added task:', newTask);
}

// Random task generation function
function generateTask() {
    const randomTaskData = generateRandomTask();
    
    // Creates a new task object
    const newTask = {
        id: taskIdCounter++,
        text: randomTaskData.task,
        category: randomTaskData.category,
        completed: false,
        createdAt: new Date().toLocaleString('bg-BG')
    };
    
    // Adds the task to the array
    tasks.push(newTask);
    
    //Refreshes the interface
    renderTasks();
    updateStats();
    saveTasks();
    
    console.log('Generated task:', newTask);
}

// Task rendering function
function renderTasks() {
    // Clears the list
    tasksList.innerHTML = '';
    
    // If there are no tasks, displays a message
    if (tasks.length === 0) {
        tasksList.innerHTML = '<li class="no-tasks">There are no tasks. Add a new task or generate a random one! 🌟</li>';
        return;
    }
    
    // Creates HTML for each task
    tasks.forEach(task => {
        const taskItem = createTaskElement(task);
        tasksList.appendChild(taskItem);
    });
}

// Function to create an HTML element for a task
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', task.id);
    
    // Gets the category icon
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

// Task status toggle function
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

// Task delete function
function deleteTask(taskId) {
    // Delete confirmation
    if (confirm('Are you sure that you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        renderTasks();
        updateStats();
        saveTasks();
        console.log('Deleted task with ID:', taskId);
    }
}

// Statistics update function
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const remaining = total - completed;
    
    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    remainingTasks.textContent = remaining;
}

// Function to save tasks in localStorage
function saveTasks() {
    try {
        localStorage.setItem('starWarsTasks', JSON.stringify(tasks));
        localStorage.setItem('starWarsTaskCounter', taskIdCounter.toString());
        console.log('The tasks are saved in localStorage');
    } catch (error) {
        console.error('Error saving tasks:', error);
    }
}

// Function to load tasks from localStorage
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

// Function to clear all tasks (for debugging)
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

// Task export function (bonus feature)
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

// Adds features to the debugging console
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
