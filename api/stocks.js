/**
 * Vercel Serverless Function — Yahoo Finance Proxy
 * GET /api/stocks          → fetch all stocks
 * GET /api/stocks?ticker=BBCA.JK  → fetch single stock
 * GET /api/stocks?ticker=BBCA.JK,BBRI.JK → fetch multiple specific stocks
 */

const YAHOO_BASE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart/';

const USER_AGENT =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// Default tickers to fetch when no ticker param provided
const DEFAULT_TICKERS = [
    'BBCA.JK', 'BBRI.JK', 'BMRI.JK', 'BBNI.JK', 'TLKM.JK',
    'ASII.JK', 'UNVR.JK', 'ANTM.JK', 'PTBA.JK', 'MDKA.JK',
    'INCO.JK', 'PGAS.JK', 'ITMG.JK', 'BRIS.JK', 'MEDC.JK'
];

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

const STOCK_SECTORS = {
    'BBCA': 'Finance', 'BBRI': 'Finance', 'BMRI': 'Finance', 'BBNI': 'Finance', 'BRIS': 'Finance',
    'TLKM': 'Infrastructure', 'PGAS': 'Infrastructure',
    'ASII': 'Trade & Services',
    'UNVR': 'Consumer Goods',
    'ANTM': 'Mining', 'PTBA': 'Mining', 'MDKA': 'Mining', 'INCO': 'Mining', 'ITMG': 'Mining',
    'MEDC': 'Mining'
};

/**
 * Fetch a single stock from Yahoo Finance
 */
async function fetchOne(ticker, range = '3mo', interval = '1d') {
    const url = `${YAHOO_BASE_URL}${ticker}?range=${range}&interval=${interval}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        const res = await fetch(url, {
            signal: controller.signal,
            headers: { 'User-Agent': USER_AGENT }
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
            throw new Error(`Yahoo returned ${res.status} for ${ticker}`);
        }

        const data = await res.json();
        return parseYahooData(ticker, data);
    } catch (err) {
        clearTimeout(timeoutId);
        console.error(`[stocks] Error fetching ${ticker}:`, err.message);
        return null;
    }
}

/**
 * Parse Yahoo Finance chart API response into our data shape
 */
function parseYahooData(ticker, data) {
    const result = data.chart?.result?.[0];
    if (!result) return null;

    const meta = result.meta;
    const quote = result.indicators?.quote?.[0];
    const timestamps = result.timestamp;

    if (!quote || !timestamps) return null;

    const baseTicker = ticker.replace('.JK', '');

    // Build historical prices
    const historicalPrices = [];
    for (let i = 0; i < timestamps.length; i++) {
        if (quote.open[i] != null && quote.high[i] != null && quote.low[i] != null && quote.close[i] != null) {
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

    const lastIdx = historicalPrices.length - 1;
    const prevIdx = lastIdx > 0 ? lastIdx - 1 : 0;

    const lastClose = historicalPrices[lastIdx]?.close || meta.regularMarketPrice;
    const prevClose = historicalPrices[prevIdx]?.close || meta.previousClose || lastClose;
    const change = lastClose - prevClose;
    const changePercent = prevClose ? ((change / prevClose) * 100) : 0;

    // Average volume (last 20 days)
    const recentVols = historicalPrices.slice(-20).map(p => p.volume);
    const avgVolume = recentVols.length > 0
        ? recentVols.reduce((a, b) => a + b, 0) / recentVols.length
        : 0;

    // Generate broker summary (Yahoo doesn't have this data)
    const brokerSummary = generateBrokerSummary(baseTicker, changePercent);

    return {
        ticker: baseTicker,
        name: COMPANY_NAMES[baseTicker] || baseTicker,
        sector: STOCK_SECTORS[baseTicker] || 'Other',
        lastClose: Math.round(lastClose),
        open: Math.round(historicalPrices[lastIdx]?.open || meta.regularMarketOpen || lastClose),
        high: Math.round(historicalPrices[lastIdx]?.high || meta.regularMarketDayHigh || lastClose),
        low: Math.round(historicalPrices[lastIdx]?.low || meta.regularMarketDayLow || lastClose),
        prevClose: Math.round(prevClose),
        change: Math.round(change),
        changePercent: parseFloat(changePercent.toFixed(2)),
        volume: historicalPrices[lastIdx]?.volume || meta.regularMarketVolume || 0,
        avgVolume: Math.round(avgVolume),
        marketCap: meta.marketCap || 0,
        historicalPrices,
        brokerSummary,
        foreignAccumulation2W: brokerSummary.foreignNet,
        lastUpdated: new Date().toISOString()
    };
}

/**
 * Generate broker summary based on price momentum
 * (Yahoo Finance doesn't provide real broker data)
 * Uses a stable day-based seed so values are consistent within a day
 */
function generateBrokerSummary(ticker, changePercent) {
    const tickerSeed = ticker.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const daySeed = Math.floor(Date.now() / 86400000); // changes once per day

    // Seeded pseudo-random: unique per ticker + broker + day
    const rng = (salt) => {
        const x = Math.sin(tickerSeed * 9301 + salt * 49297 + daySeed * 233) * 10000;
        return x - Math.floor(x); // 0..1
    };

    const randRange = (salt, min, max) => {
        return Math.floor(rng(salt) * (max - min + 1)) + min;
    };

    const bias = changePercent > 0 ? 1.3 : 0.7;

    const akBuy = randRange(1, 1000000, 15000000) * bias;
    const akSell = randRange(2, 500000, 10000000) / bias;
    const bkBuy = randRange(3, 500000, 10000000) * bias;
    const bkSell = randRange(4, 300000, 8000000) / bias;
    const zpBuy = randRange(5, 300000, 8000000) * bias;
    const zpSell = randRange(6, 200000, 6000000) / bias;

    const foreignNet = Math.round((akBuy - akSell) + (bkBuy - bkSell) + (zpBuy - zpSell));

    return {
        AK: { buy: Math.round(akBuy), sell: Math.round(akSell), net: Math.round(akBuy - akSell) },
        BK: { buy: Math.round(bkBuy), sell: Math.round(bkSell), net: Math.round(bkBuy - bkSell) },
        ZP: { buy: Math.round(zpBuy), sell: Math.round(zpSell), net: Math.round(zpBuy - zpSell) },
        foreignNet
    };
}

export default async function handler(request, response) {
    // CORS headers
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    if (request.method !== 'GET') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    // Cache response for 60 seconds on Vercel edge + browser
    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

    try {
        const { ticker, range, interval } = request.query;

        let tickers;
        if (ticker) {
            // Specific ticker(s) requested
            tickers = ticker.split(',').map(t => t.trim().toUpperCase());
            // Add .JK suffix if not present
            tickers = tickers.map(t => t.endsWith('.JK') ? t : `${t}.JK`);
        } else {
            // Fetch all default tickers
            tickers = DEFAULT_TICKERS;
        }

        // Fetch all in parallel
        const results = await Promise.all(
            tickers.map(t => fetchOne(t, range || '3mo', interval || '1d'))
        );

        const stocks = results.filter(s => s !== null);

        if (stocks.length === 0) {
            return response.status(502).json({
                error: 'Failed to fetch stock data from Yahoo Finance',
                message: 'All ticker requests failed. Yahoo Finance may be temporarily unavailable.'
            });
        }

        return response.status(200).json({
            success: true,
            count: stocks.length,
            source: 'yahoo_finance',
            timestamp: new Date().toISOString(),
            data: stocks
        });

    } catch (error) {
        console.error('[stocks] Internal error:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}
