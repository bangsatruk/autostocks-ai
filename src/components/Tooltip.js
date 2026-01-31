// Tooltip Component - Educational tooltips for technical terms

// Tooltip definitions for technical terms
export const TOOLTIP_DEFINITIONS = {
    // Trading Signals
    'strong-buy': {
        term: 'STRONG BUY',
        definition: 'Sinyal beli sangat kuat. Semua indikator teknikal menunjukkan momentum bullish dengan konfirmasi volume tinggi dan akumulasi asing.',
        tip: '💡 Pertimbangkan untuk entry dengan position size lebih besar'
    },
    'buy': {
        term: 'BUY',
        definition: 'Sinyal beli. Mayoritas indikator menunjukkan potensi kenaikan harga dalam waktu dekat.',
        tip: '💡 Entry sesuai target, jangan lupa pasang stop loss'
    },
    'hold': {
        term: 'HOLD',
        definition: 'Kondisi netral. Tidak ada sinyal yang jelas ke arah manapun.',
        tip: '💡 Tunggu konfirmasi sebelum mengambil posisi'
    },
    'sell': {
        term: 'SELL',
        definition: 'Sinyal jual. Indikator menunjukkan potensi penurunan harga.',
        tip: '⚠️ Pertimbangkan untuk taking profit atau exit posisi'
    },
    'strong-sell': {
        term: 'STRONG SELL',
        definition: 'Sinyal jual sangat kuat. Semua indikator menunjukkan momentum bearish.',
        tip: '⚠️ Hindari entry, pertimbangkan untuk exit segera'
    },

    // Technical Indicators
    'rsi': {
        term: 'RSI (Relative Strength Index)',
        definition: 'Indikator momentum yang mengukur kecepatan perubahan harga. Skala 0-100.',
        tip: '📊 RSI < 30 = Oversold (potensi naik), RSI > 70 = Overbought (potensi turun)'
    },
    'macd': {
        term: 'MACD',
        definition: 'Moving Average Convergence Divergence. Indikator yang menunjukkan momentum dan arah tren.',
        tip: '📊 MACD crossing di atas Signal = bullish, di bawah = bearish'
    },
    'ema': {
        term: 'EMA (Exponential Moving Average)',
        definition: 'Rata-rata harga yang lebih responsif terhadap pergerakan harga terbaru.',
        tip: '📊 Harga di atas EMA = tren naik, di bawah EMA = tren turun'
    },
    'golden-cross': {
        term: 'Golden Cross',
        definition: 'Ketika EMA jangka pendek (EMA20) memotong ke atas EMA jangka panjang (EMA50). Sinyal bullish kuat.',
        tip: '✨ Golden Cross sering diikuti kenaikan harga signifikan'
    },
    'death-cross': {
        term: 'Death Cross',
        definition: 'Ketika EMA jangka pendek (EMA20) memotong ke bawah EMA jangka panjang (EMA50). Sinyal bearish.',
        tip: '⚠️ Death Cross sering diikuti penurunan harga'
    },

    // Trading Terms
    'entry': {
        term: 'Entry Price',
        definition: 'Harga yang disarankan untuk membeli saham. Dihitung berdasarkan support level dan EMA.',
        tip: '💡 Beli di area entry atau sedikit di bawahnya, jangan kejar harga'
    },
    'take-profit': {
        term: 'Take Profit (TP)',
        definition: 'Target harga untuk menjual dan mengambil keuntungan.',
        tip: '💡 Pertimbangkan jual sebagian (50%) saat TP1 tercapai'
    },
    'stop-loss': {
        term: 'Stop Loss (SL)',
        definition: 'Batas harga untuk menjual dan membatasi kerugian jika harga turun.',
        tip: '⚠️ WAJIB pasang stop loss. Kerugian kecil lebih baik dari kebangkrutan'
    },
    'risk-reward': {
        term: 'Risk/Reward Ratio',
        definition: 'Perbandingan antara risiko (jarak ke SL) dan potensi profit (jarak ke TP).',
        tip: '💡 Cari setup dengan R/R minimal 1:2. Artinya potensi profit 2x lipat dari risiko'
    },

    // Strategy Types
    'momentum': {
        term: 'Momentum Strategy',
        definition: 'Strategi mengikuti arah tren yang sedang kuat dengan konfirmasi volume.',
        tip: '🚀 Entry saat tren sudah terbentuk, exit saat momentum melemah'
    },
    'reversal': {
        term: 'Reversal Strategy',
        definition: 'Strategi mencari titik balik dari kondisi oversold atau overbought.',
        tip: '🔄 Entry saat RSI ekstrem + ada konfirmasi candle pembalikan'
    },
    'breakout': {
        term: 'Breakout Strategy',
        definition: 'Strategi entry saat harga menembus level resistance atau support dengan volume tinggi.',
        tip: '💥 Tunggu konfirmasi breakout (candle close di atas resistance)'
    },

    // Foreign Flow
    'foreign-accumulation': {
        term: 'Foreign Accumulation',
        definition: 'Net beli broker asing dalam periode tertentu. Broker asing (AK, BK, ZP) dianggap smart money.',
        tip: '🌍 Akumulasi asing = smart money masuk, distribusi = smart money keluar'
    },
    'smart-money': {
        term: 'Smart Money',
        definition: 'Investor institusional besar yang dianggap lebih informed tentang pergerakan pasar.',
        tip: '🧠 Mengikuti smart money bisa meningkatkan probabilitas profit'
    }
};

/**
 * Render a tooltip wrapper around text
 * @param {string} text - Text to display
 * @param {string} tooltipKey - Key from TOOLTIP_DEFINITIONS
 * @returns {string} HTML string
 */
export function renderTooltip(text, tooltipKey) {
    const tooltip = TOOLTIP_DEFINITIONS[tooltipKey];
    if (!tooltip) return text;

    return `
    <span class="tooltip-wrapper" data-tooltip="${tooltipKey}">
      ${text}
      <span class="tooltip-icon">ⓘ</span>
      <div class="tooltip-content">
        <div class="tooltip-term">${tooltip.term}</div>
        <div class="tooltip-definition">${tooltip.definition}</div>
        ${tooltip.tip ? `<div class="tooltip-tip">${tooltip.tip}</div>` : ''}
      </div>
    </span>
  `;
}

/**
 * Initialize tooltips - attach event listeners for mobile tap
 */
export function initTooltips() {
    document.querySelectorAll('.tooltip-wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other tooltips
            document.querySelectorAll('.tooltip-wrapper.active').forEach(other => {
                if (other !== wrapper) other.classList.remove('active');
            });
            wrapper.classList.toggle('active');
        });
    });

    // Close tooltips when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.tooltip-wrapper.active').forEach(wrapper => {
            wrapper.classList.remove('active');
        });
    });
}
