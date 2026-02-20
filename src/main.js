// AutoStocks AI - Main Application Entry Point

import './styles/index.css';
import './styles/landing.css';
import './styles/lpb.css';
import { stocksData } from './data/mockStocks.js';
import { getStocksData, clearCache } from './services/yahooFinance.js';
import { fetchStockNews } from './services/newsService.js';
import { generateCompleteSignal } from './utils/signalGenerator.js';
import { initTheme, toggleTheme, getTheme } from './utils/themeManager.js';
import { renderHeader } from './components/Header.js';
import { renderStockGrid } from './components/StockCard.js';
import { renderFilterPanel, applyFilters } from './components/FilterPanel.js';
import { renderHowToReadPage } from './pages/HowToReadPage.js';
import { renderStockDetailPage, calculateScoreProfile } from './pages/StockDetailPage.js';
import { renderLandingPage, attachLandingEventListeners } from './pages/LandingPage.js';
import { renderLandingPageB, attachLandingPageBListeners } from './pages/LandingPageB.js';
import { initPixel, trackEvent } from './utils/metaPixel.js';

// Initialize theme on load
initPixel();
initTheme();

/**
 * Load and render news for a stock
 */
async function loadNewsForStock(ticker, name) {
  const newsListEl = document.getElementById('newsList');
  if (!newsListEl) return;

  try {
    const news = await fetchStockNews(ticker, name);

    if (news && news.length > 0) {
      newsListEl.innerHTML = news.map(item => `
        <a href="${item.link}" target="_blank" rel="noopener" class="news-item">
          <div class="news-content">
            <span class="news-title">${item.title}</span>
            <span class="news-source">${item.source}</span>
          </div>
          <span class="news-time">${item.pubDate}</span>
        </a>
      `).join('');
    } else {
      newsListEl.innerHTML = `
        <div class="news-empty">
          <span>📭 Tidak ada berita terbaru</span>
        </div>
      `;
    }
  } catch (error) {
    console.error('Failed to load news:', error);
    newsListEl.innerHTML = `
      <div class="news-error">
        <span>⚠️ Gagal memuat berita</span>
      </div>
    `;
  }
}

// App State
let currentPage = 'landing'; // Default to landing page
let selectedStock = null;
let filters = {
  signalFilter: 'all',
  strategyFilter: 'all',
  foreignOnly: false,
  sortBy: 'accumulation'
};

let stocksWithSignals = [];
let isLoading = true;
let lastUpdated = null;
let dataSource = 'loading';

/**
 * Parse current route from hash
 */
function parseRoute() {
  const hash = window.location.hash || '#/';

  // Check pathname for /lp and /lpb (server-side rewrite support)
  if (window.location.pathname === '/lp') {
    return { page: 'landing-dark' };
  }
  if (window.location.pathname === '/lpb') {
    return { page: 'landing-b' };
  }

  // Check hash
  if (hash === '#/akses/tutorial') {
    return { page: 'tutorial' };
  } else if (hash.startsWith('#/akses/')) {
    const ticker = hash.replace('#/akses/', '');
    return { page: 'stock-detail', ticker };
  } else if (hash === '#/akses' || hash === '#/akses/') {
    return { page: 'home' };
  } else if (hash === '#/lp') {
    return { page: 'landing-dark' };
  } else if (hash === '#/lpb') {
    return { page: 'landing-b' };
  } else {
    return { page: 'landing' };
  }
}

/**
 * Navigate to a route
 */
function navigateTo(page, params = {}) {
  if (page === 'landing') {
    window.location.hash = '#/';
  } else if (page === 'home') {
    window.location.hash = '#/akses';
  } else if (page === 'tutorial') {
    window.location.hash = '#/akses/tutorial';
  } else if (page === 'stock-detail' && params.ticker) {
    window.location.hash = `#/akses/${params.ticker}`;
  }
}

/**
 * Load stocks data from Yahoo Finance or fallback to mock
 */
async function loadStocksData() {
  isLoading = true;
  dataSource = 'loading';
  render();

  try {
    const yahooData = await getStocksData();

    if (yahooData && yahooData.length > 0) {
      stocksWithSignals = yahooData.map(stock => generateCompleteSignal(stock));
      dataSource = 'yahoo';
      lastUpdated = new Date();
      console.log('Loaded', stocksWithSignals.length, 'stocks from Yahoo Finance');
    } else {
      throw new Error('No data from Yahoo Finance');
    }
  } catch (error) {
    console.warn('Failed to load from Yahoo Finance, using mock data:', error);
    stocksWithSignals = stocksData.map(stock => generateCompleteSignal(stock));
    dataSource = 'mock';
    lastUpdated = new Date();
    console.log('Loaded', stocksWithSignals.length, 'stocks from mock data');
  }

  isLoading = false;
  render();
}

/**
 * Refresh data from Yahoo Finance
 */
async function refreshData() {
  clearCache();
  await loadStocksData();
}

/**
 * Render loading state
 */
function renderLoadingState() {
  return `
    <div class="loading-state">
      <div class="loading-spinner"></div>
      <p>Memuat data saham...</p>
      <p style="font-size: 0.875rem; color: var(--text-muted);">Mencoba koneksi ke Yahoo Finance...</p>
    </div>
  `;
}

/**
 * Render hero section with stats
 */
function renderHero() {
  const buySignals = stocksWithSignals.filter(s => s.signal.signal === 'BUY').length;
  const watchlistSignals = stocksWithSignals.filter(s => s.signal.signal === 'Watchlist').length;

  return `
    <section class="hero">
      <h1>AutoStocks AI</h1>
      <p class="hero-subtitle">
        Sinyal trading saham Indonesia dengan analisis teknikal otomatis. 
        Dilengkapi target Entry, Take Profit, dan Stop Loss.
      </p>
      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-value">${stocksWithSignals.length}</div>
          <div class="stat-label">Saham</div>
        </div>
        <div class="stat-item">
          <div class="stat-value" style="color: var(--success)">${buySignals}</div>
          <div class="stat-label">Buy</div>
        </div>
        <div class="stat-item">
          <div class="stat-value" style="color: var(--warning)">${watchlistSignals}</div>
          <div class="stat-label">Watchlist</div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Render stocks section
 */
function renderStocksSection() {
  if (isLoading) {
    return `
      <section class="container">
        ${renderLoadingState()}
      </section>
    `;
  }

  const filteredStocks = applyFilters(stocksWithSignals, filters);

  const lastUpdateStr = lastUpdated
    ? lastUpdated.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
    : '-';

  return `
    <section class="container">
      <div class="section-header">
        <div>
          <h2 class="section-title">📊 Trading Signals</h2>
          <p class="section-subtitle">Update: ${lastUpdateStr} • R/R min 1:2</p>
        </div>
        <button class="refresh-btn" id="refreshBtn">
          <span class="refresh-icon">🔄</span>
          <span class="btn-text">Refresh</span>
        </button>
      </div>
      
      ${renderFilterPanel(filters)}
      
      ${filteredStocks.length > 0
      ? renderStockGrid(filteredStocks)
      : '<div class="empty-state"><div class="empty-icon">📭</div><p>Tidak ada saham yang sesuai filter</p></div>'
    }
    </section>
  `;
}

/**
 * Render footer
 */
function renderFooter() {
  const dataSourceLabel = dataSource === 'yahoo'
    ? '<span class="data-source live">🟢 Yahoo Finance (Live)</span>'
    : '<span class="data-source">📊 Data Demo</span>';

  return `
    <footer class="footer">
      <div class="container">
        <div style="margin-bottom: var(--spacing-sm);">
          ${dataSourceLabel}
        </div>
        <p>© 2026 AutoStocks AI • Untuk Edukasi</p>
        <p style="margin-top: var(--spacing-xs); font-size: 0.75rem;">
          ⚠️ Bukan saran investasi. Selalu lakukan riset mandiri.
        </p>
      </div>
    </footer>
  `;
}

/**
 * Render home page (dashboard)
 */
function renderHomePage() {
  return `
    ${renderHero()}
    ${renderStocksSection()}
  `;
}

/**
 * Main render function
 */
function render() {
  const app = document.querySelector('#app');
  const route = parseRoute();

  let pageContent = '';
  let showHeader = true;
  let showFooter = true;

  // If on landing page (light or dark), render landing and return early
  if (route.page === 'landing' || route.page === 'landing-dark') {
    const theme = route.page === 'landing-dark' ? 'dark' : 'light';
    app.innerHTML = renderLandingPage(theme);
    attachLandingEventListeners();

    // Track ViewContent for landing page
    trackEvent('ViewContent');
    return;
  }

  // Landing Page B (/lpb)
  if (route.page === 'landing-b') {
    app.innerHTML = renderLandingPageB();
    attachLandingPageBListeners();
    return;
  }

  // Load stocks data if needed for app pages
  if (stocksWithSignals.length === 0 && !isLoading && route.page !== 'landing') {
    loadStocksData();
    return;
  }

  switch (route.page) {
    case 'tutorial':
      pageContent = renderHowToReadPage();
      break;
    case 'stock-detail':
      if (route.ticker) {
        selectedStock = stocksWithSignals.find(s => s.ticker === route.ticker);
      }
      if (selectedStock) {
        pageContent = renderStockDetailPage(selectedStock);
        showFooter = false;
      } else {
        navigateTo('home');
        return;
      }
      break;
    case 'home':
    default:
      pageContent = renderHomePage();
      break;
  }

  app.innerHTML = `
    ${showHeader ? renderHeader(route.page) : ''}
    <main>
      ${pageContent}
    </main>
    ${showFooter ? renderFooter() : ''}
  `;

  // Attach event listeners after render
  attachEventListeners();

  // Load news asynchronously for detail page
  if (route.page === 'stock-detail' && selectedStock) {
    loadNewsForStock(selectedStock.ticker, selectedStock.name);
  }
}

/**
 * Attach event listeners
 */
function attachEventListeners() {
  // Navigation links
  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = e.target.closest('[data-page]').dataset.page;
      if (page === 'home') {
        navigateTo('home');
      } else if (page === 'tutorial') {
        navigateTo('tutorial');
      } else if (page === 'stocks') {
        navigateTo('home');
      }
    });
  });

  // Back button (from detail page)
  const backBtn = document.getElementById('backToHome');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      navigateTo('home');
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = toggleTheme();
      // Update button icon
      const icon = themeToggle.querySelector('.theme-icon');
      if (icon) {
        icon.textContent = newTheme === 'light' ? '🌙' : '☀️';
      }
    });
  }

  // Refresh button
  const refreshBtn = document.getElementById('refreshBtn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', async () => {
      refreshBtn.classList.add('loading');
      refreshBtn.innerHTML = '<span class="spinner">🔄</span> Loading...';
      await refreshData();
    });
  }

  // Filter buttons
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const filterType = e.target.dataset.filter;
      const value = e.target.dataset.value;

      if (filterType === 'signal') {
        filters.signalFilter = value;
      } else if (filterType === 'strategy') {
        filters.strategyFilter = value;
      } else if (filterType === 'foreign') {
        filters.foreignOnly = !filters.foreignOnly;
        e.target.classList.toggle('active');
      }

      render();
    });
  });

  // Sort buttons
  document.querySelectorAll('[data-sort]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      filters.sortBy = e.target.dataset.sort;
      render();
    });
  });

  // Stock card clicks - navigate to detail page
  document.querySelectorAll('.stock-card').forEach(card => {
    card.addEventListener('click', () => {
      const ticker = card.dataset.ticker;
      navigateTo('stock-detail', { ticker });
    });
  });
}

// Add Google Fonts
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// Add meta theme-color for mobile browsers
const metaThemeColor = document.createElement('meta');
metaThemeColor.name = 'theme-color';
metaThemeColor.content = getTheme() === 'dark' ? '#0f0a1a' : '#f8fafc';
document.head.appendChild(metaThemeColor);

// Add viewport meta for mobile
let viewportMeta = document.querySelector('meta[name="viewport"]');
if (!viewportMeta) {
  viewportMeta = document.createElement('meta');
  viewportMeta.name = 'viewport';
  viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
  document.head.appendChild(viewportMeta);
}

// Listen for hash changes
window.addEventListener('hashchange', () => {
  render();
});

// Initial render
render();

// Load stocks data if on app pages
const initialRoute = parseRoute();
if (initialRoute.page !== 'landing' && initialRoute.page !== 'landing-dark' && initialRoute.page !== 'landing-b') {
  loadStocksData();
}
