import styles from './ArticleCard.module.css'

const BIAS_LABELS = {
  left: 'Left-Leaning',
  center: 'Center',
  right: 'Right-Leaning',
  unknown: 'Unrated',
}

export default function ArticleCard({ article, index }) {
  const { title, description, source, url, bias, sentiment, negScore, publishedAt } = article

  const formatDate = (d) => {
    if (!d) return ''
    try {
      return new Date(d).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
      })
    } catch { return d }
  }

  return (
    <div
      className={`${styles.card} ${styles[bias]}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Left color stripe handled via CSS */}

      <div className={styles.topRow}>
        <span className={styles.source}>
          {source.replace(/-/g, ' ').toUpperCase()}
        </span>
        <span className={`${styles.biasBadge} ${styles[`badge_${bias}`]}`}>
          {BIAS_LABELS[bias] || 'Unrated'}
        </span>
      </div>

      <a href={url} target="_blank" rel="noreferrer" className={styles.titleLink}>
        <h3 className={styles.title}>{title}</h3>
      </a>

      {description && (
        <p className={styles.desc}>
          {description.length > 150 ? description.slice(0, 150) + '...' : description}
        </p>
      )}

      {/* Negativity bar */}
      <div className={styles.negRow}>
        <span className={styles.negLabel}>Negativity</span>
        <div className={styles.negBarWrap}>
          <div
            className={styles.negBar}
            style={{ width: `${negScore}%`, '--target-width': `${negScore}%` }}
          />
        </div>
        <span className={styles.negPct}>{negScore}%</span>
      </div>

      <div className={styles.footer}>
        <span className={styles.date}>{formatDate(publishedAt)}</span>
        <span className={`${styles.sentBadge} ${styles[`sent_${sentiment}`]}`}>
          {sentiment}
        </span>
      </div>
    </div>
  )
}