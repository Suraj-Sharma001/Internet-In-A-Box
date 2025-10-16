# 🎨 Theme System Guide

## How the Dynamic Theme System Works

### Theme Selection
Click the theme button in the navbar (shows current theme icon and name) to open a dropdown with all available themes.

### Available Themes

#### ☀️ Light Theme (Default)
- **Best for**: Daytime use, well-lit environments
- **Colors**: Bright backgrounds, dark text
- **Mood**: Clean, professional, energetic

#### 🌙 Dark Theme
- **Best for**: Night-time browsing, low-light environments
- **Colors**: Dark backgrounds, light text
- **Mood**: Easy on the eyes, modern, sleek

#### 🌊 Ocean Theme
- **Best for**: Calm, focused work sessions
- **Colors**: Deep blues, cyan accents
- **Mood**: Peaceful, professional, ocean-inspired

#### 🌅 Sunset Theme
- **Best for**: Creative work, warm atmosphere
- **Colors**: Orange, red, warm gradients
- **Mood**: Energetic, warm, inspiring

#### 🌲 Forest Theme
- **Best for**: Long reading sessions, nature lovers
- **Colors**: Deep greens, natural tones
- **Mood**: Calming, natural, refreshing

## Technical Details

### How Themes Are Applied

1. **User clicks theme button** → Opens dropdown
2. **User selects a theme** → ThemeContext updates
3. **CSS variables are updated** → All colors change instantly
4. **Theme saved to localStorage** → Persists across sessions
5. **Smooth transitions** → All color changes animate

### CSS Variables Updated

Each theme updates these CSS custom properties:
- `--bg` - Main background
- `--bg-light` - Lighter background variant
- `--bg-card` - Card backgrounds
- `--text` - Primary text color
- `--text-light` - Secondary text color
- `--muted` - Muted/disabled text
- `--primary` - Primary accent color
- `--primary-dark` - Darker primary variant
- `--accent` - Secondary accent color
- `--success` - Success state color
- `--danger` - Error/warning color
- `--border` - Border colors
- `--shadow` - Shadow colors
- `--gradient` - Background gradient

### Performance

- ⚡ **Instant switching** - No page reload required
- 🎨 **Smooth transitions** - 0.3s ease transitions on all colors
- 💾 **Persistent** - Saved in localStorage
- 🚀 **Lightweight** - Pure CSS variables, no external dependencies

## Adding Custom Themes

Want to add your own theme? Edit `src/contexts/ThemeContext.jsx`:

```javascript
export const themes = {
  // ...existing themes
  
  myTheme: {
    name: 'My Theme',
    icon: '🎨',
    bg: '#your-color',
    bgLight: '#your-color',
    bgCard: '#your-color',
    text: '#your-color',
    textLight: '#your-color',
    muted: '#your-color',
    primary: '#your-color',
    primaryDark: '#your-color',
    accent: '#your-color',
    success: '#your-color',
    danger: '#your-color',
    border: '#your-color',
    shadow: 'rgba(...)',
    gradient: 'linear-gradient(...)',
  }
}
```

## User Experience

### First Visit
1. App loads with Light theme (default)
2. User can immediately switch to preferred theme
3. Choice is saved for future visits

### Return Visits
1. App loads with previously selected theme
2. Theme persists across browser sessions
3. User can change theme anytime

### All Pages & Components
- Navbar adapts to theme
- Cards and modals use theme colors
- Buttons and interactive elements themed
- Text remains readable in all themes
- Shadows and borders adjust appropriately

## Accessibility

✅ All themes maintain proper contrast ratios
✅ Text remains readable in all color combinations
✅ Interactive elements clearly visible
✅ Focus states properly styled
✅ Color-blind friendly color choices

## Browser Support

- ✅ Chrome/Edge (full support)
- ✅ Firefox (full support)
- ✅ Safari (full support)
- ✅ All modern browsers with CSS custom properties support

---

**Tip**: Try switching themes to find your favorite! Each theme is designed to provide a unique atmosphere while maintaining full functionality.
