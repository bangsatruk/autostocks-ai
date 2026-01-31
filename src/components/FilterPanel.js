// Filter Panel Component - Simplified

/**
 * Render the filter panel (simplified - only signal filter and foreign toggle)
 * @param {Object} filters - Current filter state
 * @returns {string} HTML string
 */
export function renderFilterPanel(filters = {}) {
    const {
        signalFilter = 'all',
        foreignOnly = false
    } = filters;

    return `
    <div class="filter-panel">
      <div class="filter-group">
        <span class="filter-label">Signal:</span>
        <button class="filter-btn ${signalFilter === 'all' ? 'active' : ''}" data-filter="signal" data-value="all">All</button>
        <button class="filter-btn ${signalFilter === 'buy' ? 'active' : ''}" data-filter="signal" data-value="buy">Buy</button>
        <button class="filter-btn ${signalFilter === 'watchlist' ? 'active' : ''}" data-filter="signal" data-value="watchlist">Watchlist</button>
      </div>
    </div>
  `;
}

/**
 * Apply filters to stocks (simplified)
 * @param {Array} stocks - Array of stock data
 * @param {Object} filters - Filter options
 * @returns {Array} Filtered stocks
 */
export function applyFilters(stocks, filters) {
    let result = [...stocks];

    // Signal filter
    if (filters.signalFilter && filters.signalFilter !== 'all') {
        result = result.filter(stock => {
            const signal = stock.signal.signal.toLowerCase();
            if (filters.signalFilter === 'buy') {
                return signal === 'buy';
            } else if (filters.signalFilter === 'watchlist') {
                return signal === 'watchlist';
            }
            return true;
        });
    }

    // Foreign accumulation filter
    if (filters.foreignOnly) {
        result = result.filter(stock => stock.foreignAccumulation2W > 0);
    }

    // Always sort by accumulation (no UI option)
    result.sort((a, b) => b.foreignAccumulation2W - a.foreignAccumulation2W);

    return result;
}
