import styles from './ToneBar.module.css'

const BIAS_COLORS = {
  left: '#1a6b8a',
  center: '#2d7a3a',
  right: '#c0392b',
  unknown: '#aaa',
}

export default function ToneBar({ articles }) {
  const seen = new Set()
const sorted = [...articles]
  .sort((a, b) => b.negScore - a.negScore)
  .filter((a) => {
    if (seen.has(a.source)) return false
    seen.add(a.source)
    return true
  })
  .slice(0, 8)

  return (
    <div className={styles.box}>
      <div className={styles.header}>
        Negativity Tone by Source
        <span className={styles.subtext}> — higher = more alarming language used</span>
      </div>
      <div className={styles.bars}>
        {sorted.map((a, i) => (
          <div key={i} className={styles.row}>
            <span className={styles.source}>
              {(a.source || 'Unknown').replace(/-/g, ' ').toUpperCase().slice(0, 14)}
            </span>
            <div className={styles.barWrap}>
              <div
                className={styles.bar}
                style={{
                  width: `${a.negScore}%`,
                  background: BIAS_COLORS[a.bias] || '#aaa',
                  '--target-width': `${a.negScore}%`,
                }}
              />
            </div>
            <span className={styles.pct}>{a.negScore}%</span>
          </div>
        ))}
      </div>
      <div className={styles.legend}>
        <span style={{ color: '#1a6b8a' }}>■ Left</span>
        <span style={{ color: '#2d7a3a' }}>■ Center</span>
        <span style={{ color: '#c0392b' }}>■ Right</span>
        <span style={{ color: '#aaa' }}>■ Unrated</span>
      </div>
    </div>
  )
}