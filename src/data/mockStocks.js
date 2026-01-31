// Mock data for Indonesian stocks with broker summary
// Broker asing (smart money): AK, BK, ZP

// Company information database
const COMPANY_INFO = {
  'BBCA': {
    name: 'Bank Central Asia Tbk',
    sector: 'Finance',
    description: 'Bank Central Asia adalah bank swasta terbesar di Indonesia. Didirikan pada 1957, BBCA melayani nasabah ritel, korporasi, dan UKM dengan berbagai produk perbankan termasuk tabungan, kredit, dan layanan digital.',
    employees: 25000,
    founded: 1957,
    website: 'www.bca.co.id'
  },
  'BBRI': {
    name: 'Bank Rakyat Indonesia Tbk',
    sector: 'Finance',
    description: 'Bank Rakyat Indonesia adalah bank BUMN fokus pada segmen mikro, kecil, dan menengah. BBRI memiliki jaringan terluas di Indonesia dengan lebih dari 10.000 unit kerja.',
    employees: 120000,
    founded: 1895,
    website: 'www.bri.co.id'
  },
  'BMRI': {
    name: 'Bank Mandiri Tbk',
    sector: 'Finance',
    description: 'Bank Mandiri adalah bank BUMN terbesar di Indonesia berdasarkan aset. Terbentuk dari merger 4 bank pemerintah pada 1998, fokus pada perbankan korporasi dan ritel.',
    employees: 38000,
    founded: 1998,
    website: 'www.bankmandiri.co.id'
  },
  'BBNI': {
    name: 'Bank Negara Indonesia Tbk',
    sector: 'Finance',
    description: 'Bank Negara Indonesia adalah bank BUMN pertama yang didirikan setelah kemerdekaan. BNI melayani segmen korporasi, komersial, dan consumer banking.',
    employees: 27000,
    founded: 1946,
    website: 'www.bni.co.id'
  },
  'TLKM': {
    name: 'Telkom Indonesia Tbk',
    sector: 'Infrastructure',
    description: 'Telkom Indonesia adalah perusahaan telekomunikasi terbesar di Indonesia. Menyediakan layanan fixed line, mobile (Telkomsel), internet, dan data center.',
    employees: 24000,
    founded: 1965,
    website: 'www.telkom.co.id'
  },
  'ASII': {
    name: 'Astra International Tbk',
    sector: 'Trade & Services',
    description: 'Astra International adalah konglomerat terdiversifikasi. Bisnis utama meliputi otomotif (Toyota, Honda), alat berat, agribisnis, infrastruktur, dan jasa keuangan.',
    employees: 180000,
    founded: 1957,
    website: 'www.astra.co.id'
  },
  'UNVR': {
    name: 'Unilever Indonesia Tbk',
    sector: 'Consumer Goods',
    description: 'Unilever Indonesia adalah produsen barang konsumen terkemuka. Produk meliputi Rinso, Lifebuoy, Sunsilk, Pepsodent, dan brand ternama lainnya.',
    employees: 6000,
    founded: 1933,
    website: 'www.unilever.co.id'
  },
  'ANTM': {
    name: 'Aneka Tambang Tbk',
    sector: 'Mining',
    description: 'Aneka Tambang adalah perusahaan tambang BUMN yang memproduksi nikel, emas, bauksit, dan mineral lainnya. Juga aktif di pengolahan dan pemurnian logam.',
    employees: 3500,
    founded: 1968,
    website: 'www.antam.com'
  },
  'PTBA': {
    name: 'Bukit Asam Tbk',
    sector: 'Mining',
    description: 'Bukit Asam adalah produsen batubara BUMN terbesar di Indonesia. Beroperasi di Sumatera Selatan dengan kapasitas produksi lebih dari 30 juta ton per tahun.',
    employees: 5200,
    founded: 1981,
    website: 'www.ptba.co.id'
  },
  'MDKA': {
    name: 'Merdeka Copper Gold Tbk',
    sector: 'Mining',
    description: 'Merdeka Copper Gold adalah perusahaan tambang emas dan tembaga modern. Mengoperasikan tambang Tujuh Bukit di Jawa Timur dan beberapa proyek eksplorasi.',
    employees: 4500,
    founded: 2012,
    website: 'www.merdekacoppergold.com'
  },
  'INCO': {
    name: 'Vale Indonesia Tbk',
    sector: 'Mining',
    description: 'Vale Indonesia (sebelumnya PT Inco) adalah produsen nikel terbesar di Indonesia. Mengoperasikan tambang dan pabrik pengolahan nikel di Sulawesi.',
    employees: 3200,
    founded: 1968,
    website: 'www.vale.com/indonesia'
  },
  'PGAS': {
    name: 'Perusahaan Gas Negara Tbk',
    sector: 'Infrastructure',
    description: 'PGN adalah perusahaan distribusi gas bumi terbesar di Indonesia. Mengoperasikan jaringan pipa gas sepanjang lebih dari 7.500 km melayani industri dan rumah tangga.',
    employees: 2800,
    founded: 1965,
    website: 'www.pgn.co.id'
  },
  'ITMG': {
    name: 'Indo Tambangraya Megah Tbk',
    sector: 'Mining',
    description: 'Indo Tambangraya Megah adalah produsen batubara berkualitas tinggi. Anak usaha Banpu Thailand, mengoperasikan tambang di Kalimantan Timur.',
    employees: 4800,
    founded: 1987,
    website: 'www.itmg.co.id'
  },
  'BRIS': {
    name: 'Bank Syariah Indonesia Tbk',
    sector: 'Finance',
    description: 'Bank Syariah Indonesia adalah bank syariah terbesar di Indonesia. Hasil merger 3 bank syariah BUMN pada 2021, melayani perbankan sesuai prinsip syariah.',
    employees: 20000,
    founded: 2021,
    website: 'www.bankbsi.co.id'
  },
  'MEDC': {
    name: 'Medco Energi Internasional Tbk',
    sector: 'Mining',
    description: 'Medco Energi adalah perusahaan energi terintegrasi. Beroperasi di bidang migas, pembangkit listrik, dan pengolahan gas di Indonesia dan luar negeri.',
    employees: 2100,
    founded: 1980,
    website: 'www.medcoenergi.com'
  },
  'ADRO': {
    name: 'Adaro Energy Tbk',
    sector: 'Mining',
    description: 'Adaro Energy adalah produsen batubara terbesar kedua di Indonesia. Mengoperasikan tambang di Kalimantan Selatan dengan fokus batubara rendah sulfur.',
    employees: 6500,
    founded: 1982,
    website: 'www.adaro.com'
  },
  'ICBP': {
    name: 'Indofood CBP Sukses Makmur Tbk',
    sector: 'Consumer Goods',
    description: 'ICBP adalah produsen makanan kemasan terbesar di Indonesia. Produk utama mie instan Indomie, dairy, snack, dan minuman.',
    employees: 45000,
    founded: 2009,
    website: 'www.indofoodcbp.com'
  },
  'INDF': {
    name: 'Indofood Sukses Makmur Tbk',
    sector: 'Consumer Goods',
    description: 'Indofood adalah konglomerat makanan terbesar di Indonesia. Bisnis meliputi mie, dairy, snack, tepung, minyak goreng, dan agribisnis.',
    employees: 100000,
    founded: 1990,
    website: 'www.indofood.com'
  },
  'KLBF': {
    name: 'Kalbe Farma Tbk',
    sector: 'Consumer Goods',
    description: 'Kalbe Farma adalah perusahaan farmasi terbesar di Indonesia. Memproduksi obat resep, consumer health, nutrisi, dan distribusi.',
    employees: 17000,
    founded: 1966,
    website: 'www.kalbe.co.id'
  },
  'GGRM': {
    name: 'Gudang Garam Tbk',
    sector: 'Consumer Goods',
    description: 'Gudang Garam adalah produsen rokok kretek terbesar di Indonesia. Brand utama Gudang Garam, Surya, dan GG Mild.',
    employees: 35000,
    founded: 1958,
    website: 'www.gudanggaramtbk.com'
  },
  'HMSP': {
    name: 'HM Sampoerna Tbk',
    sector: 'Consumer Goods',
    description: 'HM Sampoerna adalah produsen rokok terbesar kedua di Indonesia. Anak perusahaan Philip Morris, brand utama Sampoerna A dan Dji Sam Soe.',
    employees: 28000,
    founded: 1913,
    website: 'www.sampoerna.com'
  },
  'CPIN': {
    name: 'Charoen Pokphand Indonesia Tbk',
    sector: 'Consumer Goods',
    description: 'CPIN adalah produsen pakan ternak dan daging ayam terbesar di Indonesia. Terintegrasi dari hulu (pakan) ke hilir (daging olahan).',
    employees: 10000,
    founded: 1972,
    website: 'www.cp.co.id'
  },
  'EXCL': {
    name: 'XL Axiata Tbk',
    sector: 'Infrastructure',
    description: 'XL Axiata adalah operator telekomunikasi seluler terbesar ketiga di Indonesia. Menyediakan layanan voice, data, dan enterprise solution.',
    employees: 4500,
    founded: 1989,
    website: 'www.xl.co.id'
  },
  'SMGR': {
    name: 'Semen Indonesia Tbk',
    sector: 'Basic Industry',
    description: 'Semen Indonesia adalah produsen semen terbesar di Indonesia. Mengelola Semen Gresik, Semen Padang, dan Semen Tonasa.',
    employees: 7000,
    founded: 1957,
    website: 'www.sig.id'
  },
  'INKP': {
    name: 'Indah Kiat Pulp & Paper Tbk',
    sector: 'Basic Industry',
    description: 'Indah Kiat adalah produsen pulp dan kertas terbesar di Indonesia. Bagian dari Sinarmas Group, mengoperasikan pabrik di Riau dan Jawa.',
    employees: 12000,
    founded: 1976,
    website: 'www.app.co.id'
  },
  'TKIM': {
    name: 'Pabrik Kertas Tjiwi Kimia Tbk',
    sector: 'Basic Industry',
    description: 'Tjiwi Kimia adalah produsen kertas budaya terbesar di Asia Tenggara. Bagian dari APP (Asia Pulp & Paper), berlokasi di Mojokerto.',
    employees: 9000,
    founded: 1972,
    website: 'www.app.co.id'
  },
  'UNTR': {
    name: 'United Tractors Tbk',
    sector: 'Trade & Services',
    description: 'United Tractors adalah distributor alat berat Komatsu terbesar di Indonesia. Juga bergerak di pertambangan batubara dan kontraktor penambangan.',
    employees: 18000,
    founded: 1972,
    website: 'www.unitedtractors.com'
  },
  'ACES': {
    name: 'Ace Hardware Indonesia Tbk',
    sector: 'Trade & Services',
    description: 'Ace Hardware adalah jaringan supermarket home improvement terbesar di Indonesia. Mengoperasikan lebih dari 200 toko di seluruh Indonesia.',
    employees: 8500,
    founded: 1995,
    website: 'www.acehardware.co.id'
  },
  'MAPI': {
    name: 'Mitra Adiperkasa Tbk',
    sector: 'Trade & Services',
    description: 'Mitra Adiperkasa adalah peritel lifestyle terbesar di Indonesia. Mengelola brand Zara, Starbucks, Sephora, dan ratusan brand internasional.',
    employees: 35000,
    founded: 1995,
    website: 'www.map.co.id'
  },
  'ERAA': {
    name: 'Erajaya Swasembada Tbk',
    sector: 'Trade & Services',
    description: 'Erajaya adalah distributor dan retailer gadget terbesar di Indonesia. Mengelola Erafone, iBox, dan Urban Republic.',
    employees: 10000,
    founded: 1996,
    website: 'www.erajaya.com'
  }
};

// Generate realistic historical prices
function generateHistoricalPrices(currentPrice, days, trend = 'neutral') {
  const prices = [];
  let price = currentPrice;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    if (date.getDay() === 0 || date.getDay() === 6) continue;

    const volatility = price * 0.025;
    let trendBias = 0;

    if (trend === 'bullish') trendBias = volatility * 0.3;
    else if (trend === 'bearish') trendBias = -volatility * 0.3;

    const open = price + (Math.random() - 0.5) * volatility;
    const close = open + (Math.random() - 0.5) * volatility + trendBias;
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;
    const volume = Math.floor(Math.random() * 50000000) + 10000000;

    prices.push({
      date: date.toISOString().split('T')[0],
      open: Math.round(open),
      high: Math.round(high),
      low: Math.round(low),
      close: Math.round(close),
      volume
    });

    price = close;
  }

  return prices;
}

// Generate broker summary with bias
function generateBrokerSummary(ticker, trend) {
  const seed = ticker.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const bias = trend === 'bullish' ? 1.5 : trend === 'bearish' ? 0.5 : 1;

  const akBuy = Math.floor((seed % 10 + 5) * 1000000 * bias);
  const akSell = Math.floor((seed % 8 + 3) * 1000000 / bias);
  const bkBuy = Math.floor((seed % 7 + 4) * 1000000 * bias);
  const bkSell = Math.floor((seed % 6 + 2) * 1000000 / bias);
  const zpBuy = Math.floor((seed % 5 + 3) * 1000000 * bias);
  const zpSell = Math.floor((seed % 4 + 1) * 1000000 / bias);

  return {
    AK: { buy: akBuy, sell: akSell, net: akBuy - akSell },
    BK: { buy: bkBuy, sell: bkSell, net: bkBuy - bkSell },
    ZP: { buy: zpBuy, sell: zpSell, net: zpBuy - zpSell }
  };
}

const stocksData = [
  // BLUE CHIPS - FINANCE
  { ticker: 'BBCA', lastClose: 9250, prevClose: 9100, change: 150, changePercent: 1.65, volume: 25000000, avgVolume: 20000000, marketCap: 1150000000000000, trend: 'bullish' },
  { ticker: 'BBRI', lastClose: 4850, prevClose: 4780, change: 70, changePercent: 1.46, volume: 150000000, avgVolume: 120000000, marketCap: 725000000000000, trend: 'bullish' },
  { ticker: 'BMRI', lastClose: 6200, prevClose: 6100, change: 100, changePercent: 1.64, volume: 45000000, avgVolume: 40000000, marketCap: 580000000000000, trend: 'bullish' },
  { ticker: 'BBNI', lastClose: 5050, prevClose: 4950, change: 100, changePercent: 2.02, volume: 35000000, avgVolume: 30000000, marketCap: 190000000000000, trend: 'bullish' },
  { ticker: 'BRIS', lastClose: 2680, prevClose: 2640, change: 40, changePercent: 1.52, volume: 28000000, avgVolume: 25000000, marketCap: 135000000000000, trend: 'bullish' },

  // TELCO & INFRA
  { ticker: 'TLKM', lastClose: 3180, prevClose: 3120, change: 60, changePercent: 1.92, volume: 60000000, avgVolume: 55000000, marketCap: 315000000000000, trend: 'bullish' },
  { ticker: 'EXCL', lastClose: 2150, prevClose: 2100, change: 50, changePercent: 2.38, volume: 15000000, avgVolume: 12000000, marketCap: 28000000000000, trend: 'bullish' },
  { ticker: 'PGAS', lastClose: 1650, prevClose: 1620, change: 30, changePercent: 1.85, volume: 35000000, avgVolume: 28000000, marketCap: 40000000000000, trend: 'bullish' },

  // MINING
  { ticker: 'ANTM', lastClose: 1680, prevClose: 1640, change: 40, changePercent: 2.44, volume: 80000000, avgVolume: 50000000, marketCap: 40000000000000, trend: 'bullish' },
  { ticker: 'MDKA', lastClose: 2450, prevClose: 2380, change: 70, changePercent: 2.94, volume: 120000000, avgVolume: 80000000, marketCap: 60000000000000, trend: 'bullish' },
  { ticker: 'INCO', lastClose: 4180, prevClose: 4100, change: 80, changePercent: 1.95, volume: 45000000, avgVolume: 35000000, marketCap: 41700000000000, trend: 'bullish' },
  { ticker: 'PTBA', lastClose: 2820, prevClose: 2780, change: 40, changePercent: 1.44, volume: 15000000, avgVolume: 12000000, marketCap: 32000000000000, trend: 'neutral' },
  { ticker: 'ADRO', lastClose: 2550, prevClose: 2500, change: 50, changePercent: 2.00, volume: 85000000, avgVolume: 70000000, marketCap: 80000000000000, trend: 'bullish' },
  { ticker: 'ITMG', lastClose: 26500, prevClose: 26000, change: 500, changePercent: 1.92, volume: 3000000, avgVolume: 2500000, marketCap: 30000000000000, trend: 'bullish' },
  { ticker: 'MEDC', lastClose: 1420, prevClose: 1380, change: 40, changePercent: 2.90, volume: 28000000, avgVolume: 22000000, marketCap: 25000000000000, trend: 'bullish' },

  // CONSUMER
  { ticker: 'UNVR', lastClose: 2980, prevClose: 2950, change: 30, changePercent: 1.02, volume: 8000000, avgVolume: 10000000, marketCap: 115000000000000, trend: 'neutral' },
  { ticker: 'ICBP', lastClose: 10500, prevClose: 10350, change: 150, changePercent: 1.45, volume: 6000000, avgVolume: 5000000, marketCap: 125000000000000, trend: 'bullish' },
  { ticker: 'INDF', lastClose: 6850, prevClose: 6750, change: 100, changePercent: 1.48, volume: 8000000, avgVolume: 7000000, marketCap: 60000000000000, trend: 'bullish' },
  { ticker: 'KLBF', lastClose: 1550, prevClose: 1520, change: 30, changePercent: 1.97, volume: 25000000, avgVolume: 20000000, marketCap: 73000000000000, trend: 'bullish' },
  { ticker: 'GGRM', lastClose: 24500, prevClose: 24000, change: 500, changePercent: 2.08, volume: 2500000, avgVolume: 2000000, marketCap: 47000000000000, trend: 'bullish' },
  { ticker: 'HMSP', lastClose: 850, prevClose: 835, change: 15, changePercent: 1.80, volume: 45000000, avgVolume: 40000000, marketCap: 100000000000000, trend: 'neutral' },
  { ticker: 'CPIN', lastClose: 5150, prevClose: 5050, change: 100, changePercent: 1.98, volume: 12000000, avgVolume: 10000000, marketCap: 85000000000000, trend: 'bullish' },

  // DIVERSIFIED & OTHERS
  { ticker: 'ASII', lastClose: 4780, prevClose: 4700, change: 80, changePercent: 1.70, volume: 30000000, avgVolume: 25000000, marketCap: 192000000000000, trend: 'bullish' },
  { ticker: 'UNTR', lastClose: 26800, prevClose: 26400, change: 400, changePercent: 1.52, volume: 4000000, avgVolume: 3500000, marketCap: 100000000000000, trend: 'bullish' },
  { ticker: 'SMGR', lastClose: 4050, prevClose: 3980, change: 70, changePercent: 1.76, volume: 18000000, avgVolume: 15000000, marketCap: 24000000000000, trend: 'bullish' },

  // RETAIL
  { ticker: 'ACES', lastClose: 785, prevClose: 770, change: 15, changePercent: 1.95, volume: 22000000, avgVolume: 18000000, marketCap: 13500000000000, trend: 'bullish' },
  { ticker: 'MAPI', lastClose: 1680, prevClose: 1650, change: 30, changePercent: 1.82, volume: 15000000, avgVolume: 12000000, marketCap: 28000000000000, trend: 'bullish' },
  { ticker: 'ERAA', lastClose: 520, prevClose: 510, change: 10, changePercent: 1.96, volume: 35000000, avgVolume: 28000000, marketCap: 17000000000000, trend: 'bullish' },

  // PULP & PAPER
  { ticker: 'INKP', lastClose: 8950, prevClose: 8800, change: 150, changePercent: 1.70, volume: 8000000, avgVolume: 6500000, marketCap: 50000000000000, trend: 'bullish' },
  { ticker: 'TKIM', lastClose: 6350, prevClose: 6250, change: 100, changePercent: 1.60, volume: 5000000, avgVolume: 4000000, marketCap: 20000000000000, trend: 'bullish' }
].map(stock => {
  const info = COMPANY_INFO[stock.ticker] || { name: stock.ticker, sector: 'Other', description: '' };
  const brokerSummary = generateBrokerSummary(stock.ticker, stock.trend);
  const foreignNet = brokerSummary.AK.net + brokerSummary.BK.net + brokerSummary.ZP.net;

  return {
    ...stock,
    name: info.name,
    sector: info.sector,
    companyInfo: info,
    open: stock.lastClose - Math.floor(Math.random() * 50),
    high: stock.lastClose + Math.floor(Math.random() * 100),
    low: stock.lastClose - Math.floor(Math.random() * 100),
    historicalPrices: generateHistoricalPrices(stock.lastClose, 90, stock.trend),
    brokerSummary,
    foreignAccumulation2W: foreignNet
  };
});

export { stocksData, COMPANY_INFO };
