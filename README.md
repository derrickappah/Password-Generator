# 🔐 Advanced Password Generator

A modern, secure, and feature-packed password generator built with **pure HTML, CSS, and JavaScript**. This web app offers a clean, mobile-first interface for creating strong, customizable passwords with ease.

---

## 🚀 Live Demo

> **[Try It Here](https://derrickappah.github.io/Password-Generator/)**
>
> _Powered by GitHub Pages_

---

## ✨ Key Features

- **Customizable Password Length**  
  Select between 4 and 64 characters with an intuitive slider.

- **Character Options**  
  Include or exclude:
  - Uppercase (A–Z)
  - Lowercase (a–z)
  - Numbers (0–9)
  - Symbols (!@#$%^&*)

- **Exclude Ambiguous Characters**  
  Remove confusing characters like `0`, `O`, `l`, `I`, and `1`.

- **Real-Time Strength Meter**  
  Instantly see password strength with color-coded feedback and descriptions.

- **One-Click Copy**  
  Copy generated passwords to your clipboard with a single click.

- **Tabbed Navigation**  
  - **Generate:** Main password generator
  - **History:** View saved passwords
  - **Settings:** Customize app preferences

- **Persistent Data**  
  All history and settings are stored in your browser and survive page reloads.

- **Smart Preferences**  
  - Auto-copy on generation  
  - Briefly reveal new passwords  
  - Set history limit (5–50 entries)

- **Responsive & Accessible**  
  Designed for all devices and screen sizes.

- **Helpful Feedback**  
  Toast notifications for actions like copy, clear, and errors.

---

## 🛠️ Technology Stack

- **HTML5** – Structure and markup
- **CSS3** – Custom styles and responsive design
- **Tailwind CSS (CDN)** – Utility-first styling
- **JavaScript (ES6+)** – Core logic and interactivity

---

## 📦 Getting Started

### Requirements

Just open in any modern browser (Chrome, Firefox, Safari, Edge).

### Setup

```bash
# Clone this repository
git clone https://github.com/derrickappah/Password-Generator.git

# Go to the project folder
cd Password-Generator

# Launch
Open index.html in your browser
```

No build tools or server needed!

---

## 📁 File Overview

```
Password-Generator/
├── index.html      # Main HTML layout
├── style.css       # Custom styles
└── script.js       # App logic
```

- **index.html:** UI structure, tabs, and sections.
- **style.css:** Styles for strength meter, notifications, tab transitions, etc.
- **script.js:**  
  - `AdvancedPasswordGenerator` class  
  - Password logic  
  - Tab switching  
  - State persistence via localStorage  
  - Event listeners and DOM updates

---

## ⚖️ License

MIT License. See the [LICENSE](LICENSE) file for details.

---

## 💡 Future Improvements

Thinking of new features? Some ideas:

- Export password history (.txt or .csv)
- Dark mode toggle
- Voice feedback for accessibility
- Keyboard shortcuts

---

