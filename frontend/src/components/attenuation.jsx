import React, { useState } from "react";

const TemperatureAttenuationForm = () => {
  const [inputTemp, setInputTemp] = useState(300);
  const [groups, setGroups] = useState([
    { temperature: 300, attenuation: 20 }
  ]);
  const [outputTemp, setOutputTemp] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGroupChange = (index, field, value) => {
    const updatedGroups = [...groups];
    updatedGroups[index][field] = value;
    setGroups(updatedGroups);
  };

  const addGroup = () => {
    setGroups([...groups, { temperature: 300, attenuation: 20 }]);
  };

  const removeGroup = (index) => {
    setGroups(groups.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/wiring/noise_attenuator_chain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input_temperature: Number(inputTemp),
          attenuator_chain: groups.map((g) => ({
            temperature: Number(g.temperature),
            attenuation: Number(g.attenuation),
          })),
        }),
      });

      if (!response.ok) throw new Error("Backend error");

      const data = await response.json();
      setOutputTemp(data.output_temperature);
    } catch (error) {
      console.error("Error:", error);
      setOutputTemp("Error");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      {/* Input and Output */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block mb-1 font-semibold">Input Temperature</label>
          <input
            type="number"
            className="w-full border px-2 py-1 rounded"
            value={inputTemp}
            onChange={(e) => setInputTemp(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-semibold">Output Temperature</label>
          <div className="w-full border px-2 py-1 rounded bg-gray-100 text-gray-700">
            {loading ? "Calculating..." : outputTemp ?? "-"}
          </div>
        </div>
      </div>

      {/* Attenuation Chain */}
      <div className="space-y-3">
        {groups.map((group, index) => (
          <div key={index} className="flex space-x-4 items-end">
            <div className="flex-1">
              <label className="block mb-1 text-sm">Temperature</label>
              <input
                type="number"
                className="w-full border px-2 py-1 rounded"
                value={group.temperature}
                onChange={(e) =>
                  handleGroupChange(index, "temperature", e.target.value)
                }
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm">Attenuation</label>
              <input
                type="number"
                className="w-full border px-2 py-1 rounded"
                value={group.attenuation}
                onChange={(e) =>
                  handleGroupChange(index, "attenuation", e.target.value)
                }
              />
            </div>
            <div>
              <button
                onClick={() => removeGroup(index)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={addGroup}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + Add Group
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TemperatureAttenuationForm;
