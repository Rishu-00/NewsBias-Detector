import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

const TRENDING = [
  'Artificial Intelligence', 'Climate Change', 'Economy',
  'Elections', 'Ukraine War', 'Healthcare', 'Immigration', 'Stock Market',
]

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (!query.trim()) return
    navigate(`/results?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <div className={styles.dot} />
          <span className={styles.liveText}>Live Analysis</span>
        </div>
        <span className={styles.topBarDate}>
          {new Date().toLocaleDateString('en-IN', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
          }).toUpperCase()}
        </span>
        <span className={styles.topBarRight}>MEDIA BIAS DETECTOR v1.0</span>
      </div>

      {/* Hero */}
      <main className={styles.hero}>
        <div className={styles.eyebrow}>Media Bias Analysis Tool</div>

        <div className={styles.logoWrap}>
          <div className={styles.logo}>
            NEWS<span className={styles.logoAccent}>BIAS</span>
          </div>
          <div className={styles.logoSub}>Detector</div>
        </div>

        <p className={styles.tagline}>
          One story. Many lenses. You decide the truth.
        </p>

        {/* Search */}
        <div className={styles.searchWrap}>
          <div className={styles.searchBox}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search any topic — climate, elections, AI..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              autoFocus
            />
            <button className={styles.searchBtn} onClick={handleSearch}>
              ANALYZE →
            </button>
          </div>
        </div>

        {/* Trending */}
        <div className={styles.trending}>
          <span className={styles.trendLabel}>Trending:</span>
          <div className={styles.chips}>
            {TRENDING.map((t) => (
              <button
                key={t}
                className={styles.chip}
                onClick={() => navigate(`/results?q=${encodeURIComponent(t)}`)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* How it works */}
      <section className={styles.howSection}>
        <div className={styles.howHeader}>
          <div className={styles.howLine} />
          <span className={styles.howTitle}>How It Works</span>
          <div className={styles.howLine} />
        </div>
        <div className={styles.howGrid}>
          {[
            { n: '01', t: 'Search Any Topic', d: 'Type any news topic — politics, economy, sports, science.' },
            { n: '02', t: 'Fetch 10+ Sources', d: 'Articles from BBC, CNN, Fox News, NDTV, Guardian and more.' },
            { n: '03', t: 'Bias Detected', d: 'Each source labeled Left, Center, or Right based on known data.' },
            { n: '04', t: 'See the Truth', d: 'Compare headlines side by side. Spot the spin. Think for yourself.' },
          ].map((c) => (
            <div key={c.n} className={styles.howCard}>
              <span className={styles.howNum}>{c.n}</span>
              <h3 className={styles.howCardTitle}>{c.t}</h3>
              <p className={styles.howCardDesc}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        Built with React · Express · MongoDB · NewsData.io — 100% Free & Open
      </footer>
    </div>
  )
}