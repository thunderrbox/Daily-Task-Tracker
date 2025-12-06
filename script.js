// ============================================
// RANA's Task Tracker - JavaScript
// ============================================

// State Management
let tasks = [];
let selectedPriority = "medium";
let selectedTime = null;
let currentFilter = "all";
let currentView = "time";

// Motivational Quotes
const motivationalQuotes = [
  "Great things never come from comfort zones!",
  "Success is the sum of small efforts repeated day in and day out.",
  "The secret of getting ahead is getting started.",
  "Don't watch the clock; do what it does. Keep going.",
  "Your only limit is you.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things take time.",
  "Dream it. Believe it. Build it.",
  "Strive for progress, not perfection.",
  "The future depends on what you do today.",
];

// Initialize Application
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
  createParticles();
});

// Initialize App
function initializeApp() {
  updateDate();
  loadTasks();
  renderTasks();
  updateStats();
  setRandomMotivation();

  // Auto-select time based on current hour
  const currentTime = getTimeOfDay();
  selectTime(currentTime);

  // Update date every minute
  setInterval(updateDate, 60000);

  // Change motivation every 30 seconds
  setInterval(setRandomMotivation, 30000);
}

// Create Floating Particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${5 + Math.random() * 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
    particlesContainer.appendChild(particle);
  }
}

// Update Current Date
function updateDate() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  document.getElementById("currentDate").textContent = now.toLocaleDateString(
    "en-US",
    options
  );
}

// Set Random Motivation
function setRandomMotivation() {
  const randomQuote =
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  const motivationElement = document.getElementById("motivationText");

  motivationElement.style.opacity = "0";
  setTimeout(() => {
    motivationElement.textContent = randomQuote;
    motivationElement.style.opacity = "1";
  }, 300);
}

// Get Time of Day
function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

// Select Priority
function selectPriority(priority) {
  selectedPriority = priority;

  // Update UI
  document.querySelectorAll(".priority-btn").forEach((btn) => {
    btn.classList.remove("priority-active");
  });
  document
    .querySelector(`[data-priority="${priority}"]`)
    .classList.add("priority-active");
}

// Select Time
function selectTime(time) {
  selectedTime = time;

  // Update UI
  document.querySelectorAll(".time-btn").forEach((btn) => {
    btn.classList.remove("time-active");
  });
  const timeBtn = document.querySelector(`[data-time="${time}"]`);
  if (timeBtn) {
    timeBtn.classList.add("time-active");
  }
}

// Handle Key Press
function handleKeyPress(event) {
  if (event.key === "Enter") {
    addTask();
  }
}

// Add Task
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") {
    showToast("Please enter a task!", "error");
    input.focus();
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    priority: selectedPriority,
    completed: false,
    timeOfDay: selectedTime || getTimeOfDay(),
    timestamp: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    createdAt: new Date().toISOString(),
  };

  tasks.unshift(task);
  input.value = "";

  saveTasks();
  renderTasks();
  updateStats();

  showToast("Task added successfully!", "success");

  // Add celebration effect
  celebrateTaskAdd();
}

// Toggle Task Completion
function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
    updateStats();

    if (task.completed) {
      showToast("Great job! Task completed! 🎉", "success");
      celebrateTaskComplete();
    }
  }
}

// Delete Task
function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    renderTasks();
    updateStats();
    showToast("Task deleted", "info");
  }
}

// Render Tasks
function renderTasks() {
  let filteredTasks = tasks;

  // Apply filter
  if (currentFilter === "active") {
    filteredTasks = tasks.filter((t) => !t.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter((t) => t.completed);
  }

  // Render based on view
  if (currentView === "time") {
    renderTimeView(filteredTasks);
  } else if (currentView === "priority") {
    renderPriorityView(filteredTasks);
  } else {
    renderListView(filteredTasks);
  }

  updateFilterBadges();
}

// Render Time View
function renderTimeView(taskList) {
  const morningTasks = taskList.filter((t) => t.timeOfDay === "morning");
  const afternoonTasks = taskList.filter((t) => t.timeOfDay === "afternoon");
  const eveningTasks = taskList.filter((t) => t.timeOfDay === "evening");

  renderTaskList("morningTasks", morningTasks, "morningCount");
  renderTaskList("afternoonTasks", afternoonTasks, "afternoonCount");
  renderTaskList("eveningTasks", eveningTasks, "eveningCount");
}

// Render Task List
function renderTaskList(containerId, taskList, countId) {
  const container = document.getElementById(containerId);
  const countElement = document.getElementById(countId);

  if (countElement) {
    countElement.textContent = taskList.length;
  }

  if (taskList.length === 0) {
    container.innerHTML = getEmptyState(containerId);
    return;
  }

  container.innerHTML = taskList.map((task) => createTaskHTML(task)).join("");
}

// Get Empty State HTML
function getEmptyState(containerId) {
  const emptyStates = {
    morningTasks: {
      icon: "☕",
      text: "No morning tasks yet",
      subtext: "Start your day right!",
    },
    afternoonTasks: {
      icon: "🚀",
      text: "No afternoon tasks yet",
      subtext: "Keep the momentum going!",
    },
    eveningTasks: {
      icon: "⭐",
      text: "No evening tasks yet",
      subtext: "Finish strong!",
    },
  };

  const state = emptyStates[containerId] || {
    icon: "📋",
    text: "No tasks",
    subtext: "Add a new task!",
  };

  return `
        <div class="empty-state">
            <div class="empty-illustration">${state.icon}</div>
            <p class="empty-text">${state.text}</p>
            <p class="empty-subtext">${state.subtext}</p>
        </div>
    `;
}

// Create Task HTML
function createTaskHTML(task) {
  return `
        <div class="task-item ${task.completed ? "completed" : ""}" data-id="${
    task.id
  }">
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${task.completed ? "checked" : ""} 
                onchange="toggleTask(${task.id})"
            />
            <div class="task-content">
                <div class="task-text">${escapeHtml(task.text)}</div>
                <div class="task-meta">
                    ${task.timestamp}
                </div>
            </div>
            <span class="priority-badge priority-${task.priority}">
                ${task.priority}
            </span>
            <button class="btn-delete" onclick="deleteTask(${task.id})">
                Delete
            </button>
        </div>
    `;
}

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Update Statistics
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  document.getElementById("totalTasks").textContent = total;
  document.getElementById("completedTasks").textContent = completed;
  document.getElementById("pendingTasks").textContent = pending;

  // Animate numbers
  animateValue("totalTasks", 0, total, 500);
  animateValue("completedTasks", 0, completed, 500);
  animateValue("pendingTasks", 0, pending, 500);
}

// Animate Value
function animateValue(id, start, end, duration) {
  const element = document.getElementById(id);
  if (!element) return;

  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (
      (increment > 0 && current >= end) ||
      (increment < 0 && current <= end)
    ) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.round(current);
  }, 16);
}

// Update Filter Badges
function updateFilterBadges() {
  const all = tasks.length;
  const active = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  document.getElementById("filterAll").textContent = all;
  document.getElementById("filterActive").textContent = active;
  document.getElementById("filterCompleted").textContent = completed;
}

// Filter Tasks
function filterTasks(filter) {
  currentFilter = filter;

  // Update UI
  document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  event.target.closest(".filter-tab").classList.add("active");

  renderTasks();
}

// Change View
function changeView(view) {
  currentView = view;

  // Update UI
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.closest(".view-btn").classList.add("active");

  renderTasks();
}

// Toggle Section
function toggleSection(section) {
  const taskList = document.getElementById(`${section}Tasks`);
  const button = event.target.closest(".section-collapse");

  taskList.classList.toggle("collapsed");
  button.classList.toggle("collapsed");
}

// Clear Completed Tasks
function clearCompleted() {
  const completedCount = tasks.filter((t) => t.completed).length;

  if (completedCount === 0) {
    showToast("No completed tasks to clear", "info");
    return;
  }

  if (
    confirm(
      `Are you sure you want to clear ${completedCount} completed task(s)?`
    )
  ) {
    tasks = tasks.filter((t) => !t.completed);
    saveTasks();
    renderTasks();
    updateStats();
    showToast(`Cleared ${completedCount} completed task(s)`, "success");
  }
}

// Export Tasks
function exportTasks() {
  if (tasks.length === 0) {
    showToast("No tasks to export", "info");
    return;
  }

  const exportData = {
    exportDate: new Date().toISOString(),
    totalTasks: tasks.length,
    completedTasks: tasks.filter((t) => t.completed).length,
    tasks: tasks,
  };

  const dataStr = JSON.stringify(exportData, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `tasks_${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast("Tasks exported successfully!", "success");
}

// Reset Day
function resetDay() {
  if (tasks.length === 0) {
    showToast("No tasks to reset", "info");
    return;
  }

  if (
    confirm(
      "Are you sure you want to reset all tasks? This action cannot be undone."
    )
  ) {
    tasks = [];
    saveTasks();
    renderTasks();
    updateStats();
    showToast("All tasks have been reset", "success");
  }
}

// Quick Add Toggle
function toggleQuickAdd() {
  const input = document.getElementById("taskInput");
  input.focus();
  showToast(
    "Quick add mode activated! Press Enter to add tasks quickly.",
    "info"
  );
}

// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  showToast("Theme toggle coming soon!", "info");
}

// Save Tasks to LocalStorage
function saveTasks() {
  localStorage.setItem("rana_tasks", JSON.stringify(tasks));
}

// Load Tasks from LocalStorage
function loadTasks() {
  const saved = localStorage.getItem("rana_tasks");
  if (saved) {
    tasks = JSON.parse(saved);
  }
}

// Show Toast Notification
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const toastMessage = toast.querySelector(".toast-message");

  toastMessage.textContent = message;

  // Update toast style based on type
  if (type === "error") {
    toast.style.background = "rgba(239, 68, 68, 0.95)";
  } else if (type === "info") {
    toast.style.background = "rgba(59, 130, 246, 0.95)";
  } else {
    toast.style.background = "rgba(16, 185, 129, 0.95)";
  }

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Celebrate Task Add
function celebrateTaskAdd() {
  // Add a subtle animation effect
  const input = document.getElementById("taskInput");
  input.style.transform = "scale(1.05)";
  setTimeout(() => {
    input.style.transform = "scale(1)";
  }, 200);
}

// Celebrate Task Complete
function celebrateTaskComplete() {
  // Create confetti effect (simplified)
  const colors = ["#667eea", "#764ba2", "#f093fb", "#f5576c"];
  for (let i = 0; i < 10; i++) {
    createConfetti(colors[Math.floor(Math.random() * colors.length)]);
  }
}

// Create Confetti
function createConfetti(color) {
  const confetti = document.createElement("div");
  confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${color};
        top: 50%;
        left: 50%;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: confettiFall 1s ease-out forwards;
    `;

  const randomX = (Math.random() - 0.5) * 200;
  const randomY = (Math.random() - 0.5) * 200;

  confetti.style.setProperty("--x", `${randomX}px`);
  confetti.style.setProperty("--y", `${randomY}px`);

  document.body.appendChild(confetti);

  setTimeout(() => {
    confetti.remove();
  }, 1000);
}

// Add confetti animation to CSS dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translate(var(--x), var(--y)) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes particleFloat {
        0% { transform: translateY(0) translateX(0); opacity: 0.3; }
        50% { transform: translateY(-100vh) translateX(50px); opacity: 0.6; }
        100% { transform: translateY(-200vh) translateX(-30px); opacity: 0; }
    }
`;
document.head.appendChild(style);
