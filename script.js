// DOM Elements
const habitsList = document.getElementById('habits-body');
const newHabitInput = document.getElementById('new-habit');
const addHabitBtn = document.getElementById('add-habit-btn');

const notesList = document.getElementById('notes-list');
const newNoteInput = document.getElementById('new-note');
const addNoteBtn = document.getElementById('add-note-btn');

const prioritiesList = document.getElementById('priorities-list');
const newPriorityInput = document.getElementById('new-priority');
const addPriorityBtn = document.getElementById('add-priority-btn');

const tasksList = document.getElementById('tasks-body');
const addTaskBtn = document.getElementById('add-task-btn');
const taskModal = document.getElementById('task-modal');
const closeModal = document.querySelector('.close-modal');
const saveTaskBtn = document.getElementById('save-task-btn');
const taskNameInput = document.getElementById('task-name');
const taskStatusSelect = document.getElementById('task-status');
const taskCategorySelect = document.getElementById('task-category');
const taskDueDateInput = document.getElementById('task-due-date');

const dayProgressElement = document.getElementById('day-progress');
const weekProgressElement = document.getElementById('week-progress');
const monthProgressElement = document.getElementById('month-progress');
const quarterProgressElement = document.getElementById('quarter-progress');
const yearProgressElement = document.getElementById('year-progress');
const lifeProgressElement = document.getElementById('life-progress');

const dayPercentElement = document.getElementById('day-percent');
const weekPercentElement = document.getElementById('week-percent');
const monthPercentElement = document.getElementById('month-percent');
const quarterPercentElement = document.getElementById('quarter-percent');
const yearPercentElement = document.getElementById('year-percent');
const lifePercentElement = document.getElementById('life-percent');

const digitalTimeElement = document.getElementById('digital-time');
const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');
const clockFace = document.getElementById('clock-face');

// Initial Data (default values)
let habits = [
  { id: '1', name: 'Waking up at 6am', days: [true, true, true, true, true, true, false] },
  { id: '2', name: 'Hydrating Myself', days: [true, true, true, true, true, true, true] },
  { id: '3', name: 'Journaling', days: [false, true, true, true, true, true, false] },
  { id: '4', name: '15min Reading', days: [true, true, true, true, true, true, true] },
  { id: '5', name: 'Done my workout', days: [true, true, true, true, true, true, false] },
  { id: '6', name: 'Meditated', days: [true, true, true, true, true, true, true] },
];

let notes = [
  { id: '1', text: 'Call the dentist on Monday to reschedule appointment' },
  { id: '2', text: 'Buy groceries for weekend dinner party' },
  { id: '3', text: 'Submit quarterly tax documents by Friday' },
  { id: '4', text: 'Reserve tickets for concert next month' },
  { id: '5', text: 'Schedule car maintenance before road trip' },
  { id: '6', text: 'Follow up on email from project manager' },
];

let priorities = [
  { id: '1', text: 'Meet with my manager and plan our main project', completed: true },
  { id: '2', text: 'Hire a new gym coach', completed: false },
  { id: '3', text: 'Plan my meals for the week', completed: false },
  { id: '4', text: 'Check my oil', completed: false },
  { id: '5', text: 'Rearrange my reading room', completed: false },
  { id: '6', text: 'Build a new stand for the kitchen', completed: false },
  { id: '7', text: 'Clean my bathroom - reorganize it', completed: false },
  { id: '8', text: 'Fix the ceiling fan', completed: false },
];

let tasks = [
  { 
    id: '1', 
    name: 'Repair my ceiling', 
    status: 'not-started', 
    category: 'personal', 
    dueDate: '2025-03-12', 
    completed: false 
  },
  { 
    id: '2', 
    name: "Fix my phone's screen", 
    status: 'in-progress', 
    category: 'personal', 
    dueDate: '2024-11-21', 
    completed: false 
  },
  { 
    id: '3', 
    name: 'Buy vegetables for the week', 
    status: 'done', 
    category: 'health-wellness', 
    dueDate: '2024-11-22', 
    completed: true 
  },
  { 
    id: '4', 
    name: 'Report my presentation', 
    status: 'in-progress', 
    category: 'work-school', 
    dueDate: '2024-11-22', 
    completed: false 
  },
  { 
    id: '5', 
    name: 'Buy new skincare products', 
    status: 'done', 
    category: 'personal', 
    dueDate: '2024-11-22', 
    completed: true 
  },
  { 
    id: '6', 
    name: 'Change the kitchen tiles', 
    status: 'not-started', 
    category: 'personal', 
    dueDate: '2024-11-22', 
    completed: false 
  },
];

let progressData = {
  day: 75,
  week: 83,
  month: 91,
  quarter: 77,
  year: 65,
  life: 5
};

// Utility functions
function generateId() {
  return Date.now().toString();
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

function getDaysLeft(dueDateString) {
  const dueDate = new Date(dueDateString);
  const today = new Date();
  
  // Reset time part to get accurate day difference
  dueDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const differenceMs = dueDate - today;
  return Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
}

function getDaysOfWeek() {
  return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
}

function updateLocalStorage() {
  localStorage.setItem('habits', JSON.stringify(habits));
  localStorage.setItem('notes', JSON.stringify(notes));
  localStorage.setItem('priorities', JSON.stringify(priorities));
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('progressData', JSON.stringify(progressData));
}

function loadFromLocalStorage() {
  const storedHabits = localStorage.getItem('habits');
  const storedNotes = localStorage.getItem('notes');
  const storedPriorities = localStorage.getItem('priorities');
  const storedTasks = localStorage.getItem('tasks');
  const storedProgressData = localStorage.getItem('progressData');
  
  if (storedHabits) habits = JSON.parse(storedHabits);
  if (storedNotes) notes = JSON.parse(storedNotes);
  if (storedPriorities) priorities = JSON.parse(storedPriorities);
  if (storedTasks) tasks = JSON.parse(storedTasks);
  if (storedProgressData) progressData = JSON.parse(storedProgressData);
}

// Calculate progress based on habits completed
function calculateProgress() {
  if (habits.length === 0) return;

  const totalDays = habits.length * 7;
  const completedDays = habits.reduce((total, habit) => {
    return total + habit.days.filter(Boolean).length;
  }, 0);
  
  const dayPercentage = Math.round((completedDays / totalDays) * 100);
  
  // For demonstration purposes, we're just updating the day percentage
  progressData.day = dayPercentage;
  
  // Update progress bars in the UI
  updateProgressBars();
  
  // Save to localStorage
  updateLocalStorage();
}

// Render functions
function renderHabits() {
  habitsList.innerHTML = '';
  
  habits.forEach(habit => {
    const row = document.createElement('tr');
    
    // Add habit name cell
    const nameCell = document.createElement('td');
    nameCell.textContent = habit.name;
    nameCell.className = 'habit-name';
    row.appendChild(nameCell);
    
    // Add habit checkboxes for each day
    habit.days.forEach((checked, dayIndex) => {
      const dayCell = document.createElement('td');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'checkbox-custom';
      checkbox.checked = checked;
      checkbox.addEventListener('change', () => {
        toggleHabitDay(habit.id, dayIndex);
      });
      
      dayCell.appendChild(checkbox);
      row.appendChild(dayCell);
    });
    
    habitsList.appendChild(row);
  });
}

function renderNotes() {
  notesList.innerHTML = '';
  
  notes.forEach(note => {
    const li = document.createElement('li');
    
    li.textContent = note.text;
    
    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', () => {
      deleteNote(note.id);
    });
    
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });
}

function renderPriorities() {
  prioritiesList.innerHTML = '';
  
  priorities.forEach(priority => {
    const li = document.createElement('li');
    
    const checklistItem = document.createElement('div');
    checklistItem.className = 'checklist-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = priority.completed;
    checkbox.addEventListener('change', () => {
      togglePriority(priority.id);
    });
    
    const label = document.createElement('span');
    label.className = priority.completed ? 'priority-label completed' : 'priority-label';
    label.textContent = priority.text;
    
    checklistItem.appendChild(checkbox);
    checklistItem.appendChild(label);
    
    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', () => {
      deletePriority(priority.id);
    });
    
    li.appendChild(checklistItem);
    li.appendChild(deleteBtn);
    prioritiesList.appendChild(li);
  });
}

function renderTasks() {
  tasksList.innerHTML = '';
  
  tasks.forEach(task => {
    const row = document.createElement('tr');
    
    // Task name with checkbox
    const nameCell = document.createElement('td');
    const nameWrapper = document.createElement('div');
    nameWrapper.className = 'task-name' + (task.completed ? ' completed' : '');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      toggleTaskCompletion(task.id);
    });
    
    nameWrapper.appendChild(checkbox);
    nameWrapper.appendChild(document.createTextNode(task.name));
    nameCell.appendChild(nameWrapper);
    row.appendChild(nameCell);
    
    // Status badge
    const statusCell = document.createElement('td');
    const statusBadge = document.createElement('span');
    statusBadge.className = `status-badge ${task.status}`;
    statusBadge.textContent = getStatusLabel(task.status);
    statusCell.appendChild(statusBadge);
    row.appendChild(statusCell);
    
    // Category
    const categoryCell = document.createElement('td');
    categoryCell.className = `category-${task.category}`;
    categoryCell.textContent = getCategoryLabel(task.category);
    row.appendChild(categoryCell);
    
    // Due date
    const dueDateCell = document.createElement('td');
    dueDateCell.textContent = formatDate(task.dueDate);
    row.appendChild(dueDateCell);
    
    // Time left
    const timeLeftCell = document.createElement('td');
    timeLeftCell.textContent = getDaysLeft(task.dueDate) + ' days';
    row.appendChild(timeLeftCell);
    
    tasksList.appendChild(row);
  });
}

function updateProgressBars() {
  // Update progress values
  dayProgressElement.style.width = `${progressData.day}%`;
  weekProgressElement.style.width = `${progressData.week}%`;
  monthProgressElement.style.width = `${progressData.month}%`;
  quarterProgressElement.style.width = `${progressData.quarter}%`;
  yearProgressElement.style.width = `${progressData.year}%`;
  lifeProgressElement.style.width = `${progressData.life}%`;
  
  // Update percentage texts
  dayPercentElement.textContent = `${progressData.day}%`;
  weekPercentElement.textContent = `${progressData.week}%`;
  monthPercentElement.textContent = `${progressData.month}%`;
  quarterPercentElement.textContent = `${progressData.quarter}%`;
  yearPercentElement.textContent = `${progressData.year}%`;
  lifePercentElement.textContent = `${progressData.life}%`;
}

// Action functions
function addHabit() {
  const habitName = newHabitInput.value.trim();
  if (habitName === '') return;
  
  const newHabit = {
    id: generateId(),
    name: habitName,
    days: Array(7).fill(false),
  };
  
  habits.push(newHabit);
  newHabitInput.value = '';
  
  renderHabits();
  updateLocalStorage();
}

function toggleHabitDay(habitId, dayIndex) {
  habits = habits.map(habit => {
    if (habit.id === habitId) {
      const newDays = [...habit.days];
      newDays[dayIndex] = !newDays[dayIndex];
      return { ...habit, days: newDays };
    }
    return habit;
  });
  
  calculateProgress();
  renderHabits();
}

function addNote() {
  const noteText = newNoteInput.value.trim();
  if (noteText === '') return;
  
  const newNote = {
    id: generateId(),
    text: noteText,
  };
  
  notes.push(newNote);
  newNoteInput.value = '';
  
  renderNotes();
  updateLocalStorage();
}

function deleteNote(noteId) {
  notes = notes.filter(note => note.id !== noteId);
  
  renderNotes();
  updateLocalStorage();
}

function addPriority() {
  const priorityText = newPriorityInput.value.trim();
  if (priorityText === '') return;
  
  const newPriority = {
    id: generateId(),
    text: priorityText,
    completed: false,
  };
  
  priorities.push(newPriority);
  newPriorityInput.value = '';
  
  renderPriorities();
  updateLocalStorage();
}

function togglePriority(priorityId) {
  priorities = priorities.map(priority => {
    if (priority.id === priorityId) {
      return { ...priority, completed: !priority.completed };
    }
    return priority;
  });
  
  renderPriorities();
  updateLocalStorage();
}

function deletePriority(priorityId) {
  priorities = priorities.filter(priority => priority.id !== priorityId);
  
  renderPriorities();
  updateLocalStorage();
}

function addTask() {
  const taskName = taskNameInput.value.trim();
  if (taskName === '') return;
  
  const newTask = {
    id: generateId(),
    name: taskName,
    status: taskStatusSelect.value,
    category: taskCategorySelect.value,
    dueDate: taskDueDateInput.value,
    completed: taskStatusSelect.value === 'done',
  };
  
  tasks.push(newTask);
  
  // Reset form
  taskNameInput.value = '';
  taskStatusSelect.value = 'not-started';
  taskCategorySelect.value = 'personal';
  taskDueDateInput.value = '';
  
  // Close modal
  taskModal.style.display = 'none';
  
  renderTasks();
  updateLocalStorage();
}

function toggleTaskCompletion(taskId) {
  tasks = tasks.map(task => {
    if (task.id === taskId) {
      const completed = !task.completed;
      const status = completed ? 'done' : 'not-started';
      return { ...task, completed, status };
    }
    return task;
  });
  
  renderTasks();
  updateLocalStorage();
}

function getStatusLabel(status) {
  switch (status) {
    case 'not-started':
      return 'Not started';
    case 'in-progress':
      return 'In progress';
    case 'done':
      return 'Done';
    default:
      return '';
  }
}

function getCategoryLabel(category) {
  switch (category) {
    case 'personal':
      return 'Personal';
    case 'work-school':
      return 'Work/School';
    case 'health-wellness':
      return 'Health & Wellness';
    default:
      return '';
  }
}
//to add the clock face
const clockFaces = document.getElementById('clock-face');
    for (let i = 1; i <= 12; i++) {
      const angle = (i-3) * 30 * (Math.PI / 180); // Rotate -90 degrees to start from top
      const radius = 65;
      const x = 72 + radius * Math.cos(angle); // 72 is centerX
      const y = 73 + radius * Math.sin(angle); // 73 is centerY

      const number = document.createElement('div');
      number.className = 'number';
      number.style.left = `${x}px`;
      number.style.top = `${y}px`;
      number.textContent = i;
      clockFaces.appendChild(number);
    }
//function to update the clock
 function updateClock() {
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      const secondDeg = seconds * 6;
      const minuteDeg = minutes * 6 + seconds * 0.1;
      const hourDeg = (hours % 12) * 30 + minutes * 0.5;

      document.getElementById('second-hand').style.transform = `rotate(${secondDeg}deg)`;
      document.getElementById('minute-hand').style.transform = `rotate(${minuteDeg}deg)`;
      document.getElementById('hour-hand').style.transform = `rotate(${hourDeg}deg)`;

      const digitalTime = now.toLocaleTimeString();
      document.getElementById('digital-time').textContent = digitalTime;
    }

    setInterval(updateClock, 1000);
    updateClock(); // Initial call
// Initialize the application
function init() {
  // Load data from localStorage
  loadFromLocalStorage();
  
  // Setup default date for task form
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  taskDueDateInput.value = formattedDate;
  
  // Add event listeners
  addHabitBtn.addEventListener('click', addHabit);
  newHabitInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addHabit();
  });
  
  addNoteBtn.addEventListener('click', addNote);
  newNoteInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNote();
  });
  
  addPriorityBtn.addEventListener('click', addPriority);
  newPriorityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addPriority();
  });
  
  addTaskBtn.addEventListener('click', () => {
    taskModal.style.display = 'block';
  });
  
  closeModal.addEventListener('click', () => {
    taskModal.style.display = 'none';
  });
  
  window.addEventListener('click', (e) => {
    if (e.target === taskModal) {
      taskModal.style.display = 'none';
    }
  });
  
  saveTaskBtn.addEventListener('click', addTask);
  
  // Create clock hour markers
  createClockMarkers();
  
  // Start the clock
  updateClock();
  setInterval(updateClock, 1000);
  
  // Render all components
  renderHabits();
  renderNotes();
  renderPriorities();
  renderTasks();
  updateProgressBars();
}

// Start the application
init();
