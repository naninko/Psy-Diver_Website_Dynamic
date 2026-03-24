import { useState } from 'react';
import { useAuth } from './AuthContext';
import RichTextEditor from './RichTextEditor';
import './Modal.css';

export default function EditStaticPageModal({ slug, override, onClose, onSaved }) {
  const { token } = useAuth();
  const [titleDe, setTitleDe] = useState(override?.titleDe || '');
  const [titleEn, setTitleEn] = useState(override?.titleEn || '');
  const [contentDe, setContentDe] = useState(override?.contentDe || '');
  const [contentEn, setContentEn] = useState(override?.contentEn || '');
  const [subtitleDe, setSubtitleDe] = useState(override?.subtitleDe || '');
  const [subtitleEn, setSubtitleEn] = useState(override?.subtitleEn || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`/api/static-pages/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ titleDe, titleEn, contentDe, contentEn, subtitleDe, subtitleEn })
      });
      if (!res.ok) throw new Error('Fehler beim Speichern');
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
          <div className="modal__cols">
            <div className="modal__col">
              <h3 className="modal__lang">🇩🇪 Deutsch</h3>
              <label className="modal__label">
                Seitenname (Titel)
                <input value={titleDe} onChange={e => setTitleDe(e.target.value)}
                  className="modal__input" placeholder="z.B. Team" />
              </label>
              <label className="modal__label">
                Untertitel
                <input value={subtitleDe} onChange={e => setSubtitleDe(e.target.value)}
                  className="modal__input" placeholder="z.B. Lernen Sie das Team kennen" />
              </label>
              <label className="modal__label">
                Seiteninhalt
                <RichTextEditor value={contentDe} onChange={setContentDe} />
              </label>
            </div>
            <div className="modal__col">
              <h3 className="modal__lang">🇬🇧 English</h3>
              <label className="modal__label">
                Page Title
                <input value={titleEn} onChange={e => setTitleEn(e.target.value)}
                  className="modal__input" placeholder="e.g. Team" />
              </label>
              <label className="modal__label">
                Subtitle
                <input value={subtitleEn} onChange={e => setSubtitleEn(e.target.value)}
                  className="modal__input" placeholder="e.g. Get to know the team" />
              </label>
              <label className="modal__label">
                Page Content
                <RichTextEditor value={contentEn} onChange={setContentEn} />
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
