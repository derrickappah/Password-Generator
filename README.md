
🔐 Advanced Password Generator
A modern, feature-rich, and secure password generator built with pure HTML, CSS, and JavaScript. This web application provides a clean, responsive, and intuitive user interface for creating strong, customizable passwords. It features a tab-based navigation system for easy access to the generator, password history, and application settings.
Live Demo ✨ (Note: You would replace this with your actual deployment link)
✨ Features
 * Adjustable Password Length: Choose a password length from 4 to 64 characters using an intuitive slider.
 * Character Set Customization: Fine-tune your password by including or excluding:
   * Uppercase letters (A-Z)
   * Lowercase letters (a-z)
   * Numbers (0-9)
   * Symbols (!@#$%^&*)
 * Exclude Similar Characters: Option to avoid ambiguous characters like 0, O, l, I, and 1 to improve readability.
 * Real-time Strength Meter: A color-coded bar and text indicator provide immediate feedback on the strength of the generated password.
 * One-Click Copy: Easily copy the generated password to your clipboard.
 * Modern Tabbed Interface: The app is organized into three main sections for a seamless user experience:
   * Generate: The main password generation screen.
   * History: View a list of previously generated passwords with timestamps.
   * Settings: Configure character sets and application preferences.
 * Persistent History & Settings: All generated passwords and user settings are automatically saved to the browser's localStorage, so they persist between sessions.
 * Configurable Preferences:
   * Auto-Copy: Automatically copy the password to the clipboard upon generation.
   * Auto-Reveal: Briefly show the password in plain text after generation.
   * History Limit: Set the maximum number of passwords to store in the history (from 5 to 50).
 * Responsive Design: A mobile-first design that looks and works great on all screen sizes, from phones to desktops.
 * User Feedback: Toast notifications for actions like copying a password or clearing history.
🛠️ Tech Stack
This project is built with web fundamentals and requires no frameworks or complex build steps.
 * HTML5: For the core structure and content.
 * CSS3: For all custom styling, animations, and responsive design.
 * Tailwind CSS: Used via a CDN for rapid utility-first styling.
 * JavaScript (ES6+): For all application logic, including the class-based generator, DOM manipulation, and event handling.
🚀 Getting Started
To get a local copy up and running, follow these simple steps.
Prerequisites
You only need a modern web browser that supports HTML5, CSS3, and ES6 JavaScript (e.g., Chrome, Firefox, Safari, Edge).
Installation
 * Clone the repository:
   git clone https://github.com/your-username/password-generator.git

 * Navigate to the project directory:
   cd password-generator

 * Open the application:
   Simply open the index.html file in your favorite web browser. No web server or build process is needed.
📂 File Structure
The project is organized into three main files for a clear separation of concerns:
password-generator/
├── 📄 index.html      # The HTML file with the application's structure.
├── 🎨 style.css        # The CSS file for all custom styles and animations.
└── 💻 script.js        # The JavaScript file containing all the application logic.

 * index.html: Contains the semantic structure for all UI components, including the header, main content panels (Generate, History, Settings), and the bottom tab navigation.
 * style.css: Defines the visual appearance, including the color scheme for the strength meter, toast notifications, animations, and the active/inactive states for the tab navigation.
 * script.js: Houses the AdvancedPasswordGenerator class, which encapsulates the application's state and methods for generating passwords, updating the UI, handling user events, and interacting with localStorage.
⚖️ License
This project is licensed under the MIT License. See the LICENSE file for more details.
