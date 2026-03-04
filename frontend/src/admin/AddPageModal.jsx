import { useState } from 'react';
import { useAuth } from './AuthContext';
import './Modal.css';

const NAV_GROUPS = [
  { value: 'about', labelDe: '"Über uns" Dropdown', labelEn: '"About" Dropdown' },
  { value: 'top', labelDe: 'Hauptnavigation (eigener Tab)', labelEn: 'Main Navigation (own tab)' }
];

export default function AddPageModal({ onClose, onSaved }) {
  const { token } = useAuth();
  const [form, setForm] = useState({
    slug: '',
    navGroup: 'about',
    titleDe: '', titleEn: '',
    contentDe: '', contentEn: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  // Auto-generate slug from German title
  function handleTitleDe(value) {
    set('titleDe', value);
    if (!form.slug || form.slug === slugify(form.titleDe)) {
      set('slug', slugify(value));
    }
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/pages', {
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
          <h2 className="modal__title">📄 Neue Seite erstellen</h2>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal__form">
          <div className="modal__row">
            <label className="modal__label">
              URL-Pfad (slug) *
              <input value={form.slug} onChange={e => set('slug', slugify(e.target.value))}
                className="modal__input" required placeholder="z.B. projektsteuergruppe" />
              <span className="modal__hint">psy-diver.de/<strong>{form.slug || '…'}</strong></span>
            </label>
            <label className="modal__label">
              Wo in der Navigation?
              <select value={form.navGroup} onChange={e => set('navGroup', e.target.value)}
                className="modal__input">
                {NAV_GROUPS.map(g => (
                  <option key={g.value} value={g.value}>{g.labelDe}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="modal__cols">
            <div className="modal__col">
              <h3 className="modal__lang">🇩🇪 Deutsch</h3>
              <label className="modal__label">
                Seitenname (Navigation & Titel) *
                <input value={form.titleDe} onChange={e => handleTitleDe(e.target.value)}
                  className="modal__input" required placeholder="z.B. Projektsteuergruppe" />
              </label>
              <label className="modal__label">
                Seiteninhalt
                <textarea value={form.contentDe} onChange={e => set('contentDe', e.target.value)}
                  className="modal__textarea" rows={10}
                  placeholder="Sie können hier normalen Text oder HTML eingeben." />
              </label>
            </div>

            <div className="modal__col">
              <h3 className="modal__lang">🇬🇧 English</h3>
              <label className="modal__label">
                Page Title (Navigation & Heading) *
                <input value={form.titleEn} onChange={e => set('titleEn', e.target.value)}
                  className="modal__input" required placeholder="e.g. Project Steering Group" />
              </label>
              <label className="modal__label">
                Page Content
                <textarea value={form.contentEn} onChange={e => set('contentEn', e.target.value)}
                  className="modal__textarea" rows={10}
                  placeholder="You can enter plain text or HTML here." />
              </label>
            </div>
          </div>

          {error && <p className="modal__error">{error}</p>}

          <div className="modal__actions">
            <button type="button" className="modal__btn modal__btn--cancel" onClick={onClose}>
              Abbrechen
            </button>
            <button type="submit" className="modal__btn modal__btn--save" disabled={loading}>
              {loading ? 'Erstellen…' : 'Seite erstellen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
