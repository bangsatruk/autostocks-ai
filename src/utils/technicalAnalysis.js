// Technical Analysis Utility Functions

/**
 * Calculate RSI (Relative Strength Index)
 * @param {Array} prices - Array of closing prices
 * @param {number} period - RSI period (default 14)
 * @returns {number} RSI value (0-100)
 */
export function calculateRSI(prices, period = 14) {
    if (prices.length < period + 1) return 50;

    const changes = [];
    for (let i = 1; i < prices.length; i++) {
        changes.push(prices[i] - prices[i - 1]);
    }

    const recentChanges = changes.slice(-period);
    let gains = 0;
    let losses = 0;

    for (const change of recentChanges) {
        if (change > 0) gains += change;
        else losses += Math.abs(change);
    }

    const avgGain = gains / period;
    const avgLoss = losses / period;

    if (avgLoss === 0) return 100;

    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
}

/**
 * Calculate EMA (Exponential Moving Average)
 * @param {Array} prices - Array of closing prices
 * @param {number} period - EMA period
 * @returns {number} EMA value
 */
export function calculateEMA(prices, period) {
    if (prices.length < period) return prices[prices.length - 1] || 0;

    const multiplier = 2 / (period + 1);
    let ema = prices.slice(0, period).reduce((a, b) => a + b, 0) / period;

    for (let i = period; i < prices.length; i++) {
        ema = (prices[i] - ema) * multiplier + ema;
    }

    return ema;
}

/**
 * Calculate MACD (Moving Average Convergence Divergence)
 * @param {Array} prices - Array of closing prices
 * @returns {Object} { macd, signal, histogram }
 */
export function calculateMACD(prices) {
    const ema12 = calculateEMA(prices, 12);
    const ema26 = calculateEMA(prices, 26);
    const macd = ema12 - ema26;

    // For signal line, we need MACD history
    const macdHistory = [];
    for (let i = 26; i <= prices.length; i++) {
        const slice = prices.slice(0, i);
        const e12 = calculateEMA(slice, 12);
        const e26 = calculateEMA(slice, 26);
        macdHistory.push(e12 - e26);
    }

    const signal = macdHistory.length >= 9 ? calculateEMA(macdHistory, 9) : macd;
    const histogram = macd - signal;

    return { macd, signal, histogram };
}

/**
 * Calculate ATR (Average True Range)
 * @param {Array} candles - Array of {high, low, close} objects
 * @param {number} period - ATR period (default 14)
 * @returns {number} ATR value
 */
export function calculateATR(candles, period = 14) {
    if (candles.length < period + 1) return 0;

    const trueRanges = [];
    for (let i = 1; i < candles.length; i++) {
        const high = candles[i].high;
        const low = candles[i].low;
        const prevClose = candles[i - 1].close;

        const tr = Math.max(
            high - low,
            Math.abs(high - prevClose),
            Math.abs(low - prevClose)
        );
        trueRanges.push(tr);
    }

    const recentTR = trueRanges.slice(-period);
    return recentTR.reduce((a, b) => a + b, 0) / period;
}

/**
 * Calculate Volume Ratio
 * @param {number} currentVolume - Current volume
 * @param {number} avgVolume - Average volume
 * @returns {number} Volume ratio
 */
export function calculateVolumeRatio(currentVolume, avgVolume) {
    if (avgVolume === 0) return 1;
    return currentVolume / avgVolume;
}

/**
 * Get RSI interpretation
 * @param {number} rsi - RSI value
 * @returns {Object} { status, color, description }
 */
export function interpretRSI(rsi) {
    if (rsi < 30) {
        return { status: 'Oversold', color: '#22c55e', description: 'Potential buy signal' };
    } else if (rsi > 70) {
        return { status: 'Overbought', color: '#ef4444', description: 'Potential sell signal' };
    } else {
        return { status: 'Neutral', color: '#eab308', description: 'Normal condition' };
    }
}

/**
 * Get MACD interpretation
 * @param {Object} macd - MACD object { macd, signal, histogram }
 * @returns {Object} { status, color, description }
 */
export function interpretMACD(macdData) {
    if (macdData.macd > macdData.signal) {
        return { status: 'Bullish', color: '#22c55e', description: 'Bullish momentum' };
    } else {
        return { status: 'Bearish', color: '#ef4444', description: 'Bearish momentum' };
    }
}

/**
 * Analyze all technical indicators for a stock
 * @param {Object} stock - Stock data object
 * @returns {Object} Complete technical analysis
 */
export function analyzeStock(stock) {
    const prices = stock.historicalPrices.map(p => p.close);
    const candles = stock.historicalPrices;

    // Calculate indicators
    const rsi14 = calculateRSI(prices, 14);
    const rsi12 = calculateRSI(prices, 12);
    const ema20 = calculateEMA(prices, 20);
    const ema50 = calculateEMA(prices, 50);
    const macd = calculateMACD(prices);
    const atr = calculateATR(candles, 14);
    const volumeRatio = calculateVolumeRatio(stock.volume, stock.avgVolume);

    return {
        rsi14,
        rsi12,
        ema20,
        ema50,
        macd,
        atr,
        volumeRatio,
        rsiInterpretation: interpretRSI(rsi14),
        macdInterpretation: interpretMACD(macd),
        priceVsEma20: stock.lastClose > ema20 ? 'above' : 'below',
        priceVsEma50: stock.lastClose > ema50 ? 'above' : 'below',
        goldenCross: ema20 > ema50,
        deathCross: ema20 < ema50
    };
}
