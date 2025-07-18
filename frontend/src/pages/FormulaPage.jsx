import React, { useState } from 'react'

function FormulaPage() {
  const [resistance, setResistance] = useState('')
  const [ec, setEc] = useState('')
  const [constant, setConstant] = useState('')
  const [result, setResult] = useState(null)

  const handleCalculate = (e) => {
    e.preventDefault()
    const R = parseFloat(resistance)
    const E = parseFloat(ec)
    const C = parseFloat(constant)

    if (isNaN(R) || isNaN(E) || isNaN(C) || R === 0) {
      alert('Please enter valid numbers (Resistance must not be zero)')
      return
    }

    const output = Math.sqrt((C / R) * E * 8) - E
    setResult(output)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">🔢 Calculate Formula</h1>
      <form onSubmit={handleCalculate} className="space-y-4 w-full max-w-md">
        <input
          type="number"
          step="any"
          placeholder="Resistance"
          value={resistance}
          onChange={(e) => setResistance(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          step="any"
          placeholder="Ec"
          value={ec}
          onChange={(e) => setEc(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          step="any"
          placeholder="Constant"
          value={constant}
          onChange={(e) => setConstant(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Calculate
        </button>
      </form>

      {result !== null && (
        <div className="mt-6 text-xl text-green-700">
          Result: <strong>{result.toFixed(6)}</strong>
        </div>
      )}
    </div>
  )
}

export default FormulaPage
