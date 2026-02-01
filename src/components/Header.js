// Header Component

import { getTheme, renderThemeToggle } from '../utils/themeManager.js';

/**
 * Render the header/navigation for app pages (not landing)
 * @param {string} activePage - Current active page
 * @returns {string} HTML string
 */
export function renderHeader(activePage = 'home') {
  return `
    <header class="header">
      <div class="container header-content">
        <a href="#/akses" class="logo" data-page="home">
          <div class="logo-icon">📈</div>
          <span>AutoStocks AI</span>
        </a>
        
        <nav class="nav">
          <a href="#/akses" class="nav-link ${activePage === 'home' ? 'active' : ''}" data-page="home">
            Home
          </a>

          <a href="#/akses/tutorial" class="nav-link ${activePage === 'tutorial' ? 'active' : ''}" data-page="tutorial">
            Tutorial
          </a>
          ${renderThemeToggle()}
        </nav>
      </div>
    </header>
  `;
}
