# 🌐 Internet-in-a-Box - Offline Knowledge System# React + Vite



![Version](https://img.shields.io/badge/version-1.0.0-green)This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

![License](https://img.shields.io/badge/license-MIT-blue)

![React](https://img.shields.io/badge/React-19.1.1-61dafb)Currently, two official plugins are available:

![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.14-38bdf8)

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

## 📋 Overview- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



**Internet-in-a-Box** is a lightweight, offline-accessible knowledge system designed to replicate essential aspects of the internet experience without requiring an active connection. Perfect for areas with limited connectivity, educational institutions, disaster preparedness, or anyone who wants a personal offline knowledge hub.## React Compiler



## ✨ FeaturesThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).



### 🎯 Core Functionality## Expanding the ESLint configuration

- **🗂️ Directory Selection**: Choose where to store all your offline content

- **👤 User Onboarding**: Personalized setup with interests and preferencesIf you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

- **📚 Content Library**: Browse PDFs, Wikipedia dumps, documentation, courses, and tools
- **🔍 Smart Search**: Filter and search through available content
- **⬇️ Download Management**: Track downloaded vs. available content
- **⭐ Personalized Recommendations**: Content suggestions based on your interests

### 🎨 Design
- **Terminal-Style Theme**: Black background with neon green accents
- **Glowing Effects**: Beautiful neon animations and hover effects
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Loading Animation**: ASCII art loading screen with progress bar
- **Clean UI**: Organized categories and intuitive navigation

### 💾 Data Management
- **Local Storage**: User preferences saved in browser localStorage
- **File System Integration**: Uses File System Access API for directory management
- **Session Tracking**: `.second` file tracks first vs. returning sessions
- **User Profiles**: JSON-based profile storage

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- Modern browser with File System Access API support (Chrome, Edge, Opera)
- A Raspberry Pi (for deployment) or any computer for development

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Internet-In-Box
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

### Building for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

## 🎮 Usage Guide

### First Time Setup

1. **Loading Screen**
   - Wait for the system to initialize (auto-completes in a few seconds)

2. **Select Storage Directory**
   - Click "Select Storage Directory"
   - Choose a folder with sufficient space
   - Recommended: External drive or dedicated folder

3. **Complete Onboarding**
   - **Step 1**: Enter your name, institution, and branch/grade
   - **Step 2**: Select your interests (multiple selections allowed)
   - **Step 3**: Choose your primary purpose for using the system

4. **Dashboard Access**
   - Browse content by category
   - Search for specific topics
   - Download content to your selected directory

### Returning Users

- System automatically detects existing setup
- Directly loads to dashboard
- All preferences and downloads are preserved

### Managing Content

- **Filter by Category**: Click category buttons (PDFs, Wikipedia, Docs, etc.)
- **Search**: Use the search bar to find specific content
- **Download**: Click "Download" button on any content card
- **Remove**: Click "Remove" on downloaded content to free up space

## 📁 Project Structure

```
Internet-In-Box/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── LoadingScreen.jsx    # Initial loading animation
│   │   ├── DirectorySelector.jsx # Directory selection UI
│   │   ├── OnboardingForm.jsx   # User setup form
│   │   └── Dashboard.jsx        # Main content dashboard
│   ├── App.jsx          # Main app orchestration
│   ├── App.css          # App-specific styles
│   ├── index.css        # Global styles & theme
│   └── main.jsx         # App entry point
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## 🎨 Customization

### Adding New Content

Edit the `contentItems` array in `src/components/Dashboard.jsx`:

```javascript
{
  id: 15,
  title: 'Your Content Title',
  category: 'pdf', // or 'wiki', 'docs', 'courses', 'tools'
  type: 'Content Type',
  size: '10 MB',
  downloaded: false,
  url: '#' // or actual download URL
}
```

### Modifying Categories

Add new categories in the `categories` array in `Dashboard.jsx`:

```javascript
{ id: 'newcat', name: 'New Category', icon: '🆕' }
```

### Changing Theme Colors

Modify colors in `src/index.css`:

```css
/* Change neon green to another color */
color: #00ff00; /* Change this hex value */
```

## 🍓 Raspberry Pi Deployment

### Setup Steps

1. **Install Node.js on Raspberry Pi**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Transfer project to Pi**
   ```bash
   scp -r Internet-In-Box/ pi@raspberrypi.local:~/
   ```

3. **Build and serve**
   ```bash
   cd Internet-In-Box
   npm install
   npm run build
   npm install -g serve
   serve -s dist -l 80
   ```

4. **Access from local network**
   - Find Pi's IP: `hostname -I`
   - Access from any device: `http://<raspberry-pi-ip>`

### Auto-start on Boot

Create a systemd service:

```bash
sudo nano /etc/systemd/system/internet-in-box.service
```

Add:
```ini
[Unit]
Description=Internet-in-a-Box
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/Internet-In-Box
ExecStart=/usr/bin/serve -s dist -l 80
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable internet-in-box
sudo systemctl start internet-in-box
```

## 🛠️ Technologies Used

- **React 19.1.1** - UI framework
- **Vite 7.1.7** - Build tool
- **TailwindCSS 4.1.14** - Styling
- **File System Access API** - Directory management
- **LocalStorage** - User data persistence

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🎯 Roadmap

- [ ] Actual download functionality with progress tracking
- [ ] Offline Wikipedia reader integration
- [ ] PDF viewer component
- [ ] Background sync when connectivity returns
- [ ] Content compression
- [ ] Export/import settings
- [ ] Multi-language support
- [ ] Dark/Light theme toggle (with neon variants)
- [ ] Mobile app version
- [ ] Peer-to-peer content sharing

## 💡 Use Cases

- **🏫 Educational Institutions**: Provide students access to learning materials
- **🌍 Rural Areas**: Bridge the digital divide in areas with poor connectivity
- **🚨 Emergency Preparedness**: Access critical information during disasters
- **✈️ Travel**: Carry your knowledge library anywhere
- **🏥 Healthcare**: Medical references in remote clinics
- **📚 Libraries**: Community knowledge hubs

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Made with 💚 for a more accessible digital world
