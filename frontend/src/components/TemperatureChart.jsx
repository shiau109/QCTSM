// src/components/TemperatureChart.jsx

import React, { useState, useEffect } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8010'

export default function TemperatureChart({ drName, channelNr = 6, onLatest }) {
  const [data, setData] = useState([])

  const fetchHistory = async () => {
    if (!drName) return
    const res = await fetch(`${API_BASE}/dr/temperature-history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dr_name:    drName,
        channel_nr: channelNr,
        fields:     ['timestamp','temperature'],
      }),
    })
    const json = await res.json()
    const pts = json.measurements.timestamp.map((ts,i) => ({
      time: new Date(ts*1000).toLocaleTimeString(),
      temperature: json.measurements.temperature[i],
    }))
    setData(pts)
    if (onLatest && pts.length) {
      const last = pts[pts.length - 1];
      onLatest(last.time, last.temperature);
    }

}

  useEffect(() => {
    fetchHistory()
    const id = setInterval(fetchHistory, 30000)
    return () => clearInterval(id)
  }, [drName])

  // only show first & last tick on the x-axis
  const ticks = data.length > 1
    ? [data[0].time, data[data.length - 1].time]
    : data.map(d => d.time)

  // format axis based on K/mK threshold
  const formatAxis = value =>
    value > 0.1
      ? `${value.toFixed(3)}K`
      : `${(value * 1000).toFixed(1)}mK`

  return (
    <div className="w-full h-64 p-4 bg-white rounded shadow">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" ticks={ticks} tick={{ fontSize: 12 }} />
          <YAxis
            domain={['auto', 'auto']}
            tickFormatter={formatAxis}
          />
          <Tooltip
            formatter={val =>
              val > 0.1
                ? [`${val.toFixed(3)} K`, 'Temp']
                : [`${(val * 1000).toFixed(1)} mK`, 'Temp']
            }
          />
          <Line type="linear" dataKey="temperature" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
  
}
