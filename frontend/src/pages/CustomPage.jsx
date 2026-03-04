import { useTranslation } from 'react-i18next';
import { useAuth } from '../admin/AuthContext';
import './CustomPage.css';

export default function CustomPage({ page, onDelete }) {
  const { i18n } = useTranslation();
  const { isAdmin, token } = useAuth();
  const lang = i18n.language;

  const title = lang === 'de' ? page.titleDe : page.titleEn;
  const content = lang === 'de' ? page.contentDe : page.contentEn;

  async function handleDelete() {
    if (!window.confirm(`Seite "${title}" wirklich löschen?`)) return;
    try {
      await fetch(`/api/pages/${page.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (onDelete) onDelete();
    } catch {
      alert('Fehler beim Löschen.');
    }
  }

  return (
    <div className="custom-page">
      <div className="custom-page__hero">
        <div className="container">
          <h1 className="custom-page__title">{title}</h1>
          {isAdmin && (
            <button className="custom-page__delete-btn" onClick={handleDelete}>
              🗑 Seite löschen
            </button>
          )}
        </div>
      </div>
      <div className="container">
        <div
          className="custom-page__content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
