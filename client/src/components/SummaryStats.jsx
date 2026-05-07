import styles from './SummaryStats.module.css'

export default function SummaryStats({ breakdown, total }) {
  const stats = [
    { label: 'Left-Leaning', value: breakdown.left, color: breakdown.left > 0 ? 'left' : 'unknown' },
    { label: 'Center', value: breakdown.center, color: breakdown.center > 0 ? 'center' : 'unknown' },
    { label: 'Right-Leaning', value: breakdown.right, color: breakdown.right > 0 ? 'right' : 'unknown' },
    { label: 'Unrated', value: breakdown.unknown, color: 'unknown' },
    { label: 'Total Sources', value: total, color: 'total' },
  ]

  return (
    <div className={styles.box}>
      <div className={styles.header}>Bias Breakdown</div>
      <div className={styles.grid}>
        {stats.map((s) => (
          <div key={s.label} className={styles.stat}>
            <span className={`${styles.num} ${styles[s.color]}`}>{s.value}</span>
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}