// Stock Card Component - Simplified

import { formatAccumulation, getAccumulationStatus } from '../utils/brokerFilter.js';

/**
 * Format price to Indonesian Rupiah
 * @param {number} price - Price value
 * @returns {string} Formatted price
 */
function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price);
}

/**
 * Get signal badge class
 * @param {string} signal - Signal text
 * @returns {string} CSS class
 */
function getSignalClass(signal) {
  const signalMap = {
    'BUY': 'buy',
    'Watchlist': 'watchlist'
  };
  return signalMap[signal] || 'watchlist';
}

/**
 * Render a stock card
 * @param {Object} stockData - Complete stock data with signals
 * @returns {string} HTML string
 */
export function renderStockCard(stockData) {
  const {
    ticker,
    name,
    lastClose,
    changePercent,
    signal,
    targets,
    analysis,
    foreignAccumulation2W
  } = stockData;

  const isPositive = changePercent >= 0;
  const signalClass = getSignalClass(signal.signal);
  const accumStatus = getAccumulationStatus(foreignAccumulation2W);

  return `
    <div class="stock-card animate-slide-up" data-ticker="${ticker}">
      <div class="stock-header">
        <div>
          <div class="stock-ticker">${ticker}</div>
          <div class="stock-name">${name}</div>
        </div>
        <span class="signal-badge ${signalClass}">${signal.signal}</span>
      </div>
      
      <div class="stock-price">
        <span class="price-value">Rp${formatPrice(lastClose)}</span>
        <span class="price-change ${isPositive ? 'positive' : 'negative'}">
          ${isPositive ? '+' : ''}${changePercent.toFixed(2)}%
        </span>
      </div>
      
      <div class="targets-section">
        <div class="targets-header">Price Targets</div>
        <div class="targets-grid">
          <div class="target-item">
            <div class="target-label">Entry</div>
            <div class="target-value entry">${formatPrice(targets.entry)}</div>
          </div>
          <div class="target-item">
            <div class="target-label">TP</div>
            <div class="target-value tp">${formatPrice(targets.tp1)}</div>
            <div class="target-percent">+${targets.tp1Percent}%</div>
          </div>
          <div class="target-item">
            <div class="target-label">SL</div>
            <div class="target-value sl">${formatPrice(targets.sl)}</div>
            <div class="target-percent">${targets.slPercent}%</div>
          </div>
        </div>
      </div>
      
      <div class="indicators-row">
        <span class="indicator-chip">
          <span class="indicator-name">RSI</span>
          <span class="indicator-value" style="color: ${analysis.rsiInterpretation.color}">${analysis.rsi14.toFixed(1)}</span>
        </span>
        <span class="indicator-chip">
          <span class="indicator-name">MACD</span>
          <span class="indicator-value" style="color: ${analysis.macdInterpretation.color}">${analysis.macdInterpretation.status}</span>
        </span>
        <span class="rr-badge">
          R/R 1:${targets.riskReward}
        </span>
      </div>
      
      <div class="accumulation-row">
        <span class="accumulation-label">Foreign Flow (2W)</span>
        <span class="accumulation-value" style="color: ${accumStatus.color}">
          ${accumStatus.icon} ${formatAccumulation(foreignAccumulation2W)}
        </span>
      </div>
    </div>
  `;
}

/**
 * Render grid of stock cards
 * @param {Array} stocks - Array of stock data with signals
 * @returns {string} HTML string
 */
export function renderStockGrid(stocks) {
  if (stocks.length === 0) {
    return `
      <div class="empty-state">
        <div class="empty-icon">📊</div>
        <p>No stocks match your filter criteria</p>
      </div>
    `;
  }

  return `
    <div class="grid grid-cols-4">
      ${stocks.map(stock => renderStockCard(stock)).join('')}
    </div>
  `;
}
