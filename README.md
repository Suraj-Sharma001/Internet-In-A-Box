# Internet-in-a-Box 📦

A self-sufficient offline knowledge and utility hub built with React. Access essential resources, documentation, and learning materials even without an internet connection.

## ✨ Features

### 🎨 Dynamic Theme System
- **5 Beautiful Themes**: Light, Dark, Ocean, Sunset, and Forest
- **Instant Switching**: Click the theme button in the navbar to cycle through themes
- **Persistent Preferences**: Your theme choice is saved in localStorage
- **Smooth Transitions**: All theme changes animate smoothly

### 📁 Offline File Management
- **Directory Selection**: Choose where to store your offline resources
- **File System Access API**: Native browser integration (Chromium-based browsers)
- **Download Management**: Track downloaded vs available resources
- **Auto-detection**: Automatically detects existing files

### 🎯 Personalized Experience
- **Onboarding**: First-time setup asks about your interests
- **Smart Suggestions**: Resources tailored to your field of study
- **Persistent Profile**: Your preferences saved in `onboarding.json`

### 🌐 Resource Library
- **Demo Resources**: Wikipedia dumps, documentation, learning content
- **Preview Before Download**: View resources before saving
- **Progress Tracking**: Visual indicators for download status
- **Multiple Formats**: PDFs, web pages, and more

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Modern Chromium-based browser (Chrome, Edge, Brave)
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Usage

1. **Open the app** at http://localhost:5175 (or the port shown in terminal)
2. **Choose a theme** using the theme toggle button in the navbar
3. **Select a directory** by clicking "Choose Directory" in the navbar
4. **Complete onboarding** (first time only)
5. **Browse resources** and download what you need
6. **Preview resources** before downloading

## 🎨 Available Themes

| Theme | Icon | Description |
|-------|------|-------------|
| **Light** | ☀️ | Clean, bright theme for daytime use |
| **Dark** | 🌙 | Easy on the eyes for night-time browsing |
| **Ocean** | 🌊 | Cool blue tones inspired by the sea |
| **Sunset** | 🌅 | Warm orange/red gradient |
| **Forest** | 🌲 | Natural green tones |

## 🛠️ Technology Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **File System Access API** - Native file operations
- **CSS Variables** - Dynamic theming
- **Context API** - State management for themes
- **Local Storage** - Persistent user preferences

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Navigation bar with theme toggle
│   ├── ThemeToggle.jsx      # Theme selector dropdown
│   ├── Onboarding.jsx       # First-time user setup
│   ├── ResourceList.jsx     # Grid of available resources
│   ├── ResourceCard.jsx     # Individual resource display
│   └── DownloadButton.jsx   # Download state management
├── contexts/
│   └── ThemeContext.jsx     # Theme provider and logic
├── utils/
│   ├── fileSystem.jsx       # File operations helpers
│   └── data.jsx             # Demo resource data
├── App.jsx                  # Main application
├── App.css                  # Theme-aware styling
└── main.jsx                 # Entry point with providers
```

## 🌐 Browser Compatibility

| Feature | Chrome | Edge | Firefox | Safari |
|---------|--------|------|---------|--------|
| File System Access API | ✅ | ✅ | ❌ | ❌ |
| Themes | ✅ | ✅ | ✅ | ✅ |
| UI/UX | ✅ | ✅ | ✅ | ✅ |

**Note**: File download functionality requires a Chromium-based browser (Chrome, Edge, Brave, etc.). Other browsers can view the UI but won't be able to save files.

## 📝 Future Enhancements

- [ ] Custom theme builder
- [ ] Import/export theme configurations
- [ ] Offline search functionality
- [ ] Local network sharing via WebRTC
- [ ] Support for more resource types
- [ ] Backup/restore functionality

## 🤝 Contributing

Contributions are welcome! Feel free to add new themes, improve the UI/UX, or add more demo resources.

## 📄 License

MIT License - feel free to use this project for learning or building your own offline hub!

---

**Made with ❤️ for offline learners everywhere**
