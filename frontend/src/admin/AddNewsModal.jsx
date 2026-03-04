import { useState } from 'react';
import { useAuth } from './AuthContext';
import './Modal.css';

const CATEGORIES = [
  { value: 'projectUpdate', labelDe: 'Projekt-Update', labelEn: 'Project Update' },
  { value: 'teamNews', labelDe: 'Team-News', labelEn: 'Team News' },
  { value: 'methodology', labelDe: 'Methodik', labelEn: 'Methodology' },
  { value: 'engagement', labelDe: 'Engagement', labelEn: 'Engagement' }
];

export default function AddNewsModal({ onClose, onSaved }) {
  const { token } = useAuth();
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'projectUpdate',
    titleDe: '', titleEn: '',
    excerptDe: '', excerptEn: '',
    contentDe: '', contentEn: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Fehler beim Speichern');
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">📰 Neuigkeit hinzufügen</h2>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal__form">
          <div className="modal__row">
            <label className="modal__label">
              Datum
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
                className="modal__input" required />
            </label>
            <label className="modal__label">
              Kategorie
              <select value={form.category} onChange={e => set('category', e.target.value)}
                className="modal__input">
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.labelDe} / {c.labelEn}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="modal__cols">
            <div className="modal__col">
              <h3 className="modal__lang">🇩🇪 Deutsch</h3>
              <label className="modal__label">
                Titel *
                <input value={form.titleDe} onChange={e => set('titleDe', e.target.value)}
                  className="modal__input" required />
              </label>
              <label className="modal__label">
                Kurztext (Vorschau)
                <textarea value={form.excerptDe} onChange={e => set('excerptDe', e.target.value)}
                  className="modal__textarea" rows={3} />
              </label>
              <label className="modal__label">
                Vollständiger Text
                <textarea value={form.contentDe} onChange={e => set('contentDe', e.target.value)}
                  className="modal__textarea" rows={6} />
              </label>
            </div>

            <div className="modal__col">
              <h3 className="modal__lang">🇬🇧 English</h3>
              <label className="modal__label">
                Title *
                <input value={form.titleEn} onChange={e => set('titleEn', e.target.value)}
                  className="modal__input" required />
              </label>
              <label className="modal__label">
                Excerpt (Preview)
                <textarea value={form.excerptEn} onChange={e => set('excerptEn', e.target.value)}
                  className="modal__textarea" rows={3} />
              </label>
              <label className="modal__label">
                Full Content
                <textarea value={form.contentEn} onChange={e => set('contentEn', e.target.value)}
                  className="modal__textarea" rows={6} />
              </label>
            </div>
          </div>

          {error && <p className="modal__error">{error}</p>}

          <div className="modal__actions">
            <button type="button" className="modal__btn modal__btn--cancel" onClick={onClose}>
              Abbrechen
            </button>
            <button type="submit" className="modal__btn modal__btn--save" disabled={loading}>
              {loading ? 'Speichern…' : 'Speichern'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
