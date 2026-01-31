// Yahoo Finance API Service
// Uses query1.finance.yahoo.com with CORS proxy for Indonesian stocks (.JK suffix)

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const YAHOO_BASE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart/';

// Indonesian stock tickers (add .JK suffix for Yahoo Finance)
const STOCK_TICKERS = [
    'BBCA.JK', 'BBRI.JK', 'BMRI.JK', 'BBNI.JK', 'TLKM.JK',
    'ASII.JK', 'UNVR.JK', 'ANTM.JK', 'PTBA.JK', 'MDKA.JK',
    'INCO.JK', 'PGAS.JK', 'ITMG.JK', 'BRIS.JK', 'MEDC.JK'
];

// Company name mapping
const COMPANY_NAMES = {
    'BBCA': 'Bank Central Asia Tbk',
    'BBRI': 'Bank Rakyat Indonesia Tbk',
    'BMRI': 'Bank Mandiri Tbk',
    'BBNI': 'Bank Negara Indonesia Tbk',
    'TLKM': 'Telkom Indonesia Tbk',
    'ASII': 'Astra International Tbk',
    'UNVR': 'Unilever Indonesia Tbk',
    'ANTM': 'Aneka Tambang Tbk',
    'PTBA': 'Bukit Asam Tbk',
    'MDKA': 'Merdeka Copper Gold Tbk',
    'INCO': 'Vale Indonesia Tbk',
    'PGAS': 'Perusahaan Gas Negara Tbk',
    'ITMG': 'Indo Tambangraya Megah Tbk',
    'BRIS': 'Bank Syariah Indonesia Tbk',
    'MEDC': 'Medco Energi Internasional Tbk'
};

// Sector mapping
const STOCK_SECTORS = {
    'BBCA': 'Finance', 'BBRI': 'Finance', 'BMRI': 'Finance', 'BBNI': 'Finance', 'BRIS': 'Finance',
    'TLKM': 'Infrastructure', 'PGAS': 'Infrastructure',
    'ASII': 'Trade & Services',
    'UNVR': 'Consumer Goods',
    'ANTM': 'Mining', 'PTBA': 'Mining', 'MDKA': 'Mining', 'INCO': 'Mining', 'ITMG': 'Mining',
    'MEDC': 'Mining'
};

/**
 * Fetch stock data from Yahoo Finance
 * @param {string} ticker - Stock ticker with .JK suffix
 * @param {string} range - Time range ('1d', '5d', '1mo', '3mo', '6mo', '1y')
 * @param {string} interval - Data interval ('1m', '5m', '15m', '1h', '1d')
 * @returns {Promise<Object>} Stock data
 */
async function fetchStockData(ticker, range = '3mo', interval = '1d') {
    try {
        const url = `${YAHOO_BASE_URL}${ticker}?range=${range}&interval=${interval}`;
        const proxyUrl = `${CORS_PROXY}${encodeURIComponent(url)}`;

        const response = await fetch(proxyUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return parseYahooData(ticker, data);
    } catch (error) {
        console.error(`Error fetching ${ticker}:`, error);
        return null;
    }
}

/**
 * Parse Yahoo Finance API response
 * @param {string} ticker - Stock ticker
 * @param {Object} data - Raw Yahoo Finance data
 * @returns {Object} Parsed stock data
 */
function parseYahooData(ticker, data) {
    const result = data.chart?.result?.[0];
    if (!result) return null;

    const meta = result.meta;
    const quote = result.indicators?.quote?.[0];
    const timestamps = result.timestamp;

    if (!quote || !timestamps) return null;

    // Get base ticker without .JK suffix
    const baseTicker = ticker.replace('.JK', '');

    // Build historical prices array
    const historicalPrices = [];
    for (let i = 0; i < timestamps.length; i++) {
        if (quote.open[i] && quote.high[i] && quote.low[i] && quote.close[i]) {
            historicalPrices.push({
                date: new Date(timestamps[i] * 1000).toISOString().split('T')[0],
                open: Math.round(quote.open[i]),
                high: Math.round(quote.high[i]),
                low: Math.round(quote.low[i]),
                close: Math.round(quote.close[i]),
                volume: quote.volume[i] || 0
            });
        }
    }

    // Get latest data
    const lastIndex = historicalPrices.length - 1;
    const prevIndex = lastIndex > 0 ? lastIndex - 1 : 0;

    const lastClose = historicalPrices[lastIndex]?.close || meta.regularMarketPrice;
    const prevClose = historicalPrices[prevIndex]?.close || meta.previousClose || lastClose;
    const change = lastClose - prevClose;
    const changePercent = prevClose ? ((change / prevClose) * 100) : 0;

    // Calculate average volume (last 20 days)
    const recentVolumes = historicalPrices.slice(-20).map(p => p.volume);
    const avgVolume = recentVolumes.length > 0
        ? recentVolumes.reduce((a, b) => a + b, 0) / recentVolumes.length
        : 0;

    // Generate mock broker summary (since Yahoo Finance doesn't provide this)
    const brokerSummary = generateMockBrokerSummary(baseTicker, changePercent);

    return {
        ticker: baseTicker,
        name: COMPANY_NAMES[baseTicker] || baseTicker,
        sector: STOCK_SECTORS[baseTicker] || 'Other',
        lastClose: Math.round(lastClose),
        open: Math.round(historicalPrices[lastIndex]?.open || meta.regularMarketOpen || lastClose),
        high: Math.round(historicalPrices[lastIndex]?.high || meta.regularMarketDayHigh || lastClose),
        low: Math.round(historicalPrices[lastIndex]?.low || meta.regularMarketDayLow || lastClose),
        prevClose: Math.round(prevClose),
        change: Math.round(change),
        changePercent: parseFloat(changePercent.toFixed(2)),
        volume: historicalPrices[lastIndex]?.volume || meta.regularMarketVolume || 0,
        avgVolume: Math.round(avgVolume),
        marketCap: meta.marketCap || 0,
        historicalPrices,
        brokerSummary,
        foreignAccumulation2W: brokerSummary.foreignNet,
        lastUpdated: new Date().toISOString()
    };
}

/**
 * Generate mock broker summary based on price trend
 * (Yahoo Finance doesn't provide broker data, so we simulate based on momentum)
 * @param {string} ticker - Stock ticker
 * @param {number} changePercent - Price change percentage
 * @returns {Object} Mock broker summary
 */
function generateMockBrokerSummary(ticker, changePercent) {
    // Generate semi-random but consistent values based on ticker
    const seed = ticker.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = (min, max) => {
        const x = Math.sin(seed) * 10000;
        return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
    };

    // Bias based on price momentum
    const bias = changePercent > 0 ? 1.3 : 0.7;

    const akBuy = random(1000000, 15000000) * bias;
    const akSell = random(500000, 10000000) / bias;
    const bkBuy = random(500000, 10000000) * bias;
    const bkSell = random(300000, 8000000) / bias;
    const zpBuy = random(300000, 8000000) * bias;
    const zpSell = random(200000, 6000000) / bias;

    const foreignNet = Math.round((akBuy - akSell) + (bkBuy - bkSell) + (zpBuy - zpSell));

    return {
        AK: { buy: Math.round(akBuy), sell: Math.round(akSell), net: Math.round(akBuy - akSell) },
        BK: { buy: Math.round(bkBuy), sell: Math.round(bkSell), net: Math.round(bkBuy - bkSell) },
        ZP: { buy: Math.round(zpBuy), sell: Math.round(zpSell), net: Math.round(zpBuy - zpSell) },
        foreignNet
    };
}

/**
 * Fetch all stocks data
 * @returns {Promise<Array>} Array of stock data
 */
async function fetchAllStocks() {
    const promises = STOCK_TICKERS.map(ticker => fetchStockData(ticker));
    const results = await Promise.all(promises);
    return results.filter(stock => stock !== null);
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
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
            console.log('Using cached data');
            return data;
        }
    }

    // Fetch fresh data
    console.log('Fetching fresh data from Yahoo Finance...');
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

export {
    fetchStockData,
    fetchAllStocks,
    getStocksData,
    clearCache,
    STOCK_TICKERS
};
