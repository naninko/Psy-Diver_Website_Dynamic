import { useState } from 'react';
import { useAuth } from './AuthContext';
import RichTextEditor from './RichTextEditor';
import './Modal.css';

export default function EditNewsModal({ item, onClose, onSaved }) {
  const { token } = useAuth();
  const [form, setForm] = useState({
    date:      item.date      || new Date().toISOString().split('T')[0],
    titleDe:   item.titleDe   || '',
    titleEn:   item.titleEn   || '',
    excerptDe: item.excerptDe || '',
    excerptEn: item.excerptEn || '',
    contentDe: item.contentDe || '',
    contentEn: item.contentEn || ''
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
      const res = await fetch(`/api/news/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
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
      <div className="modal modal--wide" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">✏️ Neuigkeit bearbeiten</h2>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal__form">
          <div className="modal__row">
            <label className="modal__label">
              Datum
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
                className="modal__input" required />
            </label>
          </div>

          <div className="modal__cols">
            {/* German */}
            <div className="modal__col">
              <h3 className="modal__lang">🇩🇪 Deutsch</h3>
              <label className="modal__label">
                Titel *
                <input value={form.titleDe} onChange={e => set('titleDe', e.target.value)}
                  className="modal__input" required />
              </label>
              <label className="modal__label">
                Kurztext (Vorschau auf der Karte)
                <textarea value={form.excerptDe} onChange={e => set('excerptDe', e.target.value)}
                  className="modal__textarea" rows={2} />
              </label>
              <label className="modal__label">
                Vollständiger Artikel (mit Bildern)
                <RichTextEditor value={form.contentDe} onChange={v => set('contentDe', v)} />
              </label>
            </div>

            {/* English */}
            <div className="modal__col">
              <h3 className="modal__lang">🇬🇧 English</h3>
              <label className="modal__label">
                Title *
                <input value={form.titleEn} onChange={e => set('titleEn', e.target.value)}
                  className="modal__input" required />
              </label>
              <label className="modal__label">
                Excerpt (shown on the card)
                <textarea value={form.excerptEn} onChange={e => set('excerptEn', e.target.value)}
                  className="modal__textarea" rows={2} />
              </label>
              <label className="modal__label">
                Full Article (with images)
                <RichTextEditor value={form.contentEn} onChange={v => set('contentEn', v)} />
              </label>
            </div>
          </div>

          {error && <p className="modal__error">{error}</p>}
          <div className="modal__actions">
            <button type="button" className="modal__btn modal__btn--cancel" onClick={onClose}>Abbrechen</button>
            <button type="submit" className="modal__btn modal__btn--save" disabled={loading}>
              {loading ? 'Speichern…' : 'Speichern'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
