import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../admin/AuthContext';
import EditStaticPageModal from '../admin/EditStaticPageModal';
import './EditablePageBody.css';

export default function EditablePageBody({ slug, onTitleChange, onSubtitleChange, children }) {
  const { i18n } = useTranslation();
  const { isAdmin, token } = useAuth();
  const lang = i18n.language;

  const [override, setOverride] = useState(null);
  const [editing, setEditing] = useState(false);

  const fetchOverride = useCallback(async () => {
    try {
      const res = await fetch(`/api/static-pages/${slug}`);
      const data = await res.json();
      const hasContent = data.contentDe || data.contentEn || data.subtitleDe || data.subtitleEn;
      setOverride(hasContent ? data : null);
    } catch { /* no override */ }
  }, [slug]);

  useEffect(() => { fetchOverride(); }, [fetchOverride]);

  // Notify parent whenever title/subtitle override changes
  useEffect(() => {
    if (onTitleChange) {
      const title = lang === 'de' ? override?.titleDe : override?.titleEn;
      onTitleChange(title || null);
    }
    if (onSubtitleChange) {
      const sub = lang === 'de' ? override?.subtitleDe : override?.subtitleEn;
      onSubtitleChange(sub || null);
    }
  }, [override, lang, onTitleChange, onSubtitleChange]);

  async function handleReset() {
    if (!window.confirm('Originalinhalt wiederherstellen? Die bearbeitete Version wird gelöscht.')) return;
    await fetch(`/api/static-pages/${slug}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setOverride(null);
  }

  const content = override ? (lang === 'de' ? override.contentDe : override.contentEn) : null;

  return (
    <>
      {isAdmin && (
        <div className="epb-admin-bar">
          <button className="epb-edit-btn" onClick={() => setEditing(true)}>
            ✏️ Seite bearbeiten
          </button>
          {override && (
            <button className="epb-reset-btn" onClick={handleReset}>
              ↩ Original wiederherstellen
            </button>
          )}
        </div>
      )}

      {content ? (
        <section className="epb-body">
          <div className="container">
            <div className="custom-page__content" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </section>
      ) : (
        children
      )}

      {editing && (
        <EditStaticPageModal
          slug={slug}
          override={override}
          onClose={() => setEditing(false)}
          onSaved={() => { setEditing(false); fetchOverride(); }}
        />
      )}
    </>
  );
}
