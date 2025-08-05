// src/components/StatusDR.jsx
import { useNavigate } from 'react-router-dom'  // ← Add this at the top

import React, { useState } from 'react'
import TemperatureChart from './TemperatureChart'

const StatusDR = ({ dr, status = {} }) => {
  const name = dr?.name || 'Unknown'

  const bftcWebIp = dr?.temperature_controller?.ip_web || ''
  const controlIp = dr?.control_unit?.ip || ''

  const ledColor   = status.led_color   || 'bg-gray-300'
  const statusText = status.status_text || 'Loading...'

  const [expanded, setExpanded] = useState(false)
  const toggleExpand = () => setExpanded(!expanded)

  const [latestTime, setLatestTime] = useState(null)
  const [latestTemp, setLatestTemp] = useState(null)
  const navigate = useNavigate()

  const latestDisplay =
    latestTemp == null
      ? ''
      : latestTemp > 0.1
      ? `${latestTemp.toFixed(1)} K`
      : `${(latestTemp * 1000).toFixed(1)} mK`

  return (
    <div
      className="p-4 border rounded shadow bg-white space-y-2 cursor-pointer hover:bg-gray-50"
      onClick={toggleExpand}
    >
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">{name}</div>
        <div className="flex items-center space-x-2">
          {latestTime && (
            <div className="text-sm text-gray-500">
              {latestTime} {latestDisplay}
            </div>
          )}
          <div className="text-gray-700">{statusText}</div>
          <div className={`w-4 h-4 rounded-full ${ledColor} border`} />
        </div>
      </div>

      {/* Always show the mini‐chart */}
      <TemperatureChart
        drName={name}
        onLatest={(t, temp) => {
          setLatestTime(t)
          setLatestTemp(temp)
        }}
      />

      {expanded && (
        <div className="pt-4 space-y-4" onClick={e => e.stopPropagation()}>
          <div className="space-x-2">
            {bftcWebIp && (
              <a
                href={`http://${bftcWebIp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                BFTC
              </a>
            )}
            <button
              onClick={() => navigate(`/logs/${name}`)}
              className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Logs
            </button>
          </div>
          <div className="text-sm text-gray-600">
            <p>Control IP: {controlIp}</p>
            <p>BFTC API IP: {bftcWebIp}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default StatusDR
