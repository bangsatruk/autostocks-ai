// Signal Generator - Creates trading signals with Entry, TP, SL
// Simplified: Only BUY and Watchlist signals

import { analyzeStock, calculateATR } from './technicalAnalysis.js';

/**
 * Generate trading signal - Simplified to BUY or Watchlist only
 * @param {Object} analysis - Technical analysis result
 * @param {Object} stock - Stock data
 * @returns {Object} Signal info
 */
export function generateSignal(analysis, stock) {
    const { rsi14, macd, priceVsEma20, priceVsEma50, goldenCross, volumeRatio } = analysis;

    let score = 0;

    // RSI signals - bullish bias
    if (rsi14 < 30) score += 3;        // Oversold - strong buy opportunity
    else if (rsi14 < 40) score += 2;   // Low RSI - buy opportunity
    else if (rsi14 < 50) score += 1;
    else if (rsi14 > 70) score -= 2;   // Overbought - reduce score
    else if (rsi14 > 60) score -= 1;

    // MACD signals
    if (macd.macd > macd.signal && macd.histogram > 0) score += 2;  // Strong bullish
    else if (macd.macd > macd.signal) score += 1;                    // Bullish
    else if (macd.macd < macd.signal && macd.histogram < 0) score -= 1; // Bearish

    // EMA signals
    if (priceVsEma20 === 'above' && priceVsEma50 === 'above') score += 2;  // Strong uptrend
    else if (priceVsEma20 === 'above') score += 1;                          // Above short-term
    if (goldenCross) score += 2;  // Golden cross - strong bullish

    // Volume confirmation
    if (volumeRatio > 1.5 && score > 0) score += 1;

    // Foreign accumulation - big bonus for smart money
    if (stock.foreignAccumulation2W > 10) score += 2;      // Strong accumulation
    else if (stock.foreignAccumulation2W > 0) score += 1;  // Some accumulation

    // Determine signal - Only BUY or Watchlist
    if (score >= 4) {
        return {
            signal: 'BUY',
            color: '#22c55e',
            bgColor: 'rgba(34, 197, 94, 0.15)',
            score,
            description: 'Sinyal beli berdasarkan analisis teknikal'
        };
    } else {
        return {
            signal: 'Watchlist',
            color: '#eab308',
            bgColor: 'rgba(234, 179, 8, 0.12)',
            score,
            description: 'Pantau perkembangan, tunggu konfirmasi'
        };
    }
}

/**
 * Calculate price targets (Entry, TP, SL)
 * SL: Just below nearest support level (EMA20, EMA50, or ATR-based), max -5.5%
 * TP: Minimum 2x the SL distance (R/R 1:2)
 * @param {Object} stock - Stock data
 * @param {Object} analysis - Technical analysis result
 * @param {Object} signal - Signal info
 * @returns {Object} Price targets
 */
export function calculateTargets(stock, analysis, signal) {
    const { ema20, ema50, atr } = analysis;
    const currentPrice = stock.lastClose;

    // Round to nearest 5 or 10 based on price level
    const roundTo = currentPrice > 1000 ? 10 : 5;

    // Entry: Current price or slight pullback to EMA20 (whichever is lower)
    let entry = Math.min(currentPrice, ema20 * 1.01);
    entry = Math.round(entry / roundTo) * roundTo;

    // SL Limits: minimum -2.5%, maximum -5.5%
    const minSlPercent = 0.025;  // At least -2.5% 
    const maxSlPercent = 0.055; // Max -5.5%
    const minSlPrice = entry * (1 - minSlPercent);  // Highest SL allowed (tightest)
    const maxSlPrice = entry * (1 - maxSlPercent);  // Lowest SL allowed (widest)

    // Find support levels - we'll place SL just below the nearest support
    const supportLevels = [
        ema20 * 0.98,           // 2% below EMA20
        ema50 * 0.98,           // 2% below EMA50
        currentPrice - (atr * 1.5),  // 1.5 ATR below price
        currentPrice - (atr * 2)     // 2 ATR below price (wider stop)
    ].filter(level => level < entry && level > 0); // Only valid levels below entry

    // Find the best support level (highest one = tightest stop)
    let slCandidate = supportLevels.length > 0 ? Math.max(...supportLevels) : maxSlPrice;

    // Clamp SL between min and max percentages
    // SL must be at least minSlPrice (to avoid too tight stops)
    // SL must be at most maxSlPrice (to avoid too wide stops)
    let sl = Math.min(slCandidate, minSlPrice);  // Don't go tighter than -2%
    sl = Math.max(sl, maxSlPrice);               // Don't go wider than -5.5%
    sl = Math.round(sl / roundTo) * roundTo;

    // Ensure SL is always below entry (at least 1 tick)
    if (sl >= entry) {
        sl = entry - roundTo;
    }

    // Calculate risk (distance from entry to SL)
    const risk = entry - sl;

    // TP: Minimum 2x the risk for R/R 1:2
    const minRR = 2;
    let tp1 = entry + (risk * minRR);
    tp1 = Math.round(tp1 / roundTo) * roundTo;

    // Ensure TP is above entry
    if (tp1 <= entry) {
        tp1 = entry + (roundTo * 2);
    }

    // Calculate percentages
    const tp1Percent = ((tp1 - entry) / entry * 100).toFixed(2);
    const slPercent = ((sl - entry) / entry * 100).toFixed(2); // Will be negative

    // Calculate R/R ratio
    const reward = tp1 - entry;
    const riskReward = risk > 0 ? (reward / risk) : minRR;

    return {
        entry,
        tp1,
        sl,
        tp1Percent: parseFloat(tp1Percent),
        slPercent: parseFloat(slPercent),
        riskReward: parseFloat(riskReward.toFixed(2))
    };
}

/**
 * Generate complete signal data for a stock
 * @param {Object} stock - Stock data
 * @returns {Object} Complete signal data
 */
export function generateCompleteSignal(stock) {
    const analysis = analyzeStock(stock);
    const signal = generateSignal(analysis, stock);
    const targets = calculateTargets(stock, analysis, signal);

    return {
        ...stock,
        analysis,
        signal,
        targets
    };
}
