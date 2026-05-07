import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import styles from './BiasChart.module.css'

const COLORS = {
  'Left-Leaning': '#3d8ef0',
  'Center':       '#2ed573',
  'Right-Leaning':'#ff4757',
  'Unrated':      '#5a5570',
}

export default function BiasChart({ breakdown }) {
  const data = [
    { name: 'Left-Leaning', value: breakdown.left },
    { name: 'Center',       value: breakdown.center },
    { name: 'Right-Leaning',value: breakdown.right },
    { name: 'Unrated',      value: breakdown.unknown },
  ].filter((d) => d.value > 0)

  return (
    <div className={styles.box}>
      <div className={styles.header}>Coverage Distribution</div>
      <ResponsiveContainer width="100%" height={170}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={48}
            outerRadius={72}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} articles`, name]}
            contentStyle={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              border: '1px solid #2a2a38',
              background: '#e8e6f0',
              color: '#e8e6f0',
              borderRadius: '8px',
            }}
          />
          <Legend
            iconType="circle"
            iconSize={7}
            formatter={(value) => (
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#9994b0' }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}