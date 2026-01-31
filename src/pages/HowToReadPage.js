// Tutorial Page Component - Comprehensive guide for using AutoStocks AI

import { renderTooltip, TOOLTIP_DEFINITIONS } from '../components/Tooltip.js';

/**
 * Render the Tutorial page with step-by-step guide
 * @returns {string} HTML string
 */
export function renderHowToReadPage() {
  return `
    <div class="tutorial-page">
      <!-- Header -->
      <div class="tutorial-header">
        <h1>📚 Tutorial AutoStocks AI</h1>
        <p>Panduan lengkap untuk menggunakan tools analisis saham Indonesia. Cocok untuk pemula!</p>
      </div>
      
      <!-- Step 1: Homepage Overview -->
      <section class="tutorial-section">
        <h2>📍 Step 1: Mengenal Halaman Utama</h2>
        <div class="tutorial-card">
          <img src="/images/tutorial_homepage.png" alt="Homepage AutoStocks AI" class="tutorial-image">
          
          <div class="tutorial-step">
            <div class="tutorial-step-number">1</div>
            <div class="tutorial-step-content">
              <h4>Hero Section - Statistik Ringkas</h4>
              <p>Di bagian atas, kamu bisa lihat ringkasan: jumlah saham, sinyal <strong style="color: var(--success);">BUY</strong>, dan <strong style="color: var(--warning);">Watchlist</strong>. Data diambil langsung dari Yahoo Finance (lihat di footer).</p>
            </div>
          </div>
          
          <div class="tutorial-step">
            <div class="tutorial-step-number">2</div>
            <div class="tutorial-step-content">
              <h4>Filter Signal</h4>
              <p>Gunakan filter untuk menyaring saham: <strong>All</strong> (semua), <strong>Buy</strong> (sinyal beli), atau <strong>Watchlist</strong> (pantau dulu).</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Step 2: Understanding Signals -->
      <section class="tutorial-section">
        <h2>🚦 Step 2: Memahami Sinyal Trading</h2>
        <div class="tutorial-card">
          <h3>Ada 2 Jenis Sinyal:</h3>
          <div class="term-grid">
            <div class="term-item" style="border-left: 4px solid var(--success);">
              <strong style="color: var(--success);">BUY</strong>
              <p>Saham menunjukkan potensi naik berdasarkan analisis teknikal. Bisa pertimbangkan untuk entry sesuai Trading Plan.</p>
            </div>
            <div class="term-item" style="border-left: 4px solid var(--warning);">
              <strong style="color: var(--warning);">Watchlist</strong>
              <p>Pantau perkembangan dulu. Tunggu konfirmasi lebih lanjut sebelum entry. Belum kuat untuk beli.</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Step 3: Reading Stock Cards -->
      <section class="tutorial-section">
        <h2>📊 Step 3: Membaca Kartu Saham</h2>
        <div class="tutorial-card">
          <h3>Komponen Kartu Saham:</h3>
          <div class="tutorial-step">
            <div class="tutorial-step-number">A</div>
            <div class="tutorial-step-content">
              <h4>Ticker & Nama</h4>
              <p>Kode saham (contoh: BBNI) dan nama perusahaan. Klik kartu untuk detail lebih lengkap.</p>
            </div>
          </div>
          
          <div class="tutorial-step">
            <div class="tutorial-step-number">B</div>
            <div class="tutorial-step-content">
              <h4>Signal Badge</h4>
              <p><strong style="color: var(--success);">BUY</strong> = Potensi naik, bisa entry. <strong style="color: var(--warning);">Watchlist</strong> = Tunggu konfirmasi.</p>
            </div>
          </div>
          
          <div class="tutorial-step">
            <div class="tutorial-step-number">C</div>
            <div class="tutorial-step-content">
              <h4>Entry / TP / SL</h4>
              <p><strong>Entry</strong>: Harga beli yang disarankan. <strong>TP (Take Profit)</strong>: Target jual untuk profit. <strong>SL (Stop Loss)</strong>: Batas jual untuk batasi kerugian (-2.5% s/d -5.5% dari entry).</p>
            </div>
          </div>
          
          <div class="tutorial-step">
            <div class="tutorial-step-number">D</div>
            <div class="tutorial-step-content">
              <h4>Risk/Reward Ratio</h4>
              <p>Perbandingan risiko vs potensi profit. <strong>R/R 1:2</strong> artinya potensi profit 2x lipat dari risiko. Minimum 1:2!</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Step 4: Stock Detail Page -->
      <section class="tutorial-section">
        <h2>📈 Step 4: Halaman Detail Saham</h2>
        <div class="tutorial-card">
          <img src="/images/tutorial_detail.png" alt="Stock Detail Page" class="tutorial-image">
          
          <h3>Fitur di Halaman Detail:</h3>
          <div class="term-grid">
            <div class="term-item">
              <strong>Score Profile (0-100)</strong>
              <p>Skor kualitas sinyal. 80+ = Sangat Bagus, 65+ = Bagus, 50+ = Cukup</p>
            </div>
            <div class="term-item">
              <strong>Trading Plan</strong>
              <p>Entry, TP, SL dengan persentase. SL dinamis -2.5% s/d -5.5% berdasarkan support level</p>
            </div>
            <div class="term-item">
              <strong>TradingView Chart</strong>
              <p>Chart interaktif dari TradingView untuk analisis lebih lanjut</p>
            </div>
            <div class="term-item">
              <strong>Indikator Teknikal</strong>
              <p>RSI, MACD, EMA, Volume Ratio, dan Foreign Flow</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Step 5: News & Tips -->
      <section class="tutorial-section">
        <h2>📰 Step 5: Berita & Tips</h2>
        <div class="tutorial-card">
          <img src="/images/tutorial_news.png" alt="News Section" class="tutorial-image">
          
          <div class="tutorial-step">
            <div class="tutorial-step-number">1</div>
            <div class="tutorial-step-content">
              <h4>Berita Terkait (Live dari Google News)</h4>
              <p>Berita terbaru tentang saham dari berbagai sumber. Klik untuk baca artikel lengkap.</p>
            </div>
          </div>
          
          <div class="tutorial-step">
            <div class="tutorial-step-number">2</div>
            <div class="tutorial-step-content">
              <h4>Tips untuk Pemula</h4>
              <p>Panduan singkat tentang cara trading yang benar: kapan entry, wajib pasang SL, jangan all-in.</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Glossary Section -->
      <section class="tutorial-section">
        <h2>📖 Glosarium Istilah</h2>
        <div class="tutorial-card">
          <h3>Indikator Teknikal:</h3>
          <div class="term-grid">
            <div class="term-item">
              <strong>RSI (Relative Strength Index)</strong>
              <p>Indikator momentum 0-100. <30 = Oversold, >70 = Overbought</p>
            </div>
            <div class="term-item">
              <strong>MACD</strong>
              <p>Indikator tren. MACD di atas Signal = Bullish, di bawah = Bearish</p>
            </div>
            <div class="term-item">
              <strong>EMA (Moving Average)</strong>
              <p>Rata-rata harga. EMA20 = jangka pendek, EMA50 = jangka menengah</p>
            </div>
            <div class="term-item">
              <strong>Volume Ratio</strong>
              <p>Volume vs rata-rata. >1.5x = Volume tinggi (konfirmasi kuat)</p>
            </div>
          </div>
          
          <h3 style="margin-top: var(--spacing-xl);">Foreign Flow:</h3>
          <div class="term-grid">
            <div class="term-item">
              <strong>Akumulasi Asing</strong>
              <p>Broker asing (AK, BK, ZP) lebih banyak beli = Smart money masuk</p>
            </div>
            <div class="term-item">
              <strong>Distribusi Asing</strong>
              <p>Broker asing lebih banyak jual = Smart money keluar (hati-hati!)</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Best Practices -->
      <section class="tutorial-section">
        <h2>💡 Tips Trading untuk Pemula</h2>
        <div class="tutorial-card" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.05)); border-color: var(--primary-500);">
          <div class="tutorial-step">
            <div class="tutorial-step-number">1</div>
            <div class="tutorial-step-content">
              <h4>WAJIB Pasang Stop Loss</h4>
              <p>Ini yang paling penting! Kerugian kecil (2.5-5.5%) lebih baik dari kerugian besar.</p>
            </div>
          </div>
          
          <div class="tutorial-step">
            <div class="tutorial-step-number">2</div>
            <div class="tutorial-step-content">
              <h4>Jangan All-In</h4>
              <p>Maksimal 10-20% modal per posisi. Diversifikasi ke 5-10 saham.</p>
            </div>
          </div>
          
          <div class="tutorial-step">
            <div class="tutorial-step-number">3</div>
            <div class="tutorial-step-content">
              <h4>Cari R/R Minimal 1:2</h4>
              <p>Dengan R/R 1:2, kamu hanya perlu menang 40% untuk tetap profit jangka panjang.</p>
            </div>
          </div>
          
          <div class="tutorial-step">
            <div class="tutorial-step-number">4</div>
            <div class="tutorial-step-content">
              <h4>Sabar & Disiplin</h4>
              <p>Tidak semua sinyal profit. Fokus pada win rate jangka panjang dan konsisten.</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Disclaimer -->
      <section class="tutorial-section">
        <div class="tutorial-card" style="background: rgba(239, 68, 68, 0.1); border-color: rgba(239, 68, 68, 0.3);">
          <h3 style="color: var(--danger); margin-bottom: var(--spacing-md);">⚠️ Disclaimer</h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.7;">
            AutoStocks AI adalah tools edukasi dan analisis teknikal. <strong>Bukan saran investasi</strong>. 
            Trading saham mengandung risiko kerugian. Selalu lakukan riset mandiri (DYOR) 
            dan konsultasikan dengan penasihat keuangan berlisensi sebelum membuat keputusan investasi.
          </p>
        </div>
      </section>
    </div>
  `;
}
