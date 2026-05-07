import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { searchNews } from '../utils/api'
import ArticleCard from '../components/ArticleCard'
import SummaryStats from '../components/SummaryStats'
import BiasChart from '../components/BiasChart'
import ToneBar from '../components/ToneBar'
import styles from './Results.module.css'

export default function Results() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('q') || ''

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newQuery, setNewQuery] = useState(query)

  useEffect(() => {
    if (!query) return
    setNewQuery(query)
    fetchNews(query)
  }, [query])

  const fetchNews = async (q) => {
    setLoading(true)
    setError('')
    setData(null)
    try {
      const res = await searchNews(q)
      setData(res.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Could not fetch news. Is your server running on port 5000?')
    } finally {
      setLoading(false)
    }
  }

  const handleNewSearch = () => {
    if (!newQuery.trim()) return
    navigate(`/results?q=${encodeURIComponent(newQuery.trim())}`)
  }

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← NEWS<span className={styles.backAccent}>BIAS</span>
        </button>
        <div className={styles.searchMini}>
          <input
            className={styles.miniInput}
            value={newQuery}
            onChange={(e) => setNewQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNewSearch()}
            placeholder="Search again..."
          />
          <button className={styles.miniBtn} onClick={handleNewSearch}>GO</button>
        </div>
      </div>

      <div className={styles.container}>
        {/* Loading */}
        {loading && (
          <div className={styles.loadingBox}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>
              Scanning newsrooms for{' '}
              <span className={styles.loadingTopic}>"{query}"</span>
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className={styles.errorBox}>
            <div className={styles.errorIcon}>⚠</div>
            <p className={styles.errorText}>{error}</p>
            <button className={styles.retryBtn} onClick={() => fetchNews(query)}>
              RETRY
            </button>
          </div>
        )}

        {/* Results */}
        {data && (
          <>
            {/* Header */}
            <div className={styles.resultsHeader}>
              <div>
                <h1 className={styles.resultsTitle}>
                  "<span className={styles.titleAccent}>{query}</span>"
                </h1>
                <p className={styles.resultsMeta}>
                  {data.totalArticles} sources analyzed ·{' '}
                  {new Date().toLocaleTimeString()}
                  <span className={data.source === 'cache' ? styles.cachedBadge : styles.liveBadge}>
                    {data.source === 'cache' ? 'CACHED' : 'LIVE'}
                  </span>
                </p>
              </div>
              <div className={styles.biasLegend}>
                <span className={styles.legendLeft}>■ Left</span>
                <span className={styles.legendCenter}>■ Center</span>
                <span className={styles.legendRight}>■ Right</span>
              </div>
            </div>

            {/* Analytics */}
            <div className={styles.analyticsRow}>
              <SummaryStats breakdown={data.biasBreakdown} total={data.totalArticles} />
              <BiasChart breakdown={data.biasBreakdown} />
            </div>

            {/* Tone bars */}
            <ToneBar articles={data.articles} />

            {/* Articles */}
            <div className={styles.sectionDivider}>
              <div className={styles.divLine} />
              <span>Articles by Source</span>
              <div className={styles.divLine} />
            </div>

            <div className={styles.grid}>
              {data.articles.map((article, i) => (
                <ArticleCard key={i} article={article} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}