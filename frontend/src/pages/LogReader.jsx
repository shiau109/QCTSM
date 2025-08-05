import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8010'

export default function LogReader() {
  const { drName } = useParams()
  const [folders, setFolders] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/dr/list-log-folders/${drName}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => setFolders(data))
      .catch(err => {
        console.error(err)
        setError('Failed to load log folders.')
      })
  }, [drName])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Log Folders for {drName}</h1>
      {error && <p className="text-red-600">{error}</p>}
      <ul className="list-disc list-inside">
        {folders.map(folder => (
          <li key={folder}>{folder}</li>
        ))}
      </ul>
    </div>
  )
}
