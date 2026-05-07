import { useState } from 'react';
import { generateItinerary } from '../../../utils/claudeApi';

export default function AIItineraryTab({ district }) {
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setWarning(null);
    try {
      const { itinerary: rows, warning: w } = await generateItinerary({
        districts: [district],
        days: 3,
        styles: ['Culture', 'Nature'],
        budget: 'Mid-range',
      });
      setItinerary(rows);
      if (w) setWarning(w);
    } catch {
      setError('Failed to generate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '8px 0' }}>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
        Generate a personalized 3-day itinerary for {district} using AI.
      </p>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading}
        style={{
          width: '100%',
          padding: '14px',
          background: loading ? 'rgba(26,107,60,0.5)' : 'var(--jungle)',
          color: 'var(--white)',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          borderRadius: '8px',
          border: 'none',
          cursor: loading ? 'wait' : 'pointer',
          transition: 'all 0.2s',
          marginBottom: '20px',
        }}
      >
        {loading ? 'Crafting your journey...' : 'Generate AI Itinerary ✦'}
      </button>

      {error && (
        <p style={{ color: 'var(--coral)', fontSize: '13px', marginBottom: '12px' }}>{error}</p>
      )}

      {warning && (
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px', marginBottom: '12px', lineHeight: 1.5 }}>
          {warning}
        </p>
      )}

      {itinerary && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {itinerary.map((day) => (
            <div
              key={day.day}
              style={{
                background: 'var(--glass)',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                padding: '16px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gold)', marginBottom: '6px' }}>
                DAY {day.day}
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
                {day.title}
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
                <div>🌅 {day.morning}</div>
                <div>☀️ {day.afternoon}</div>
                <div>🌙 {day.evening}</div>
              </div>
              {day.tip && (
                <div style={{
                  marginTop: '10px',
                  padding: '8px 12px',
                  background: 'rgba(244,162,40,0.08)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: 'var(--gold)',
                  fontStyle: 'italic',
                }}>
                  💡 {day.tip}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
