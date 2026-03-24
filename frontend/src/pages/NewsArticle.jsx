import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../admin/AuthContext';
import EditNewsModal from '../admin/EditNewsModal';
import './NewsArticle.css';

function formatDate(dateStr, lang) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

export default function NewsArticle() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const { isAdmin, token } = useAuth();
  const navigate = useNavigate();
  const lang = i18n.language;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);

  function fetchItem() {
    setLoading(true);
    fetch(`/api/news/${id}`)
      .then(r => r.json())
      .then(data => { setItem(data); setLoading(false); })
      .catch(() => setLoading(false));
  }

  useEffect(() => { fetchItem(); }, [id]);

  async function handleDelete() {
    if (!window.confirm('Diesen Beitrag wirklich löschen?')) return;
    await fetch(`/api/news/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    navigate('/news');
  }

  if (loading) return <div className="news-article__loading">Laden…</div>;
  if (!item || item.error) return <div className="news-article__loading">Beitrag nicht gefunden.</div>;

  const title   = lang === 'de' ? item.titleDe   : item.titleEn;
  const content = lang === 'de' ? item.contentDe : item.contentEn;

  return (
    <div className="news-article">
      <section className="page-header">
        <div className="container">
          <button className="news-article__back" onClick={() => navigate('/news')}>
            ← {lang === 'de' ? 'Zurück zu Neuigkeiten' : 'Back to News'}
          </button>
          <h1>{title}</h1>
          <p className="page-subtitle">{formatDate(item.date, lang)}</p>
          {isAdmin && (
            <div className="news-article__admin-btns">
              <button className="news-article__edit-btn" onClick={() => setShowEdit(true)}>
                ✏️ Bearbeiten
              </button>
              <button className="news-article__delete-btn" onClick={handleDelete}>
                🗑 Löschen
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="news-article__body">
        <div className="container">
          <div
            className="news-article__content"
            dangerouslySetInnerHTML={{ __html: content || '<p></p>' }}
          />
        </div>
      </section>

      {showEdit && (
        <EditNewsModal
          item={item}
          onClose={() => setShowEdit(false)}
          onSaved={() => { setShowEdit(false); fetchItem(); }}
        />
      )}
    </div>
  );
}
