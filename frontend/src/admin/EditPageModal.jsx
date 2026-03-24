import { useState } from 'react';
import { useAuth } from './AuthContext';
import RichTextEditor from './RichTextEditor';
import './Modal.css';

const NAV_GROUPS = [
  { value: 'about',   labelDe: 'Unter "Über das Projekt"' },
  { value: 'team',    labelDe: 'Unter "Über Uns"' },
  { value: 'news',    labelDe: 'Unter "Neuigkeiten"' },
  { value: 'contact', labelDe: 'Unter "Kontakt"' },
  { value: 'top',     labelDe: 'Eigener Tab (Hauptnavigation)' }
];

export default function EditPageModal({ page, onClose, onSaved }) {
  const { token } = useAuth();
  const [form, setForm] = useState({
    titleDe: page.titleDe,
    titleEn: page.titleEn,
    subtitleDe: page.subtitleDe || '',
    subtitleEn: page.subtitleEn || '',
    contentDe: page.contentDe,
    contentEn: page.contentEn,
    navGroup: page.navGroup
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
      const res = await fetch(`/api/pages/${page.id}`, {
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
          <h2 className="modal__title">✏️ Seite bearbeiten</h2>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal__form">
          <div className="modal__row">
            <label className="modal__label">
              URL-Pfad
              <input value={page.slug} className="modal__input" disabled
                style={{ opacity: 0.5, cursor: 'not-allowed' }} />
              <span className="modal__hint">Der Pfad kann nach der Erstellung nicht geändert werden.</span>
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
                Seitenname *
                <input value={form.titleDe} onChange={e => set('titleDe', e.target.value)}
                  className="modal__input" required />
              </label>
              <label className="modal__label">
                Untertitel
                <input value={form.subtitleDe} onChange={e => set('subtitleDe', e.target.value)}
                  className="modal__input" placeholder="z.B. Lernen Sie das PSY-DIVER Team kennen" />
              </label>
              <label className="modal__label">
                Seiteninhalt
                <RichTextEditor value={form.contentDe} onChange={v => set('contentDe', v)} />
              </label>
            </div>
            <div className="modal__col">
              <h3 className="modal__lang">🇬🇧 English</h3>
              <label className="modal__label">
                Page Title *
                <input value={form.titleEn} onChange={e => set('titleEn', e.target.value)}
                  className="modal__input" required />
              </label>
              <label className="modal__label">
                Subtitle
                <input value={form.subtitleEn} onChange={e => set('subtitleEn', e.target.value)}
                  className="modal__input" placeholder="e.g. Get to know the PSY-DIVER team" />
              </label>
              <label className="modal__label">
                Page Content
                <RichTextEditor value={form.contentEn} onChange={v => set('contentEn', v)} />
              </label>
            </div>
          </div>

          {error && <p className="modal__error">{error}</p>}
          <div className="modal__actions">
            <button type="button" className="modal__btn modal__btn--cancel" onClick={onClose}>Abbrechen</button>
            <button type="submit" className="modal__btn modal__btn--save" disabled={loading}>
              {loading ? 'Speichern…' : 'Änderungen speichern'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
