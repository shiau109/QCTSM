// src/components/ResonatorForm.js
import React, { useState } from 'react';

function ResonatorForm() {
  const [formData, setFormData] = useState({
    alpha: '',
    delay: '',
    Ql: '',
    Qc: '',
    phi: '',
    fr: '',
    freq_start: '',
    freq_end: '',
    freq_points: ''
  });
  const [imageSrc_mag, setImageSrc_mag] = useState(null);
  const [imageSrc_phase, setImageSrc_phase] = useState(null);
  const [imageSrc_iq, setImageSrc_iq] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
const handleSubmit = async e => {
  e.preventDefault();
  const form = new FormData();
  Object.entries(formData).forEach(([k,v]) => form.append(k, v));

  try {
    const res = await fetch("http://localhost:8000/resonator/plot_all", {
      method: "POST",
      body: form
    });
    if (!res.ok) throw new Error("Bad network response");
    const images = await res.json();
    setImageSrc_mag  (images.magnitude);
    setImageSrc_phase(images.phase);
    setImageSrc_iq   (images.iq);
  } catch(err) {
    console.error(err);
  }
};

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Alpha */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Alpha</span>
          </label>
          <input
            type="number"
            name="alpha"
            value={formData.alpha}
            onChange={handleChange}
            placeholder="e.g. 0.5"
            className="input input-bordered"
            required
          />
        </div>

        {/* Delay */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Delay</span>
          </label>
          <input
            type="number"
            name="delay"
            value={formData.delay}
            onChange={handleChange}
            placeholder="e.g. 10 ns"
            className="input input-bordered"
            required
          />
        </div>

        {/* Ql */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Q<sub>l</sub></span>
          </label>
          <input
            type="number"
            name="Ql"
            value={formData.Ql}
            onChange={handleChange}
            placeholder="e.g. 10000"
            className="input input-bordered"
            required
          />
        </div>

        {/* Qc */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Q<sub>c</sub></span>
          </label>
          <input
            type="number"
            name="Qc"
            value={formData.Qc}
            onChange={handleChange}
            placeholder="e.g. 8000"
            className="input input-bordered"
            required
          />
        </div>

        {/* Phi */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">ϕ (Phase)</span>
          </label>
          <input
            type="number"
            name="phi"
            value={formData.phi}
            onChange={handleChange}
            placeholder="e.g. 0.785"
            className="input input-bordered"
            required
          />
        </div>

        {/* Resonance Frequency */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">f<sub>r</sub> (GHz)</span>
          </label>
          <input
            type="number"
            name="fr"
            value={formData.fr}
            onChange={handleChange}
            placeholder="e.g. 5.2"
            className="input input-bordered"
            required
          />
        </div>

        {/* Frequency Range */}
        <div className="form-control sm:col-span-2">
          <label className="label">
            <span className="label-text">Frequency Range (GHz)</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              name="freq_start"
              value={formData.freq_start}
              onChange={handleChange}
              placeholder="Start"
              className="input input-bordered"
              required
            />
            <input
              type="number"
              name="freq_end"
              value={formData.freq_end}
              onChange={handleChange}
              placeholder="End"
              className="input input-bordered"
              required
            />
            <input
              type="number"
              name="freq_points"
              value={formData.freq_points}
              onChange={handleChange}
              placeholder="Points"
              className="input input-bordered"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-3 text-right">
          <button type="submit" className="btn btn-primary">
            Generate Plot
          </button>
        </div>
      </form>

      {/* Resulting Plot */}
      {imageSrc_mag && (
        <div className="mt-8">
          <img src={imageSrc_mag} alt="Resonator Response (Magnitude)" className="mx-auto rounded-lg shadow-md" />
        </div>
      )}
      {imageSrc_phase && (
        <div className="mt-8">
          <img src={imageSrc_phase} alt="Resonator Response (Phase)" className="mx-auto rounded-lg shadow-md" />
        </div>
      )}
      {imageSrc_iq && (
        <div className="mt-8">
          <img src={imageSrc_iq} alt="Resonator Response (IQ)" className="mx-auto rounded-lg shadow-md" />
        </div>
      )}
    </div>
  );
}

export default ResonatorForm;
