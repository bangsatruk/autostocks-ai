// Stock Detail Page Component

import { COMPANY_INFO } from '../data/mockStocks.js';
import { formatAccumulation, getAccumulationStatus } from '../utils/brokerFilter.js';

/**
 * Format price to Indonesian Rupiah
 */
function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price);
}

/**
 * Get signal badge class
 */
function getSignalClass(signal) {
  const signalMap = {
    'BUY': 'buy',
    'Watchlist': 'watchlist'
  };
  return signalMap[signal] || 'watchlist';
}

/**
 * Calculate score profile based on technical analysis
 * @param {Object} stockData - Stock data with analysis
 * @returns {number} Score 0-100
 */
export function calculateScoreProfile(stockData) {
  const { analysis, signal, targets } = stockData;
  let score = 50; // Base score

  // RSI contribution (0-15 points)
  if (analysis.rsi14 < 30) score += 10;
  else if (analysis.rsi14 < 40) score += 7;
  else if (analysis.rsi14 > 70) score -= 10;
  else if (analysis.rsi14 > 60) score -= 5;
  else score += 3;

  // MACD contribution (0-15 points)
  if (analysis.macd.macd > analysis.macd.signal && analysis.macd.histogram > 0) score += 12;
  else if (analysis.macd.macd > analysis.macd.signal) score += 8;
  else if (analysis.macd.macd < analysis.macd.signal && analysis.macd.histogram < 0) score -= 8;
  else score -= 4;

  // EMA Position (0-10 points)
  if (analysis.priceVsEma20 === 'above' && analysis.priceVsEma50 === 'above') score += 10;
  else if (analysis.priceVsEma20 === 'above') score += 5;
  else if (analysis.priceVsEma20 === 'below' && analysis.priceVsEma50 === 'below') score -= 8;

  // Golden/Death Cross (0-10 points)
  if (analysis.goldenCross) score += 8;
  if (analysis.deathCross) score -= 8;

  // Risk/Reward contribution (0-10 points)
  if (targets.riskReward >= 3) score += 10;
  else if (targets.riskReward >= 2) score += 7;
  else if (targets.riskReward >= 1.5) score += 4;
  else score -= 3;

  // Foreign accumulation (0-10 points)
  if (stockData.foreignAccumulation2W > 10000000) score += 10;
  else if (stockData.foreignAccumulation2W > 5000000) score += 7;
  else if (stockData.foreignAccumulation2W > 0) score += 4;
  else if (stockData.foreignAccumulation2W < -5000000) score -= 7;

  // Volume ratio (0-5 points)
  if (analysis.volumeRatio > 1.5) score += 5;
  else if (analysis.volumeRatio > 1.2) score += 3;

  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Get score color based on value
 */
function getScoreColor(score) {
  if (score >= 75) return 'var(--success)';
  if (score >= 50) return 'var(--accent-500)';
  if (score >= 35) return 'var(--warning)';
  return 'var(--danger)';
}

/**
 * Get score label based on value
 */
function getScoreLabel(score) {
  if (score >= 80) return 'Sangat Bagus';
  if (score >= 65) return 'Bagus';
  if (score >= 50) return 'Cukup';
  if (score >= 35) return 'Kurang';
  return 'Hindari';
}

/**
 * Render TradingView chart embed
 */
function renderTradingViewChart(ticker) {
  return `
    <div class="tradingview-widget-container">
      <div id="tradingview_chart"></div>
      <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      <script type="text/javascript">
        new TradingView.widget({
          "width": "100%",
          "height": 400,
          "symbol": "IDX:${ticker}",
          "interval": "D",
          "timezone": "Asia/Jakarta",
          "theme": document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
          "style": "1",
          "locale": "id",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "hide_top_toolbar": false,
          "hide_legend": false,
          "save_image": false,
          "container_id": "tradingview_chart",
          "studies": ["MASimple@tv-basicstudies", "RSI@tv-basicstudies"]
        });
      </script>
    </div>
  `;
}

/**
 * Render news section placeholder (will be filled async)
 */
function renderNewsPlaceholder(ticker, name) {
  return `
    <div class="news-section" id="newsSection">
      <h2 class="section-heading">📰 Berita Terkait ${ticker}</h2>
      <div class="news-list" id="newsList">
        <div class="news-loading">
          <div class="loading-spinner small"></div>
          <span>Memuat berita dari Google News...</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render stock detail page
 */
export function renderStockDetailPage(stockData) {
  const {
    ticker, name, sector, lastClose, changePercent,
    signal, targets, analysis, companyInfo,
    foreignAccumulation2W
  } = stockData;

  const isPositive = changePercent >= 0;
  const signalClass = getSignalClass(signal.signal);
  const accumStatus = getAccumulationStatus(foreignAccumulation2W);
  const score = calculateScoreProfile(stockData);
  const scoreColor = getScoreColor(score);
  const scoreLabel = getScoreLabel(score);
  const info = companyInfo || COMPANY_INFO[ticker] || {};

  return `
    <div class="container detail-page">
      <!-- Back Button -->
      <button class="back-btn" id="backToHome">
        <span>←</span> Kembali
      </button>
      
      <!-- Header Section -->
      <div class="detail-header">
        <div class="detail-header-left">
          <div class="detail-ticker-row">
            <h1 class="detail-ticker">${ticker}</h1>
            <span class="sector-badge">${sector}</span>
          </div>
          <p class="detail-name">${name}</p>
        </div>
        <div class="detail-header-right">
          <div class="signal-score-box" style="background: ${signal.bgColor}; border-color: ${signal.color}">
            <span class="signal-badge ${signalClass}">${signal.signal}</span>
            <div class="score-display">
              <span class="score-label">Score</span>
              <span class="score-value" style="color: ${scoreColor}">${score}/100</span>
              <span class="score-desc">${scoreLabel}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Price Section -->
      <div class="detail-price-section">
        <div class="current-price">
          <span class="price-label">Harga Saat Ini</span>
          <span class="price-big">Rp${formatPrice(lastClose)}</span>
          <span class="price-change ${isPositive ? 'positive' : 'negative'}">
            ${isPositive ? '+' : ''}${changePercent.toFixed(2)}%
          </span>
        </div>
        <div class="signal-desc-box">
          <span class="signal-icon">📊</span>
          <div>
            <span class="signal-type" style="color: ${signal.color}">${signal.signal}</span>
            <span class="signal-desc">${signal.description || 'Analisis teknikal otomatis'}</span>
          </div>
        </div>
      </div>
      
      <!-- Trading Plan Section -->
      <div class="trading-plan-section">
        <h2 class="section-heading">📊 Trading Plan</h2>
        <p class="plan-intro">Rekomendasi ini dihitung berdasarkan analisis teknikal. Selalu lakukan riset mandiri.</p>
        
        <div class="targets-big">
          <div class="target-card entry">
            <div class="target-icon">📍</div>
            <div class="target-info">
              <span class="target-label">Entry Price</span>
              <span class="target-price">Rp${formatPrice(targets.entry)}</span>
              <span class="target-hint">Beli di area ini</span>
            </div>
          </div>
          
          <div class="target-card tp">
            <div class="target-icon">🎯</div>
            <div class="target-info">
              <span class="target-label">Take Profit</span>
              <span class="target-price">Rp${formatPrice(targets.tp1)}</span>
              <span class="target-percent positive">+${targets.tp1Percent}%</span>
              <span class="target-hint">Target ambil untung</span>
            </div>
          </div>
          
          <div class="target-card sl">
            <div class="target-icon">🛡️</div>
            <div class="target-info">
              <span class="target-label">Stop Loss</span>
              <span class="target-price">Rp${formatPrice(targets.sl)}</span>
              <span class="target-percent negative">${targets.slPercent}%</span>
              <span class="target-hint">Batas kerugian</span>
            </div>
          </div>
        </div>
        
        <div class="rr-display">
          <span class="rr-icon">⚖️</span>
          <span class="rr-label">Risk/Reward Ratio</span>
          <span class="rr-value ${targets.riskReward >= 2 ? 'good' : 'warning'}">1 : ${targets.riskReward}</span>
          <span class="rr-explain">${targets.riskReward >= 2 ? '✅ Rasio bagus (≥ 1:2)' : '⚠️ Rasio kurang ideal'}</span>
        </div>
      </div>
      
      <!-- Chart Section -->
      <div class="chart-section">
        <h2 class="section-heading">📈 Chart</h2>
        <div class="chart-container">
          <iframe 
            src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=IDX%3A${ticker}&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=${document.documentElement?.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'}&style=1&timezone=Asia%2FJakarta&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=id"
            style="width: 100%; height: 450px; border: none; border-radius: var(--radius-lg);"
            allowtransparency="true"
            scrolling="no"
            allowfullscreen>
          </iframe>
        </div>
      </div>
      
      <!-- Technical Indicators -->
      <div class="indicators-section">
        <h2 class="section-heading">📊 Indikator Teknikal</h2>
        <div class="indicators-grid">
          <div class="indicator-box">
            <span class="ind-label">RSI (14)</span>
            <span class="ind-value" style="color: ${analysis.rsiInterpretation.color}">${analysis.rsi14.toFixed(1)}</span>
            <span class="ind-status">${analysis.rsiInterpretation.status}</span>
          </div>
          <div class="indicator-box">
            <span class="ind-label">MACD</span>
            <span class="ind-value" style="color: ${analysis.macdInterpretation.color}">${analysis.macd.macd.toFixed(2)}</span>
            <span class="ind-status">${analysis.macdInterpretation.status}</span>
          </div>
          <div class="indicator-box">
            <span class="ind-label">EMA 20</span>
            <span class="ind-value">Rp${formatPrice(Math.round(analysis.ema20))}</span>
            <span class="ind-status ${analysis.priceVsEma20 === 'above' ? 'positive' : 'negative'}">
              Price ${analysis.priceVsEma20}
            </span>
          </div>
          <div class="indicator-box">
            <span class="ind-label">EMA 50</span>
            <span class="ind-value">Rp${formatPrice(Math.round(analysis.ema50))}</span>
            <span class="ind-status ${analysis.priceVsEma50 === 'above' ? 'positive' : 'negative'}">
              Price ${analysis.priceVsEma50}
            </span>
          </div>
          <div class="indicator-box">
            <span class="ind-label">Volume Ratio</span>
            <span class="ind-value">${analysis.volumeRatio.toFixed(2)}x</span>
            <span class="ind-status">${analysis.volumeRatio > 1.5 ? 'High' : analysis.volumeRatio > 0.8 ? 'Normal' : 'Low'}</span>
          </div>
          <div class="indicator-box">
            <span class="ind-label">Foreign Flow</span>
            <span class="ind-value" style="color: ${accumStatus.color}">${accumStatus.icon} ${formatAccumulation(foreignAccumulation2W)}</span>
            <span class="ind-status">${accumStatus.status}</span>
          </div>
        </div>
      </div>
      
      <!-- Company Info -->
      <div class="company-section">
        <h2 class="section-heading">🏢 Tentang ${ticker}</h2>
        <div class="company-card">
          <p class="company-desc">${info.description || 'Informasi perusahaan tidak tersedia.'}</p>
          ${info.founded ? `
          <div class="company-meta">
            <span><strong>Didirikan:</strong> ${info.founded}</span>
            <span><strong>Karyawan:</strong> ${info.employees?.toLocaleString() || '-'}</span>
            <span><strong>Website:</strong> <a href="https://${info.website}" target="_blank">${info.website}</a></span>
          </div>
          ` : ''}
        </div>
      </div>
      
      <!-- News Section - Async Loading -->
      ${renderNewsPlaceholder(ticker, name)}
      
      <!-- Tips for Beginners -->
      <div class="tips-section">
        <h2 class="section-heading">💡 Tips untuk Pemula</h2>
        <div class="tips-card">
          <ul class="tips-list">
            <li><strong>Entry:</strong> Beli di harga entry atau di bawahnya, jangan kejar harga yang sudah naik tinggi</li>
            <li><strong>Stop Loss:</strong> WAJIB pasang stop loss untuk membatasi kerugian jika harga turun</li>
            <li><strong>Take Profit:</strong> Jual sebagian di TP untuk mengamankan profit</li>
            <li><strong>Jangan All-In:</strong> Bagi modal ke beberapa saham, maksimal 10-20% per posisi</li>
            <li><strong>Sabar:</strong> Tidak semua analisis akan profit, fokus pada win rate jangka panjang</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}
