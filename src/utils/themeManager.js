// Theme Manager - Light/Dark Theme Toggle

const THEME_KEY = 'autostocks_theme';

/**
 * Get current theme from localStorage or default to 'light'
 * @returns {string} 'light' or 'dark'
 */
function getTheme() {
    return localStorage.getItem(THEME_KEY) || 'light';
}

/**
 * Set theme and persist to localStorage
 * @param {string} theme - 'light' or 'dark'
 */
function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
}

/**
 * Apply theme to document
 * @param {string} theme - 'light' or 'dark'
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f0a1a' : '#f8fafc');
    }
}

/**
 * Toggle between light and dark theme
 * @returns {string} New theme
 */
function toggleTheme() {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    return newTheme;
}

/**
 * Initialize theme on page load
 */
function initTheme() {
    const theme = getTheme();
    applyTheme(theme);
}

/**
 * Render theme toggle button
 * @returns {string} HTML string
 */
function renderThemeToggle() {
    const theme = getTheme();
    const icon = theme === 'light' ? '🌙' : '☀️';
    const label = theme === 'light' ? 'Dark Mode' : 'Light Mode';

    return `
    <button class="theme-toggle" id="themeToggle" title="${label}">
      <span class="theme-icon">${icon}</span>
    </button>
  `;
}

export { getTheme, setTheme, toggleTheme, initTheme, renderThemeToggle };
