'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  // Warm up the backend API on load (useful for Render free tier cold starts)
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    fetch(`${apiUrl}/`).catch(() => {}); // Fire and forget
  }, []);

  const [formData, setFormData] = useState({
    longitude: '-122.23',
    latitude: '37.88',
    housing_median_age: '41',
    total_rooms: '880',
    total_bedrooms: '129',
    population: '322',
    households: '126',
    median_income: '8.3252',
    ocean_proximity: 'NEAR BAY'
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const payload = {
        longitude: parseFloat(formData.longitude),
        latitude: parseFloat(formData.latitude),
        housing_median_age: parseFloat(formData.housing_median_age),
        total_rooms: parseFloat(formData.total_rooms),
        total_bedrooms: parseFloat(formData.total_bedrooms),
        population: parseFloat(formData.population),
        households: parseFloat(formData.households),
        median_income: parseFloat(formData.median_income),
        ocean_proximity: formData.ocean_proximity
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const res = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status === 'success') {
        setPrediction(data.predicted_price);
      } else {
        setError(data.error || 'Failed to get prediction');
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>PriceSense</h1>
      <p className={styles.subtitle}>AI-Powered California House Price Prediction</p>

      <div className={styles.container}>
        {/* Form Card */}
        <div className={styles.glassCard}>
          <form onSubmit={handleSubmit} className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Longitude</label>
              <input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} className={styles.input} required />
            </div>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Latitude</label>
              <input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} className={styles.input} required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Housing Median Age</label>
              <input type="number" step="any" name="housing_median_age" value={formData.housing_median_age} onChange={handleChange} className={styles.input} required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Total Rooms</label>
              <input type="number" step="any" name="total_rooms" value={formData.total_rooms} onChange={handleChange} className={styles.input} required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Total Bedrooms</label>
              <input type="number" step="any" name="total_bedrooms" value={formData.total_bedrooms} onChange={handleChange} className={styles.input} required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Population</label>
              <input type="number" step="any" name="population" value={formData.population} onChange={handleChange} className={styles.input} required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Households</label>
              <input type="number" step="any" name="households" value={formData.households} onChange={handleChange} className={styles.input} required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Median Income</label>
              <input type="number" step="any" name="median_income" value={formData.median_income} onChange={handleChange} className={styles.input} required />
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Ocean Proximity</label>
              <select name="ocean_proximity" value={formData.ocean_proximity} onChange={handleChange} className={styles.select} required>
                <option value="&lt;1H OCEAN">&lt;1H OCEAN</option>
                <option value="INLAND">INLAND</option>
                <option value="ISLAND">ISLAND</option>
                <option value="NEAR BAY">NEAR BAY</option>
                <option value="NEAR OCEAN">NEAR OCEAN</option>
              </select>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Predicting...' : 'Predict Price'}
            </button>
          </form>
          {error && <div className={styles.error}>{error}</div>}
        </div>

        {/* Results Card */}
        <div className={`${styles.glassCard} ${styles.resultsCard}`}>
          {loading ? (
            <div className={styles.loader}></div>
          ) : prediction !== null ? (
            <div className={styles.predictionContainer}>
              <div className={styles.predictionLabel}>Estimated Value</div>
              <div className={styles.predictionValue}>
                ${prediction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          ) : (
            <div className={styles.resultsPlaceholder}>
              <div className={styles.resultsIcon}>🏠</div>
              <div>Fill out the details and click Predict.</div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
