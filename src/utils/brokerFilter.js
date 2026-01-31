// Broker Filter - Filter stocks by foreign broker accumulation
// Smart money brokers: AK, BK, ZP (broker asing)

const FOREIGN_BROKERS = ['AK', 'BK', 'ZP'];

/**
 * Calculate total foreign net accumulation
 * @param {Object} brokerSummary - Broker summary data
 * @returns {number} Total foreign net (positive = accumulation, negative = distribution)
 */
export function calculateForeignNet(brokerSummary) {
    let total = 0;
    for (const broker of FOREIGN_BROKERS) {
        if (brokerSummary[broker]) {
            total += brokerSummary[broker].net;
        }
    }
    return total;
}

/**
 * Get foreign broker breakdown
 * @param {Object} brokerSummary - Broker summary data
 * @returns {Array} Array of foreign broker activities
 */
export function getForeignBrokerBreakdown(brokerSummary) {
    return FOREIGN_BROKERS.map(broker => ({
        code: broker,
        ...brokerSummary[broker]
    })).filter(b => b.buy !== undefined);
}

/**
 * Filter stocks by foreign accumulation in last 2 weeks
 * @param {Array} stocks - Array of stock data
 * @param {boolean} onlyPositive - Only return stocks with positive accumulation
 * @returns {Array} Filtered stocks
 */
export function filterByForeignAccumulation(stocks, onlyPositive = true) {
    if (onlyPositive) {
        return stocks.filter(stock => stock.foreignAccumulation2W > 0);
    }
    return stocks;
}

/**
 * Sort stocks by foreign accumulation
 * @param {Array} stocks - Array of stock data
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted stocks
 */
export function sortByForeignAccumulation(stocks, order = 'desc') {
    return [...stocks].sort((a, b) => {
        if (order === 'desc') {
            return b.foreignAccumulation2W - a.foreignAccumulation2W;
        }
        return a.foreignAccumulation2W - b.foreignAccumulation2W;
    });
}

/**
 * Get accumulation status
 * @param {number} accumulation - Accumulation value
 * @returns {Object} Status info
 */
export function getAccumulationStatus(accumulation) {
    if (accumulation > 10000000) {
        return {
            status: 'Strong Accumulation',
            icon: '🔥',
            color: '#22c55e',
            bgColor: 'rgba(34, 197, 94, 0.15)'
        };
    } else if (accumulation > 5000000) {
        return {
            status: 'Accumulation',
            icon: '📈',
            color: '#4ade80',
            bgColor: 'rgba(74, 222, 128, 0.1)'
        };
    } else if (accumulation > 0) {
        return {
            status: 'Light Accumulation',
            icon: '➕',
            color: '#86efac',
            bgColor: 'rgba(134, 239, 172, 0.1)'
        };
    } else if (accumulation < -10000000) {
        return {
            status: 'Strong Distribution',
            icon: '🔴',
            color: '#ef4444',
            bgColor: 'rgba(239, 68, 68, 0.15)'
        };
    } else if (accumulation < -5000000) {
        return {
            status: 'Distribution',
            icon: '📉',
            color: '#f87171',
            bgColor: 'rgba(248, 113, 113, 0.1)'
        };
    } else if (accumulation < 0) {
        return {
            status: 'Light Distribution',
            icon: '➖',
            color: '#fca5a5',
            bgColor: 'rgba(252, 165, 165, 0.1)'
        };
    } else {
        return {
            status: 'Neutral',
            icon: '➡️',
            color: '#94a3b8',
            bgColor: 'rgba(148, 163, 184, 0.1)'
        };
    }
}

/**
 * Format accumulation number to readable string
 * @param {number} value - Accumulation value
 * @returns {string} Formatted string
 */
export function formatAccumulation(value) {
    const absValue = Math.abs(value);
    const sign = value >= 0 ? '+' : '-';

    if (absValue >= 1000000000) {
        return `${sign}${(absValue / 1000000000).toFixed(1)}B`;
    } else if (absValue >= 1000000) {
        return `${sign}${(absValue / 1000000).toFixed(1)}M`;
    } else if (absValue >= 1000) {
        return `${sign}${(absValue / 1000).toFixed(1)}K`;
    }
    return `${sign}${absValue}`;
}

export { FOREIGN_BROKERS };
