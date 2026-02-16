// Yahoo Finance API Service
// Uses Vercel Serverless Function proxy at /api/stocks
// Server-side proxy bypasses CORS and Yahoo rate limits

/**
 * Fetch all stocks via our serverless proxy
 * @returns {Promise<Array>} Array of stock data
 */
async function fetchAllStocks() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

        const response = await fetch('/api/stocks', {
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
        }

        const json = await response.json();

        if (json.success && json.data && json.data.length > 0) {
            return json.data;
        }

        throw new Error('No data returned from API');
    } catch (error) {
        console.error('Error fetching stocks from API:', error);
        return [];
    }
}

/**
 * Fetch single stock data
 * @param {string} ticker - Stock ticker (e.g. 'BBCA' or 'BBCA.JK')
 * @returns {Promise<Object|null>} Stock data or null
 */
async function fetchStockData(ticker) {
    try {
        const cleanTicker = ticker.replace('.JK', '');
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(`/api/stocks?ticker=${cleanTicker}.JK`, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
        }

        const json = await response.json();

        if (json.success && json.data && json.data.length > 0) {
            return json.data[0];
        }

        return null;
    } catch (error) {
        console.error(`Error fetching ${ticker}:`, error);
        return null;
    }
}

/**
 * Get cached data or fetch new
 * Cache expires after 5 minutes
 */
const CACHE_KEY = 'autostocks_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getStocksData() {
    // Check cache
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        try {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_DURATION && data && data.length > 0) {
                console.log('Using cached data (' + data.length + ' stocks)');
                return data;
            }
        } catch (e) {
            // Invalid cache, continue to fetch
        }
    }

    // Fetch fresh data from our API proxy
    console.log('Fetching fresh data from Yahoo Finance via API proxy...');
    const data = await fetchAllStocks();

    if (data.length > 0) {
        // Cache the data
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    }

    return data;
}

/**
 * Clear cache and force refresh
 */
function clearCache() {
    localStorage.removeItem(CACHE_KEY);
}

// Keep the same exports for backward compatibility
const STOCK_TICKERS = [
    'BBCA.JK', 'BBRI.JK', 'BMRI.JK', 'BBNI.JK', 'TLKM.JK',
    'ASII.JK', 'UNVR.JK', 'ANTM.JK', 'PTBA.JK', 'MDKA.JK',
    'INCO.JK', 'PGAS.JK', 'ITMG.JK', 'BRIS.JK', 'MEDC.JK'
];

export {
    fetchStockData,
    fetchAllStocks,
    getStocksData,
    clearCache,
    STOCK_TICKERS
};
