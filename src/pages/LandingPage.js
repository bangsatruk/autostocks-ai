// Landing Page Component - P.A.S Method (Problem, Agitation, Solution)

/**
 * Render the Landing Page with P.A.S structure
 * @returns {string} HTML string
 */
export function renderLandingPage() {
  return `
    <div class="landing-page">
      <!-- Hero Section -->
      <section class="landing-hero">
        <div class="landing-container">
          <div class="hero-badge">🚀 Tools Trading AI Saham Indonesia</div>
          <h1 class="landing-title">
            Capek Trading Saham<br>
            <span class="gradient-text pain">Rugi Terus?</span>
          </h1>
          <p class="landing-subtitle">
            Dapatkan sinyal trading saham Indonesia lengkap dengan Entry, Take Profit, dan Stop Loss. 
            Hemat waktu riset berjam-jam!
          </p>
          <div class="hero-cta">
            <a href="#checkout" class="cta-button primary green">
              <span>🔥 Akses Sekarang</span>
            </a>
            <a href="#demo" class="cta-button secondary">
              <span>🎬 Lihat Demo</span>
            </a>
          </div>

        </div>
      </section>

      <!-- Problem Section -->
      <section class="landing-section problem-section">
        <div class="landing-container">

          <h2 class="section-heading">Apakah Kamu Mengalami Ini?</h2>
          
          <div class="problem-grid">
            <div class="problem-card">
              <div class="problem-icon">⏰</div>
              <h3><span class="text-danger">Capek</span> Riset Berjam-jam</h3>
              <p>Menghabiskan waktu berjam-jam menganalisis chart, tapi hasilnya tetap tidak pasti. Waktu yang bisa dipakai untuk hal lain.</p>
            </div>
            <div class="problem-card">
              <div class="problem-icon">😵</div>
              <h3><span class="text-danger">Bingung</span> Kapan Beli & Jual</h3>
              <p>Tidak tahu kapan waktu yang tepat untuk entry dan exit. Sering terlambat beli atau terlalu cepat jual.</p>
            </div>
            <div class="problem-card">
              <div class="problem-icon">📉</div>
              <h3>Sering <span class="text-danger">Cut Loss Besar</span></h3>
              <p>Tidak punya plan yang jelas, akhirnya cut loss di harga yang salah atau malah hold saham nyangkut.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Agitation Section -->
      <section class="landing-section agitation-section">
        <div class="landing-container">

          <h2 class="section-heading">Tanpa Sistem, Trading = Gambling</h2>
          
          <div class="agitation-content">
            <div class="stat-highlight">
              <div class="big-stat">80%</div>
              <p>Retail trader <strong class="text-danger">rugi</strong> karena trading tanpa sistem yang jelas</p>
            </div>
            
            <div class="agitation-points">
              <div class="agitation-point">
                <span class="point-icon">❌</span>
                <p>Entry tanpa target → tidak tahu kapan ambil profit</p>
              </div>
              <div class="agitation-point">
                <span class="point-icon">❌</span>
                <p>Tidak pasang Stop Loss → kerugian membesar</p>
              </div>
              <div class="agitation-point">
                <span class="point-icon">❌</span>
                <p>FOMO beli di harga pucuk → nyangkut lama</p>
              </div>
              <div class="agitation-point">
                <span class="point-icon">❌</span>
                <p>Riset manual memakan waktu → kehilangan momentum</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Solution Section -->
      <section class="landing-section solution-section">
        <div class="landing-container">

          <h2 class="section-heading">AutoStocks AI - Trading Jadi Simpel</h2>
          
          <div class="solution-grid">
            <div class="solution-card">
              <div class="solution-icon">🎯</div>
              <h3>Entry, TP, SL <span class="text-success">Otomatis</span></h3>
              <p>Setiap sinyal sudah dilengkapi target harga. Tinggal eksekusi, tidak perlu hitung manual.</p>
            </div>
            <div class="solution-card">
              <div class="solution-icon">⚖️</div>
              <h3>Risk/Reward <span class="text-success">Min 1:2</span></h3>
              <p>Semua sinyal dijamin punya R/R minimal 1:2. Potensi profit selalu lebih besar dari risiko.</p>
            </div>
            <div class="solution-card">
              <div class="solution-icon">📊</div>
              <h3>Data Real-time Yahoo Finance</h3>
              <p>Data harga dan volume langsung dari Yahoo Finance. Bukan data delay atau manual input.</p>
            </div>
            <div class="solution-card">
              <div class="solution-icon">🔔</div>
              <h3>Sinyal BUY & Watchlist</h3>
              <p>Saham dikategorikan jelas: BUY (siap entry) atau Watchlist (pantau dulu).</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Demo Video Section -->
      <section id="demo" class="landing-section demo-section">
        <div class="landing-container">

          <h2 class="section-heading">Lihat Cara Kerjanya</h2>
          
          <div class="video-container">
            <div class="video-placeholder" id="demoVideo">
              <img src="/images/tutorial_homepage.webp" alt="AutoStocks AI Demo" class="demo-image" loading="lazy">
              <div class="play-overlay">
                <div class="play-button">▶️</div>
                <span>Klik untuk lihat demo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Screenshot Section -->
      <section class="landing-section features-section">
        <div class="landing-container">

          <h2 class="section-heading">Semua yang Kamu Butuhkan</h2>
          
          <div class="features-showcase">
            <div class="feature-item">
              <div class="feature-image">
                <img src="/images/tutorial_homepage.webp" alt="Dashboard Trading Signals" loading="lazy">
              </div>
              <div class="feature-content">
                <h3>📊 Dashboard Trading Signals</h3>
                <p>Lihat semua saham dengan sinyal dalam satu halaman. Filter berdasarkan BUY atau Watchlist.</p>
              </div>
            </div>
            
            <div class="feature-item reverse">
              <div class="feature-image">
                <img src="/images/tutorial_detail.webp" alt="Detail Saham" loading="lazy">
              </div>
              <div class="feature-content">
                <h3>📈 Detail Trading Plan</h3>
                <p>Setiap saham punya halaman detail dengan Entry, TP, SL, score profile, dan chart TradingView.</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-image">
                <img src="/images/tutorial_news.webp" alt="Berita & Tips" loading="lazy">
              </div>
              <div class="feature-content">
                <h3>📰 Berita & Tips Trading</h3>
                <p>Berita terkait saham dari Google News plus tips trading untuk pemula.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Social Proof / Testimonials Section -->
      <section class="landing-section social-proof-section">
        <div class="landing-container">
          <h2 class="section-heading">Bukti Cuan Pake Tools Ini</h2>
          
          <div class="testimonial-showcase">
            <div class="testimonial-card full-width" style="box-shadow: none; background: transparent; padding: 0;">
              <img src="/images/testimonial_clean.webp" alt="Bukti Profit Trading" class="testimonial-image" loading="lazy" style="border-radius: 12px; width: 100%;">
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section id="checkout" class="landing-section cta-section">
        <div class="landing-container">
          <div class="cta-box">
            <h2>Apa Saja yang Anda Dapatkan di AUTO STOCKS AI?</h2>
            <p>Dapatkan akses ke sinyal trading saham Indonesia dengan analisis teknikal otomatis.</p>
            
            <div class="bonus-section">
              <div class="bonus-title">🎁 BONUS SPESIAL HARI INI</div>
              <ul class="bonus-list">
                <li>
                  <span class="bonus-name">📘 Ebook Tutorial Trading Pemula</span>
                  <span class="bonus-value">Rp 500.000</span>
                </li>
                <li>
                  <span class="bonus-name">📉 Contekan Chart Pattern Winrate Tinggi</span>
                  <span class="bonus-value">Rp 100.000</span>
                </li>
                <li>
                  <span class="bonus-name">🚀 Ebook TA for Mega Profit</span>
                  <span class="bonus-value">Rp 200.000</span>
                </li>
              </ul>
            </div>

            <div class="pricing-card">
              <div class="price-header">
                <div class="price-label">TOTAL SEMUA TOOLS:</div>
                <div class="price-strike text-danger">Rp. 1.000.000,-</div>
                
                <div class="discount-badge">
                  <span class="discount-percent">DISCOUNT 94%</span>
                  <span class="discount-text">Potongan khusus pemesanan hari ini</span>
                </div>
              </div>
              
              <div class="price-final-section">
                <div class="price-final-label">Harga setelah Diskon :</div>
                <div class="price-amount text-success">247.000,-</div>
                
                <div class="countdown-container">
                  <div class="countdown-label">⏳ Penawaran berakhir dalam:</div>
                  <div id="countdownTimer" class="countdown-timer">01:00:00</div>
                </div>
                
                <div class="promo-code-box">
                  <p>Pakai kode <strong>"DISKON50"</strong> Untuk Potongan Tambahan 100rb berlaku selama 1 Jam</p>
                </div>
              </div>
              <div class="price-period" style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-muted);">/lifetime • ⭐️ Sekali Bayar Seumur Hidup</div>
              <ul class="price-features">
                <li>✅ Sinyal BUY & Watchlist harian</li>
                <li>✅ Entry, TP, SL untuk setiap saham</li>
                <li>✅ Data real-time Yahoo Finance</li>
                <li>✅ Chart TradingView terintegrasi</li>
                <li>✅ Berita saham terkait</li>
                <li>✅ Tutorial lengkap untuk pemula</li>
              </ul>
            </div>
            
            <a href="https://forms.google.com" target="_blank" class="cta-button primary large green" id="checkoutBtn">
              <span>🔥 Akses Sekarang</span>
            </a>
            
            <div class="warranty-section">
              <div class="warranty-icon">🛡️</div>
              <div class="warranty-title">Garansi 7 Hari Uang Kembali</div>
              <p class="warranty-text">
                Jika tools error atau tidak bisa digunakan di device Anda, kami kembalikan uang Anda 100%. Tanpa ribet.
              </p>
            </div>

            <p class="cta-note">Pembayaran aman via transfer bank / e-wallet</p>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="landing-section faq-section">
        <div class="landing-container faq-container">
          <h2 class="section-heading">Pertanyaan Umum (FAQ)</h2>
          
          <div class="faq-list">
            <div class="faq-item">
              <button class="faq-question">Apakah cocok untuk pemula?</button>
              <div class="faq-answer">
                <p>Sangat cocok! AutoStocks AI didesain khusus untuk pemula yang tidak ingin ribet analisis teknikal manual. Tinggal ikuti sinyal Entry, TP, dan SL.</p>
              </div>
            </div>
            
            <div class="faq-item">
              <button class="faq-question">Apakah datanya real-time?</button>
              <div class="faq-answer">
                <p>Ya, kami menggunakan data real-time yang terhubung langsung dengan market saat jam bursa berjalan.</p>
              </div>
            </div>

            <div class="faq-item">
              <button class="faq-question">Apakah bisa diakses di HP?</button>
              <div class="faq-answer">
                <p>Bisa banget! Tampilan AutoStocks AI sudah dioptimalkan untuk mobile (HP) maupun desktop/laptop.</p>
              </div>
            </div>

            <div class="faq-item">
              <button class="faq-question">Bagaimana cara belinya?</button>
              <div class="faq-answer">
                <p>Klik tombol "Akses Sekarang", isi form pemesanan, dan lakukan pembayaran. Akun akan aktif otomatis setelah konfirmasi.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="landing-footer">
        <div class="landing-container">
          <div class="footer-logo">
            <span class="logo-icon">📈</span>
            <span class="logo-text">AutoStocks AI</span>
          </div>
          <p class="footer-disclaimer">
            ⚠️ <strong>Disclaimer:</strong> AutoStocks AI adalah tools edukasi dan analisis teknikal. 
            Bukan saran investasi. Trading saham mengandung risiko kerugian.
          </p>
          <p class="footer-copyright">© 2026 AutoStocks AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `;
}

/**
 * Attach landing page event listeners
 */
export function attachLandingEventListeners() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Video demo overlay click
  const demoVideo = document.getElementById('demoVideo');
  if (demoVideo) {
    demoVideo.addEventListener('click', () => {
      // Replace image with video player (using img tag for animated WebP)
      demoVideo.innerHTML = `
        <div class="video-wrapper" style="position: relative; width: 100%; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
          <img src="/videos/demo.webp" alt="Demo Walkthrough" style="width: 100%; display: block;">
        </div>
      `;
    });
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;

      // Close other items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current
      item.classList.toggle('active');
    });
  });

  // Countdown Timer Logic
  const timerElement = document.getElementById('countdownTimer');
  if (timerElement) {
    // Set duration to 1 hour (in seconds)
    let duration = 60 * 60;

    // Check if there's a stored end time to persist countdown on refresh
    let endTime = localStorage.getItem('promoEndTime');
    if (!endTime) {
      endTime = Date.now() + duration * 1000;
      localStorage.setItem('promoEndTime', endTime);
    }

    function updateTimer() {
      const now = Date.now();
      const distance = endTime - now;

      if (distance < 0) {
        // Reset timer if expired (scarcity tactic generally resets for new visitors/sessions)
        endTime = Date.now() + duration * 1000;
        localStorage.setItem('promoEndTime', endTime);
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      timerElement.innerHTML =
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);
    }

    setInterval(updateTimer, 1000);
    updateTimer(); // Initial call
  }
}

