// News Service - Fetch real news from Google News via RSS
// Uses RSS2JSON API as a proxy for Google News RSS

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json';
const GOOGLE_NEWS_RSS = 'https://news.google.com/rss/search?q=';

// Cache news for 30 minutes
const NEWS_CACHE_KEY = 'autostocks_news_cache';
const NEWS_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Fetch news for a specific stock ticker
 * @param {string} ticker - Stock ticker
 * @param {string} companyName - Company name for better search results
 * @returns {Promise<Array>} Array of news articles
 */
export async function fetchStockNews(ticker, companyName) {
    // Check cache first
    const cacheKey = `${NEWS_CACHE_KEY}_${ticker}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < NEWS_CACHE_DURATION) {
            console.log(`Using cached news for ${ticker}`);
            return data;
        }
    }

    try {
        // Search query - combine ticker and company name for better results
        const searchQuery = encodeURIComponent(`${ticker} saham OR ${companyName} saham Indonesia`);
        const rssUrl = `${GOOGLE_NEWS_RSS}${searchQuery}&hl=id&gl=ID&ceid=ID:id`;

        // Use RSS2JSON to convert RSS to JSON (avoids CORS)
        const apiUrl = `${RSS2JSON_API}?rss_url=${encodeURIComponent(rssUrl)}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status !== 'ok' || !data.items) {
            throw new Error('Invalid RSS response');
        }

        // Parse and format news items
        const news = data.items.slice(0, 5).map(item => ({
            title: cleanTitle(item.title),
            source: item.author || extractSource(item.title),
            link: item.link,
            pubDate: formatRelativeTime(new Date(item.pubDate)),
            thumbnail: item.thumbnail || item.enclosure?.link || null
        }));

        // Cache the results
        localStorage.setItem(cacheKey, JSON.stringify({
            data: news,
            timestamp: Date.now()
        }));

        console.log(`Fetched ${news.length} news for ${ticker}`);
        return news;

    } catch (error) {
        console.error(`Error fetching news for ${ticker}:`, error);
        return getFallbackNews(ticker, companyName);
    }
}

/**
 * Clean title from Google News format (removes source suffix)
 */
function cleanTitle(title) {
    // Google News often appends " - Source Name" at the end
    const parts = title.split(' - ');
    if (parts.length > 1) {
        parts.pop(); // Remove last part (source)
        return parts.join(' - ');
    }
    return title;
}

/**
 * Extract source name from title
 */
function extractSource(title) {
    const parts = title.split(' - ');
    if (parts.length > 1) {
        return parts[parts.length - 1];
    }
    return 'Berita';
}

/**
 * Format date to relative time (e.g., "2 jam lalu")
 */
function formatRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
        return `${diffMins} menit lalu`;
    } else if (diffHours < 24) {
        return `${diffHours} jam lalu`;
    } else if (diffDays < 7) {
        return `${diffDays} hari lalu`;
    } else {
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    }
}

/**
 * Fallback news when API fails
 */
function getFallbackNews(ticker, companyName) {
    const now = new Date();
    return [
        {
            title: `Analisis teknikal ${ticker}: Pantau level support dan resistance`,
            source: 'AutoStocks AI',
            link: '#',
            pubDate: formatRelativeTime(now),
            thumbnail: null
        },
        {
            title: `${companyName} - Update pergerakan harga terkini`,
            source: 'AutoStocks AI',
            link: '#',
            pubDate: formatRelativeTime(new Date(now - 3600000)),
            thumbnail: null
        },
        {
            title: `Rekomendasi saham sektor terkait ${ticker}`,
            source: 'AutoStocks AI',
            link: '#',
            pubDate: formatRelativeTime(new Date(now - 7200000)),
            thumbnail: null
        }
    ];
}

/**
 * Clear news cache
 */
export function clearNewsCache(ticker = null) {
    if (ticker) {
        localStorage.removeItem(`${NEWS_CACHE_KEY}_${ticker}`);
    } else {
        // Clear all news cache
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(NEWS_CACHE_KEY)) {
                localStorage.removeItem(key);
            }
        });
    }
}
