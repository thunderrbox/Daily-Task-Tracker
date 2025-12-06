# Daily-Task-Tracker

## 🚀 Overview
Welcome to the **Daily-Task-Tracker**! This project is a visually appealing and functional task manager designed to help you stay organized and motivated throughout your day. With its engaging animated background and motivational quotes, it's perfect for anyone looking to boost their productivity.

### Key Features
- **Animated Background**: A dynamic background with floating shapes and particles to keep your workspace lively.
- **Motivational Quotes**: Randomly displayed motivational quotes to keep you inspired.
- **Task Management**: Easily manage your daily tasks with a clean and intuitive interface.

### Who This Project Is For
- Students
- Professionals
- Anyone looking to stay organized and motivated

## ✨ Features
- 🌈 **Animated Background**: Adds a touch of creativity to your workspace.
- 💡 **Motivational Quotes**: Keeps you inspired and motivated.
- 📊 **Task Management**: Easily track and manage your daily tasks.

## 🛠️ Tech Stack
- **Programming Language**: CSS
- **Frameworks, Libraries, and Tools**: HTML, JavaScript

## 📦 Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of HTML, CSS, and JavaScript

### Quick Start
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/Daily-Task-Tracker.git
    cd Daily-Task-Tracker
    ```

2. Open the `index.html` file in your browser.

### Alternative Installation Methods
- You can also download the repository as a ZIP file and extract it to your local machine.

## 🎯 Usage

### Basic Usage
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RANA's Daily Task Tracker</title>
    <link rel="stylesheet" href="style.css" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  </head>
  <body>
    <!-- Animated Background -->
    <div class="background-wrapper">
      <div class="gradient-bg"></div>
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
        <div class="shape shape-6"></div>
      </div>
      <div class="particles" id="particles"></div>
    </div>

    <!-- Main Container -->
    <div class="container">
      <!-- Header Section with Animation -->
      <header class="app-header">
        <div class="header-content">
          <div class="header-icon">
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="28" fill="url(#headerGradient)" opacity="0.2" />
              <path d="M30 10 L35 20 L45 22 L37.5 30 L40 40 L30 35 L20 40 L22.5 30 L15 22 L25 20 Z" fill="url(#headerGradient)" />
              <defs>
                <lineargradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" class="gradient-stop-1" />
                  <stop offset="100%" class="gradient-stop-2" />
                </lineargradient>
              </defs>
            </svg>
          </div>
          <div class="header-text">
            <h1 class="main-title">My Daily Tasks</h1>
            <p class="subtitle" id="currentDate"></p>
          </div>
          <div class="theme-toggle" onclick="toggleTheme()" title="Toggle Theme">
            <div class="theme-icon">🌙</div>
          </div>
        </div>

        <!-- Motivational Quote -->
        <div class="motivation-banner">
          <span class="quote-icon">💡</span>
          <p class="motivation-text" id="motivationText">
            Great things never come from comfort zones!
          </p>
        </div>
      </header>

      <!-- Statistics Dashboard -->
      <section class="stats-dashboard">
        <div class="stat-card stat-card-total">
          <div class="stat-icon">📊</div>
          <div class="stat-content">
            <div class="stat-number" id="totalTasks">0</div>
            <div class="stat-label">Total Tasks</div>
          </div>
        </div>
      </section>
    </div>
  </body>
</html>
```

### Advanced Usage
- Customize the CSS variables in `style.css` to change the theme and colors.
- Add more tasks and manage them using the JavaScript functions in `script.js`.

## 📁 Project Structure
```
Daily-Task-Tracker/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🔧 Configuration
- **CSS Variables**: Customize the colors and gradients in the `:root` section of `style.css`.

## 🤝 Contributing
We welcome contributions! Here's how you can get started:

### Development Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/Daily-Task-Tracker.git
    cd Daily-Task-Tracker
    ```

2. Open the project in your favorite code editor.

### Code Style Guidelines
- Follow the existing code style.
- Use meaningful variable names and comments.

### Pull Request Process
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your branch to your fork.
5. Open a pull request.

## 👥 Authors & Contributors
- **RANA** - Initial work
- **Abhijeet Singh Rana** - Contributions

## 🗺️ Roadmap
- **Planned Features**:
  - Add task priority levels.
  - Implement task deadlines.
  - Improve the UI/UX with more animations and transitions.

- **Known Issues**:
  - None at the moment.

- **Future Improvements**:
  - Add a dark mode theme.
  - Integrate with a backend for persistent task storage.

---

**Badges:**
[![Build Status](https://travis-ci.org/yourusername/Daily-Task-Tracker.svg?branch=main)](https://travis-ci.org/yourusername/Daily-Task-Tracker)

---

Thank you for your interest in the **Daily-Task-Tracker**! We hope you find it useful and inspiring. Happy task managing! 🚀
