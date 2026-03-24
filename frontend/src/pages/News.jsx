import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../admin/AuthContext';
import './News.css';

function formatDate(dateStr, lang) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

function News() {
  const { t, i18n } = useTranslation();
  const { isAdmin, token } = useAuth();
  const navigate = useNavigate();
  const lang = i18n.language;

  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/news');
      setNewsItems(await res.json());
    } catch {
      setError('News konnten nicht geladen werden.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchNews(); }, [fetchNews]);

  async function handleDelete(e, id) {
    e.stopPropagation();
    if (!window.confirm('Diesen Beitrag wirklich löschen?')) return;
    await fetch(`/api/news/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchNews();
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
          {loading && <p className="news-loading">Laden…</p>}
          {error   && <p className="news-error">{error}</p>}
          {!loading && !error && (
            <div className="news-grid">
              {newsItems.length > 0 ? newsItems.map(item => {
                const title   = lang === 'de' ? item.titleDe   : item.titleEn;
                const excerpt = lang === 'de' ? item.excerptDe : item.excerptEn;

                return (
                  <article
                    key={item.id}
                    className="news-card"
                    onClick={() => navigate(`/news/${item.id}`)}
                  >
                    <div className="news-card__top">
                      <span className="news-date">{formatDate(item.date, lang)}</span>
                    </div>
                    <div className="news-card__body">
                      <h3 className="news-card__title">{title}</h3>
                      {excerpt && <p className="news-card__excerpt">{excerpt}</p>}
                    </div>
                    <div className="news-card__footer">
                      <span className="news-card__readmore">
                        {lang === 'de' ? 'Mehr lesen' : 'Read more'} →
                      </span>
                      {isAdmin && (
                        <button className="news-delete-btn" onClick={e => handleDelete(e, item.id)}>
                          🗑
                        </button>
                      )}
                    </div>
                  </article>
                );
              }) : (
                <div className="no-news"><p>{t('news.noNews')}</p></div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default News;
