import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../admin/AuthContext';
import './News.css';

const CATEGORY_COLORS = {
  projectUpdate: 'var(--color-cyan)',
  teamNews: 'var(--color-magenta)',
  methodology: 'var(--color-yellow)',
  engagement: 'var(--color-coral)'
};

function formatDate(dateStr, lang) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

function News() {
  const { t, i18n } = useTranslation();
  const { isAdmin, token } = useAuth();
  const lang = i18n.language;

  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      setNewsItems(data);
    } catch {
      setError('News konnten nicht geladen werden.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  async function handleDelete(id) {
    if (!window.confirm('Diesen Beitrag wirklich löschen?')) return;
    try {
      await fetch(`/api/news/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchNews();
    } catch {
      alert('Fehler beim Löschen.');
    }
  }

  return (
    <div className="news">
      <section className="page-header">
        <div className="container">
          <h1>{t('news.title')}</h1>
          <p className="page-subtitle">{t('news.subtitle')}</p>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="container">
          <p className="newsletter-text">
            Sie möchten über neue Publikationen und Veranstaltungen informiert werden?
            Abonnieren Sie unseren{' '}
            <a href="https://mailchi.mp/137fea0198f2/psy-diver-newsletter" target="_blank" rel="noopener noreferrer">
              Newsletter
            </a>
          </p>
        </div>
      </section>

      <section className="news-section">
        <div className="container">
          {loading && (
            <p className="news-loading">Laden…</p>
          )}
          {error && (
            <p className="news-error">{error}</p>
          )}
          {!loading && !error && (
            <div className="news-grid">
              {newsItems.length > 0 ? (
                newsItems.map(item => {
                  const title = lang === 'de' ? item.titleDe : item.titleEn;
                  const excerpt = lang === 'de' ? item.excerptDe : item.excerptEn;
                  const content = lang === 'de' ? item.contentDe : item.contentEn;
                  const color = CATEGORY_COLORS[item.category] || 'var(--color-cyan)';

                  return (
                    <article key={item.id} className="news-card">
                      <div className="news-header" style={{ '--category-color': color }}>
                        <span className="news-category">
                          {t('news.categories.' + item.category)}
                        </span>
                        <span className="news-date">{formatDate(item.date, lang)}</span>
                      </div>
                      <div className="news-body">
                        <h3>{title}</h3>
                        {excerpt && <p className="news-excerpt">{excerpt}</p>}
                        {content && <p className="news-content">{content}</p>}
                        {isAdmin && (
                          <button
                            className="news-delete-btn"
                            onClick={() => handleDelete(item.id)}
                          >
                            🗑 Löschen
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="no-news">
                  <p>{t('news.noNews')}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default News;
