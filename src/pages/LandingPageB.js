// Landing Page B - Replicating evodigi.com/saham-autostock design
import { trackEvent } from '../utils/metaPixel.js';

const CHECKOUT_URL = 'https://dijital.web.id/autostocksai?discount_code=DISKON50';
const DEMO_VIDEO_URL = 'https://www.autostocksai.com/videos/demo.webp';

/**
 * Render the Landing Page B
 * @returns {string} HTML string
 */
export function renderLandingPageB() {
    return `
    <div class="lpb">
      <!-- ============ HERO SECTION ============ -->
      <section class="lpb-hero">
        <div class="lpb-hero-bg"></div>
        <div class="lpb-container lpb-hero-content">
          <span class="lpb-badge lpb-hero-badge">📊 POWERED BY AI TECHNOLOGY</span>
          <h1 class="lpb-hero-title">
            Trading Saham Cerdas<br/>
            <span class="lpb-green-text">Profit Terukur</span><br/>
            Didukung AI Otomatis
          </h1>
          <p class="lpb-hero-subtitle">
            Dapatkan sinyal trading saham Indonesia real-time lengkap dengan Entry, Take Profit (TP), dan Stop Loss (SL). Analisis teknikal otomatis tanpa ribet.
          </p>
          <div class="lpb-hero-cta">
            <a href="${CHECKOUT_URL}" class="lpb-btn lpb-btn-primary" id="lpb-hero-cta">Ambil Akses Sekarang 🚀</a>
            <a href="#lpb-features" class="lpb-btn lpb-btn-outline">Lihat Fitur Lengkap 👇</a>
          </div>
          <div class="lpb-hero-pills">
            <span class="lpb-pill">📊 Analisis Real-Time</span>
            <span class="lpb-pill">🎯 Entry, TP & SL Otomatis</span>
            <span class="lpb-pill">🤖 AI-Powered Signals</span>
          </div>
        </div>
      </section>

      <!-- ============ MARQUEE TICKER ============ -->
      <div class="lpb-marquee">
        <div class="lpb-marquee-track">
          <span>🎯 ENTRY + TP + SL</span>
          <span>📊 ANALISIS TEKNIKAL AI</span>
          <span>⚡ REAL-TIME UPDATE</span>
          <span>🏛️ SAHAM INDONESIA (IDX)</span>
          <span>🔒 RISK/REWARD 1:2+</span>
          <span>📱 SINYAL OTOMATIS</span>
          <span>🎯 ENTRY + TP + SL</span>
          <span>📊 ANALISIS TEKNIKAL AI</span>
          <span>⚡ REAL-TIME UPDATE</span>
          <span>🏛️ SAHAM INDONESIA (IDX)</span>
          <span>🔒 RISK/REWARD 1:2+</span>
          <span>📱 SINYAL OTOMATIS</span>
        </div>
      </div>

      <!-- ============ PAIN POINTS SECTION ============ -->
      <section class="lpb-section lpb-pain-section" id="lpb-problems">
        <div class="lpb-container">
          <span class="lpb-badge lpb-badge-warning">⚠️ MASALAH UMUM TRADER</span>
          <h2 class="lpb-section-title">Masih Trading Tanpa Arah?</h2>
          <p class="lpb-section-subtitle">Mayoritas trader retail kehilangan uang karena tidak punya sistem yang jelas. Apakah kamu juga mengalami ini?</p>
          <div class="lpb-pain-grid">
            <div class="lpb-pain-card">
              <div class="lpb-pain-icon">😤</div>
              <h3>Bingung Pilih Saham Mana</h3>
              <p>Ratusan saham di bursa, tapi gak tahu mana yang punya peluang naik tinggi dengan risiko terukur.</p>
            </div>
            <div class="lpb-pain-card">
              <div class="lpb-pain-icon">📉</div>
              <h3>Sering Cut Loss Terlambat</h3>
              <p>Tidak punya target SL yang jelas, akhirnya porto terus minus dan menumpuk floating loss.</p>
            </div>
            <div class="lpb-pain-card">
              <div class="lpb-pain-icon">⏰</div>
              <h3>Gak Sempat Analisis Setiap Hari</h3>
              <p>Sibuk kerja atau bisnis, gak punya waktu untuk pantau chart dan indikator teknikal setiap saat.</p>
            </div>
            <div class="lpb-pain-card">
              <div class="lpb-pain-icon">🎯</div>
              <h3>Ikut-ikutan Rekomendasi Asal</h3>
              <p>Percaya grup telegram atau influencer tanpa data yang valid, hasilnya malah buntung.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ SOLUTION INTRO ============ -->
      <section class="lpb-section lpb-solution-intro">
        <div class="lpb-container">
          <span class="lpb-badge lpb-badge-success">🤖 SOLUSI CERDAS</span>
          <h2 class="lpb-section-title">Perkenalkan, AutoStocks AI</h2>
          <p class="lpb-section-subtitle">Platform analisis teknikal saham Indonesia berbasis AI yang memberikan sinyal trading otomatis lengkap dengan Entry, Take Profit, dan Stop Loss.</p>
        </div>
      </section>

      <!-- ============ DEMO VIDEO SECTION ============ -->
      <section class="lpb-section lpb-demo-section">
        <div class="lpb-container">
          <span class="lpb-badge">🎬 DEMO PLATFORM</span>
          <h2 class="lpb-section-title">Lihat Cara Kerjanya</h2>
          <p class="lpb-section-subtitle">Tonton demo singkat bagaimana AutoStocks AI membantu kamu mendapatkan sinyal trading otomatis.</p>
          <div class="lpb-video-wrapper">
            <img src="${DEMO_VIDEO_URL}" alt="Demo AutoStocks AI" class="lpb-demo-video" loading="lazy" />
          </div>
        </div>
      </section>

      <!-- ============ FEATURES SECTION ============ -->
      <section class="lpb-section lpb-features-section" id="lpb-features">
        <div class="lpb-container">
          <span class="lpb-badge">✨ KENAPA AUTOSTOCKS AI?</span>
          <h2 class="lpb-section-title">Fitur Lengkap untuk Trading Lebih Cerdas</h2>
          <p class="lpb-section-subtitle">Semua yang kamu butuhkan untuk mengambil keputusan trading berbasis data, bukan feeling.</p>
          <div class="lpb-features-grid">
            <div class="lpb-feature-card">
              <div class="lpb-feature-icon">🤖</div>
              <h3>AI-Powered Signals</h3>
              <p>Sistem AI menganalisis ratusan saham secara otomatis berdasarkan indikator teknikal terpercaya.</p>
            </div>
            <div class="lpb-feature-card">
              <div class="lpb-feature-icon">🎯</div>
              <h3>Entry, TP & SL Jelas</h3>
              <p>Setiap sinyal dilengkapi titik Entry, Take Profit, dan Stop Loss yang sudah diperhitungkan.</p>
            </div>
            <div class="lpb-feature-card">
              <div class="lpb-feature-icon">📊</div>
              <h3>Multi-Indikator</h3>
              <p>Menggunakan RSI, MACD, EMA, dan volume analysis untuk validasi sinyal yang lebih akurat.</p>
            </div>
            <div class="lpb-feature-card">
              <div class="lpb-feature-icon">🏦</div>
              <h3>Data Broker Asing</h3>
              <p>Pantau akumulasi dan distribusi broker asing sebagai konfirmasi tambahan untuk sinyal trading.</p>
            </div>
            <div class="lpb-feature-card">
              <div class="lpb-feature-icon">⚡</div>
              <h3>Update Real-Time</h3>
              <p>Sinyal diperbarui secara real-time mengikuti pergerakan pasar saham Indonesia (IDX).</p>
            </div>
            <div class="lpb-feature-card">
              <div class="lpb-feature-icon">🔒</div>
              <h3>Risk/Reward ≥ 1:2</h3>
              <p>Setiap sinyal ditargetkan minimum risk/reward ratio 1:2 untuk menjaga profitabilitas jangka panjang.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ HOW TO USE (STEPS) ============ -->
      <section class="lpb-section lpb-steps-section">
        <div class="lpb-container">
          <span class="lpb-badge">📋 CARA PAKAI</span>
          <h2 class="lpb-section-title">Gampang Banget Cara Pakainya</h2>
          <p class="lpb-section-subtitle">Ikuti langkah simpel ini untuk mulai trading lebih cerdas dengan AI.</p>
          <div class="lpb-steps-timeline">
            <div class="lpb-step">
              <div class="lpb-step-content">
                <h3>🛒 Beli Akses AutoStocks AI</h3>
                <p>Pilih paket yang sesuai dan dapatkan akses ke dashboard sinyal trading instan.</p>
              </div>
              <div class="lpb-step-number">1</div>
            </div>
            <div class="lpb-step lpb-step-right">
              <div class="lpb-step-number">2</div>
              <div class="lpb-step-content">
                <h3>🔑 Login ke Dashboard</h3>
                <p>Akses dashboard AutoStocks AI melalui browser. Bisa di HP, tablet, atau laptop.</p>
              </div>
            </div>
            <div class="lpb-step">
              <div class="lpb-step-content">
                <h3>📊 Lihat Sinyal Trading</h3>
                <p>Dashboard menampilkan sinyal BUY lengkap dengan Entry, TP, SL, dan indikator pendukung.</p>
              </div>
              <div class="lpb-step-number">3</div>
            </div>
            <div class="lpb-step lpb-step-right">
              <div class="lpb-step-number">4</div>
              <div class="lpb-step-content">
                <h3>🚀 Eksekusi di Broker Kamu</h3>
                <p>Tinggal eksekusi order di aplikasi sekuritas kamu sesuai sinyal. Mudah dan terukur!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ STATS SECTION ============ -->
      <section class="lpb-section lpb-stats-section">
        <div class="lpb-container">
          <span class="lpb-badge">📈 TRACK RECORD</span>
          <h2 class="lpb-section-title">Data Bicara, Bukan Janji</h2>
          <p class="lpb-section-subtitle">AutoStocks AI dirancang untuk memaksimalkan peluang profit dengan manajemen risiko yang terukur.</p>
          <div class="lpb-stats-grid">
            <div class="lpb-stat-item">
              <div class="lpb-stat-value">100+</div>
              <div class="lpb-stat-label">Saham Dianalisis</div>
            </div>
            <div class="lpb-stat-item">
              <div class="lpb-stat-value">1:2+</div>
              <div class="lpb-stat-label">Min. Risk/Reward</div>
            </div>
            <div class="lpb-stat-item">
              <div class="lpb-stat-value">24/7</div>
              <div class="lpb-stat-label">AI Always On</div>
            </div>
            <div class="lpb-stat-item">
              <div class="lpb-stat-value">Real-Time</div>
              <div class="lpb-stat-label">Signal Update</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ COMPARISON SECTION ============ -->
      <section class="lpb-section lpb-compare-section">
        <div class="lpb-container">
          <span class="lpb-badge">⚖️ BANDINGKAN</span>
          <h2 class="lpb-section-title">Kenapa AutoStocks AI Lebih Unggul?</h2>
          <p class="lpb-section-subtitle">Bandingkan sendiri dengan cara trading lain yang biasa kamu pakai.</p>
          <div class="lpb-compare-grid">
            <div class="lpb-compare-card">
              <h3>📱 Grup Telegram</h3>
              <ul>
                <li class="lpb-compare-bad">❌ Rekomendasi tanpa data jelas</li>
                <li class="lpb-compare-bad">❌ Tidak ada SL yang terukur</li>
                <li class="lpb-compare-bad">❌ Admin bisa salah prediksi</li>
                <li class="lpb-compare-bad">❌ Bayar bulanan mahal</li>
              </ul>
            </div>
            <div class="lpb-compare-card">
              <h3>📰 Analisis Manual</h3>
              <ul>
                <li class="lpb-compare-bad">❌ Butuh waktu berjam-jam</li>
                <li class="lpb-compare-bad">❌ Harus paham banyak indikator</li>
                <li class="lpb-compare-bad">❌ Mudah bias oleh emosi</li>
                <li class="lpb-compare-bad">❌ Sering miss momentum</li>
              </ul>
            </div>
            <div class="lpb-compare-card lpb-compare-highlight">
              <h3>🤖 AutoStocks AI</h3>
              <ul>
                <li class="lpb-compare-good">✅ Sinyal berbasis data & AI</li>
                <li class="lpb-compare-good">✅ Entry, TP, SL lengkap</li>
                <li class="lpb-compare-good">✅ Tanpa emosi, pure analisis</li>
                <li class="lpb-compare-good">✅ Bayar sekali, akses selamanya</li>
                <li class="lpb-compare-good">✅ Update sinyal real-time</li>
                <li class="lpb-compare-good">✅ Multi-indikator terpercaya</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ TESTIMONIALS SECTION ============ -->
      <section class="lpb-section lpb-testimonials-section">
        <div class="lpb-container">
          <span class="lpb-badge">⭐ KATA MEREKA</span>
          <h2 class="lpb-section-title">Trader yang Sudah Merasakan Manfaatnya ⭐</h2>
          <p class="lpb-section-subtitle">Feedback real dari pengguna AutoStocks AI.</p>
          <div class="lpb-testimonials-grid">
            <div class="lpb-testimonial-card">
              <div class="lpb-stars">⭐⭐⭐⭐⭐</div>
              <p class="lpb-testimonial-text">"Sejak pakai AutoStocks AI, trading saya jauh lebih terarah. Sinyal Entry dan SL-nya sangat membantu untuk manage risiko. Worth it banget!"</p>
              <div class="lpb-testimonial-author">
                <div class="lpb-avatar lpb-avatar-a">A</div>
                <div>
                  <strong>Andi Saputra</strong>
                  <span>Swing Trader</span>
                </div>
              </div>
            </div>
            <div class="lpb-testimonial-card">
              <div class="lpb-stars">⭐⭐⭐⭐⭐</div>
              <p class="lpb-testimonial-text">"Gak perlu lagi analisis berjam-jam. Tinggal buka dashboard, cek sinyal, eksekusi. Simple dan hasilnya konsisten. Recommended!"</p>
              <div class="lpb-testimonial-author">
                <div class="lpb-avatar lpb-avatar-r">R</div>
                <div>
                  <strong>Rina Wijaya</strong>
                  <span>Part-Time Trader</span>
                </div>
              </div>
            </div>
            <div class="lpb-testimonial-card">
              <div class="lpb-stars">⭐⭐⭐⭐⭐</div>
              <p class="lpb-testimonial-text">"Data broker asing-nya sangat membantu. Saya bisa lihat saham mana yang sedang diakumulasi asing. Fitur yang jarang ada di tool lain."</p>
              <div class="lpb-testimonial-author">
                <div class="lpb-avatar lpb-avatar-b">B</div>
                <div>
                  <strong>Budi Santoso</strong>
                  <span>Investor Saham</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ PRICING SECTION ============ -->
      <section class="lpb-section lpb-pricing-section" id="lpb-offer">
        <div class="lpb-container">
          <span class="lpb-badge lpb-badge-success">💰 HARGA SPESIAL</span>
          <h2 class="lpb-section-title">Investasi Kecil, Profit Terukur</h2>
          <p class="lpb-section-subtitle">Bayar sekali, akses sinyal trading AI seumur hidup. Tanpa biaya langganan bulanan.</p>
          <div class="lpb-pricing-card">
            <div class="lpb-pricing-ribbon">BEST DEAL</div>
            <div class="lpb-pricing-header">
              <div class="lpb-price-strike">Rp 247.000</div>
              <div class="lpb-price-main">
                <span class="lpb-price-amount">Rp 197.000</span>
                <span class="lpb-price-period">/lifetime</span>
              </div>
            </div>
            <ul class="lpb-pricing-features">
              <li>✅ Akses Dashboard Sinyal Trading AI</li>
              <li>✅ Sinyal Entry, Take Profit & Stop Loss Otomatis</li>
              <li>✅ Analisis Multi-Indikator (RSI, MACD, EMA)</li>
              <li>✅ Data Akumulasi Broker Asing</li>
              <li>✅ Update Sinyal Real-Time</li>
              <li>✅ Akses via HP, Tablet & Laptop</li>
              <li>🎁 Bonus: Tutorial Trading untuk Pemula</li>
              <li>🎁 Bonus: Tips Money Management</li>
            </ul>
            <a href="${CHECKOUT_URL}" class="lpb-btn lpb-btn-primary lpb-btn-large lpb-btn-pricing" id="lpb-pricing-cta">
              AMBIL AKSES SEKARANG — Rp 197.000 LIFETIME →
            </a>
            <p class="lpb-pricing-note">🔒 Akses dikirim instan ke email kamu setelah pembayaran berhasil.</p>
          </div>
        </div>
      </section>

      <!-- ============ FAQ SECTION ============ -->
      <section class="lpb-section lpb-faq-section" id="lpb-faq">
        <div class="lpb-container">
          <span class="lpb-badge">❓ FAQ</span>
          <h2 class="lpb-section-title">Pertanyaan yang Sering Muncul</h2>
          <p class="lpb-section-subtitle">Jawaban untuk hal-hal yang mungkin kamu tanyakan sebelum bergabung.</p>
          <div class="lpb-faq-list">
            <div class="lpb-faq-item">
              <button class="lpb-faq-question">
                <span>Apakah cocok untuk pemula yang baru belajar saham?</span>
                <span class="lpb-faq-arrow">▼</span>
              </button>
              <div class="lpb-faq-answer">
                <p>Sangat cocok! AutoStocks AI dirancang agar mudah dipahami bahkan oleh pemula. Sinyal yang diberikan sudah lengkap dengan titik Entry, Take Profit, dan Stop Loss, jadi kamu tinggal eksekusi tanpa perlu analisis yang rumit. Ditambah bonus tutorial trading untuk pemula.</p>
              </div>
            </div>
            <div class="lpb-faq-item">
              <button class="lpb-faq-question">
                <span>Saham apa saja yang dianalisis?</span>
                <span class="lpb-faq-arrow">▼</span>
              </button>
              <div class="lpb-faq-answer">
                <p>AutoStocks AI menganalisis 100+ saham yang terdaftar di Bursa Efek Indonesia (IDX), termasuk saham-saham blue chip dan saham dengan likuiditas tinggi. Fokus analisis pada saham yang punya potensi pergerakan signifikan.</p>
              </div>
            </div>
            <div class="lpb-faq-item">
              <button class="lpb-faq-question">
                <span>Apakah ada biaya langganan bulanan?</span>
                <span class="lpb-faq-arrow">▼</span>
              </button>
              <div class="lpb-faq-answer">
                <p>Tidak ada! Kamu cukup bayar sekali saja dan mendapatkan akses lifetime ke dashboard AutoStocks AI. Tidak ada biaya langganan bulanan atau tahunan.</p>
              </div>
            </div>
            <div class="lpb-faq-item">
              <button class="lpb-faq-question">
                <span>Bagaimana cara akses dashboard setelah pembayaran?</span>
                <span class="lpb-faq-arrow">▼</span>
              </button>
              <div class="lpb-faq-answer">
                <p>Setelah pembayaran berhasil, kamu akan menerima email berisi link akses dan kredensial login ke dashboard AutoStocks AI. Akses dikirim secara instan otomatis.</p>
              </div>
            </div>
            <div class="lpb-faq-item">
              <button class="lpb-faq-question">
                <span>Apakah sinyal dijamin selalu profit?</span>
                <span class="lpb-faq-arrow">▼</span>
              </button>
              <div class="lpb-faq-answer">
                <p>Tidak ada sistem trading yang bisa menjamin 100% profit. Namun, AutoStocks AI dirancang dengan risk/reward ratio minimum 1:2 dan menggunakan multi-indikator untuk meningkatkan probabilitas keberhasilan. Manajemen risiko tetap kunci utama dalam trading.</p>
              </div>
            </div>
            <div class="lpb-faq-item">
              <button class="lpb-faq-question">
                <span>Bisa dipakai di broker / sekuritas mana saja?</span>
                <span class="lpb-faq-arrow">▼</span>
              </button>
              <div class="lpb-faq-answer">
                <p>AutoStocks AI memberikan sinyal trading yang bisa kamu eksekusi di broker/sekuritas manapun yang kamu gunakan, seperti Ajaib, Stockbit, IPOT, Mirae Asset, BCA Sekuritas, dan lainnya.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ FINAL CTA SECTION ============ -->
      <section class="lpb-section lpb-final-section">
        <div class="lpb-container">
          <h2 class="lpb-section-title">Bayangkan Ini...</h2>
          <p class="lpb-section-subtitle">Pagi ini kamu buka dashboard AutoStocks AI, cek sinyal, dan eksekusi 2-3 saham pilihan AI. Sore hari, kamu cek porto dan lihat hijau semua. Tanpa stress, tanpa analisis berjam-jam.</p>
          <div class="lpb-final-compare">
            <div class="lpb-final-card lpb-final-bad">
              <h3>❌ Trader Tanpa Sistem</h3>
              <ul>
                <li>❌ Bingung pilih saham setiap hari</li>
                <li>❌ Sering terjebak saham nyangkut</li>
                <li>❌ Cut loss telat, profit kecil</li>
              </ul>
            </div>
            <div class="lpb-final-card lpb-final-good">
              <h3>✅ Trader Pakai AutoStocks AI</h3>
              <ul>
                <li>✅ Sinyal jelas tinggal eksekusi</li>
                <li>✅ Risk terukur dengan SL otomatis</li>
                <li>✅ Trading konsisten dan profitable</li>
                <li>✅ Waktu lebih banyak untuk hal lain</li>
              </ul>
            </div>
          </div>
          <p class="lpb-final-urgency">Investasi Rp 197.000 hari ini bisa mengubah cara kamu trading selamanya. Jangan tunggu market tutup.</p>
          <a href="${CHECKOUT_URL}" class="lpb-btn lpb-btn-primary lpb-btn-large" id="lpb-final-cta">
            AMBIL AKSES SEKARANG — RP 197.000 LIFETIME →
          </a>
        </div>
      </section>

      <!-- ============ FOOTER ============ -->
      <footer class="lpb-footer">
        <div class="lpb-container">
          <p>© 2026 AutoStocks AI — Powered by Evodigi.com. All rights reserved.</p>
        </div>
      </footer>

      <!-- ============ STICKY BOTTOM BAR ============ -->
      <div class="lpb-sticky-bar">
        <div class="lpb-sticky-price">
          <span class="lpb-sticky-old">Rp 247.000</span>
          <span class="lpb-sticky-new">Rp 197.000</span>
        </div>
        <a href="${CHECKOUT_URL}" class="lpb-btn lpb-btn-primary lpb-sticky-btn" id="lpb-sticky-cta">Ambil Akses →</a>
      </div>

      <!-- ============ SOCIAL PROOF NOTIFICATION ============ -->
      <div class="lpb-social-proof" id="lpb-social-proof">
        <div class="lpb-sp-avatar">A</div>
        <div class="lpb-sp-content">
          <strong>Andi S.</strong>
          <span>✅ Baru saja bergabung • 3 menit lalu</span>
        </div>
        <button class="lpb-sp-close" id="lpb-sp-close">×</button>
      </div>
    </div>
  `;
}

/**
 * Attach event listeners for Landing Page B
 */
export function attachLandingPageBListeners() {
    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('#lpb-hero-cta, #lpb-pricing-cta, #lpb-final-cta, #lpb-sticky-cta');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('InitiateCheckout', { content_name: 'AutoStocks AI LPB' });
        });
    });

    // FAQ accordion
    const faqItems = document.querySelectorAll('.lpb-faq-question');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            const isOpen = parent.classList.contains('lpb-faq-open');

            // Close all
            document.querySelectorAll('.lpb-faq-item').forEach(faq => faq.classList.remove('lpb-faq-open'));

            // Toggle clicked
            if (!isOpen) {
                parent.classList.add('lpb-faq-open');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('.lpb a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Social proof notification
    const socialProof = document.getElementById('lpb-social-proof');
    const closeBtn = document.getElementById('lpb-sp-close');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            socialProof.classList.remove('lpb-sp-show');
        });
    }

    // Show social proof after 5 seconds
    const names = [
        { name: 'Andi S.', time: '3 menit lalu' },
        { name: 'Rina W.', time: '7 menit lalu' },
        { name: 'Budi P.', time: '12 menit lalu' },
        { name: 'Dina P.', time: '21 menit lalu' },
        { name: 'Hadi K.', time: '35 menit lalu' },
    ];
    let spIndex = 0;

    function showSocialProof() {
        if (!socialProof) return;
        const person = names[spIndex % names.length];
        const avatar = socialProof.querySelector('.lpb-sp-avatar');
        const content = socialProof.querySelector('.lpb-sp-content');
        avatar.textContent = person.name.charAt(0);
        content.innerHTML = `<strong>${person.name}</strong><span>✅ Baru saja bergabung • ${person.time}</span>`;
        socialProof.classList.add('lpb-sp-show');
        spIndex++;

        setTimeout(() => {
            socialProof.classList.remove('lpb-sp-show');
        }, 5000);
    }

    setTimeout(showSocialProof, 5000);
    setInterval(() => {
        setTimeout(showSocialProof, Math.random() * 3000);
    }, 15000);

    // Track ViewContent
    trackEvent('ViewContent', { content_name: 'Landing Page B' });
}
